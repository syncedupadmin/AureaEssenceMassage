import { kv } from '@vercel/kv';
import { nanoid } from 'nanoid';
import {
  type BookingStatus,
  type CreateBookingInput,
  type UpdateBookingInput,
  BOOKING_STATUSES,
} from './schemas/booking';
import { nowUTC, getMonthKey } from './timezone';

// Types
export interface Booking {
  id: string;
  lookupToken: string;
  status: BookingStatus;

  // Customer info
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  // Service details
  service: string;
  duration?: string;
  preferredPressure?: string;

  // Location
  locationType: string;
  address?: string;

  // Scheduling
  preferredDate?: string;
  preferredTime?: string;
  confirmedDate?: string;
  confirmedTime?: string;

  // Notes
  message?: string;
  adminNotes?: string;
  cancellationReason?: string;

  // Timestamps (UTC ISO strings)
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

export interface BlockedDate {
  date: string;
  reason?: string;
}

// KV Key patterns
const KEYS = {
  booking: (id: string) => `booking:${id}`,
  allBookings: 'bookings:all',
  byStatus: (status: BookingStatus) => `bookings:by_status:${status}`,
  byDate: (date: string) => `bookings:by_date:${date}`,
  lookup: (token: string) => `bookings:lookup:${token}`,
  blockedDates: (monthKey: string) => `availability:blocked:${monthKey}`,
};

/**
 * Check if KV is configured
 */
function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Generate a unique booking ID
 */
function generateBookingId(): string {
  return `bk_${nanoid(12)}`;
}

/**
 * Generate a customer-friendly lookup token
 * Format: AUR-XXXXXX (6 uppercase alphanumeric)
 */
function generateLookupToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed confusing characters
  let token = '';
  for (let i = 0; i < 6; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AUR-${token}`;
}

/**
 * Execute multiple KV operations atomically using pipeline
 */
async function withTransaction<T>(
  operations: (pipe: ReturnType<typeof kv.pipeline>) => void,
  onSuccess: () => T
): Promise<T> {
  const pipe = kv.pipeline();
  operations(pipe);

  try {
    await pipe.exec();
    return onSuccess();
  } catch (error) {
    console.error('Transaction failed:', error);
    throw new Error('Database operation failed');
  }
}

// ==================== BOOKING OPERATIONS ====================

/**
 * Create a new booking
 */
export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  if (!isKVConfigured()) {
    throw new Error('Database not configured');
  }

  const now = nowUTC();
  const booking: Booking = {
    id: generateBookingId(),
    lookupToken: generateLookupToken(),
    status: 'pending',
    customerName: input.name,
    customerEmail: input.email,
    customerPhone: input.phone,
    service: input.service,
    preferredPressure: input.preferredPressure,
    locationType: input.locationType,
    address: input.address,
    preferredDate: input.preferredDate,
    preferredTime: input.preferredTime,
    message: input.message,
    createdAt: now,
    updatedAt: now,
  };

  return withTransaction(
    (pipe) => {
      // Store the booking object
      pipe.set(KEYS.booking(booking.id), booking);
      // Add to all bookings set
      pipe.sadd(KEYS.allBookings, booking.id);
      // Add to status index
      pipe.sadd(KEYS.byStatus(booking.status), booking.id);
      // Create lookup token mapping
      pipe.set(KEYS.lookup(booking.lookupToken), booking.id);
      // Add to date index if date provided
      if (booking.preferredDate) {
        pipe.sadd(KEYS.byDate(booking.preferredDate), booking.id);
      }
    },
    () => booking
  );
}

/**
 * Get a booking by ID
 */
export async function getBookingById(id: string): Promise<Booking | null> {
  if (!isKVConfigured()) {
    return null;
  }

  try {
    return await kv.get<Booking>(KEYS.booking(id));
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
}

/**
 * Get a booking by lookup token
 */
export async function getBookingByToken(token: string): Promise<Booking | null> {
  if (!isKVConfigured()) {
    return null;
  }

  try {
    const bookingId = await kv.get<string>(KEYS.lookup(token));
    if (!bookingId) {
      return null;
    }
    return await getBookingById(bookingId);
  } catch (error) {
    console.error('Error fetching booking by token:', error);
    return null;
  }
}

/**
 * Update a booking
 */
export async function updateBooking(
  id: string,
  updates: UpdateBookingInput
): Promise<Booking | null> {
  if (!isKVConfigured()) {
    throw new Error('Database not configured');
  }

  const existing = await getBookingById(id);
  if (!existing) {
    return null;
  }

  const now = nowUTC();
  const oldStatus = existing.status;
  const newStatus = updates.status || oldStatus;

  // Build updated booking
  const updated: Booking = {
    ...existing,
    ...updates,
    updatedAt: now,
  };

  // Set timestamps based on status changes
  if (updates.status === 'confirmed' && oldStatus !== 'confirmed') {
    updated.confirmedAt = now;
  }
  if (updates.status === 'completed' && oldStatus !== 'completed') {
    updated.completedAt = now;
  }
  if (updates.status === 'cancelled' && oldStatus !== 'cancelled') {
    updated.cancelledAt = now;
  }

  return withTransaction(
    (pipe) => {
      // Update the booking object
      pipe.set(KEYS.booking(id), updated);

      // Update status indices if status changed
      if (oldStatus !== newStatus) {
        pipe.srem(KEYS.byStatus(oldStatus), id);
        pipe.sadd(KEYS.byStatus(newStatus), id);
      }

      // Update date indices if confirmed date changed
      if (updates.confirmedDate && updates.confirmedDate !== existing.confirmedDate) {
        if (existing.confirmedDate) {
          pipe.srem(KEYS.byDate(existing.confirmedDate), id);
        }
        pipe.sadd(KEYS.byDate(updates.confirmedDate), id);
      }
    },
    () => updated
  );
}

/**
 * List all bookings with optional status filter
 */
export async function listBookings(options?: {
  status?: BookingStatus;
  page?: number;
  limit?: number;
}): Promise<{ bookings: Booking[]; total: number }> {
  if (!isKVConfigured()) {
    return { bookings: [], total: 0 };
  }

  const { status, page = 1, limit = 20 } = options || {};

  try {
    // Get booking IDs from appropriate set
    const setKey = status ? KEYS.byStatus(status) : KEYS.allBookings;
    const allIds = await kv.smembers(setKey);

    if (!allIds || allIds.length === 0) {
      return { bookings: [], total: 0 };
    }

    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedIds = allIds.slice(start, end);

    // Fetch bookings
    const bookings: Booking[] = [];
    for (const id of paginatedIds) {
      const booking = await kv.get<Booking>(KEYS.booking(id as string));
      if (booking) {
        bookings.push(booking);
      }
    }

    // Sort by createdAt descending (newest first)
    bookings.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return { bookings, total: allIds.length };
  } catch (error) {
    console.error('Error listing bookings:', error);
    return { bookings: [], total: 0 };
  }
}

/**
 * Get bookings for a specific date (for double-booking prevention)
 */
export async function getBookingsForDate(date: string): Promise<Booking[]> {
  if (!isKVConfigured()) {
    return [];
  }

  try {
    const ids = await kv.smembers(KEYS.byDate(date));
    if (!ids || ids.length === 0) {
      return [];
    }

    const bookings: Booking[] = [];
    for (const id of ids) {
      const booking = await kv.get<Booking>(KEYS.booking(id as string));
      if (booking) {
        bookings.push(booking);
      }
    }

    return bookings;
  } catch (error) {
    console.error('Error fetching bookings for date:', error);
    return [];
  }
}

/**
 * Check if a time slot is available on a given date
 */
export async function isTimeSlotAvailable(
  date: string,
  timeSlot: string,
  excludeBookingId?: string
): Promise<boolean> {
  const bookings = await getBookingsForDate(date);

  return !bookings.some(
    (b) =>
      b.id !== excludeBookingId &&
      (b.status === 'confirmed' || b.status === 'pending') &&
      (b.confirmedTime === timeSlot || b.preferredTime === timeSlot)
  );
}

/**
 * Get confirmed bookings for tomorrow (for reminder emails)
 */
export async function getBookingsForTomorrow(): Promise<Booking[]> {
  if (!isKVConfigured()) {
    return [];
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  try {
    const confirmedIds = await kv.smembers(KEYS.byStatus('confirmed'));
    if (!confirmedIds || confirmedIds.length === 0) {
      return [];
    }

    const bookings: Booking[] = [];
    for (const id of confirmedIds) {
      const booking = await kv.get<Booking>(KEYS.booking(id as string));
      if (booking && booking.confirmedDate === tomorrowStr) {
        bookings.push(booking);
      }
    }

    return bookings;
  } catch (error) {
    console.error('Error fetching tomorrow bookings:', error);
    return [];
  }
}

// ==================== AVAILABILITY OPERATIONS ====================

/**
 * Get blocked dates for a month
 */
export async function getBlockedDates(monthKey: string): Promise<BlockedDate[]> {
  if (!isKVConfigured()) {
    return [];
  }

  try {
    const blocked = await kv.get<BlockedDate[]>(KEYS.blockedDates(monthKey));
    return blocked || [];
  } catch (error) {
    console.error('Error fetching blocked dates:', error);
    return [];
  }
}

/**
 * Add a blocked date
 */
export async function addBlockedDate(date: string, reason?: string): Promise<void> {
  if (!isKVConfigured()) {
    throw new Error('Database not configured');
  }

  const monthKey = getMonthKey(date);
  const blocked = await getBlockedDates(monthKey);

  // Check if date already blocked
  if (blocked.some((b) => b.date === date)) {
    return; // Already blocked
  }

  blocked.push({ date, reason });
  await kv.set(KEYS.blockedDates(monthKey), blocked);
}

/**
 * Remove a blocked date
 */
export async function removeBlockedDate(date: string): Promise<void> {
  if (!isKVConfigured()) {
    throw new Error('Database not configured');
  }

  const monthKey = getMonthKey(date);
  const blocked = await getBlockedDates(monthKey);
  const updated = blocked.filter((b) => b.date !== date);
  await kv.set(KEYS.blockedDates(monthKey), updated);
}

/**
 * Check if a date is blocked
 */
export async function isDateBlocked(date: string): Promise<boolean> {
  const monthKey = getMonthKey(date);
  const blocked = await getBlockedDates(monthKey);
  return blocked.some((b) => b.date === date);
}

/**
 * Get all blocked dates for multiple months
 */
export async function getBlockedDatesForMonths(monthKeys: string[]): Promise<BlockedDate[]> {
  const results: BlockedDate[] = [];

  for (const monthKey of monthKeys) {
    const blocked = await getBlockedDates(monthKey);
    results.push(...blocked);
  }

  return results;
}

// ==================== BOOKING STATS ====================

/**
 * Get booking counts by status
 */
export async function getBookingStats(): Promise<Record<BookingStatus, number>> {
  const stats: Record<BookingStatus, number> = {
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  };

  if (!isKVConfigured()) {
    return stats;
  }

  try {
    for (const status of BOOKING_STATUSES) {
      const count = await kv.scard(KEYS.byStatus(status));
      stats[status] = count || 0;
    }
  } catch (error) {
    console.error('Error fetching booking stats:', error);
  }

  return stats;
}
