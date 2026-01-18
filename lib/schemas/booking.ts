import { z } from 'zod';

// Time slot options
export const TIME_SLOTS = ['morning', 'afternoon', 'evening'] as const;
export const TIME_SLOT_LABELS: Record<typeof TIME_SLOTS[number], string> = {
  morning: 'Morning (8am - 12pm)',
  afternoon: 'Afternoon (12pm - 5pm)',
  evening: 'Evening (5pm - 9pm)',
};

// Location types
export const LOCATION_TYPES = ['home', 'hotel', 'office', 'event'] as const;
export const LOCATION_TYPE_LABELS: Record<typeof LOCATION_TYPES[number], string> = {
  home: 'Home',
  hotel: 'Hotel / Resort',
  office: 'Office',
  event: 'Event Venue',
};

// Pressure options
export const PRESSURE_OPTIONS = ['light', 'medium', 'firm', 'varies'] as const;

// Booking statuses
export const BOOKING_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
export type BookingStatus = typeof BOOKING_STATUSES[number];

// Phone regex - allows various formats
const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;

// Create booking schema (public form submission)
export const createBookingSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits'),
  service: z
    .string()
    .min(1, 'Please select a service'),
  locationType: z.enum(LOCATION_TYPES, {
    message: 'Please select a location type',
  }),
  address: z
    .string()
    .max(200, 'Address must be less than 200 characters')
    .optional(),
  preferredDate: z
    .string()
    .optional(),
  preferredTime: z
    .enum(TIME_SLOTS)
    .optional(),
  preferredPressure: z
    .enum(PRESSURE_OPTIONS)
    .optional(),
  message: z
    .string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

// Update booking schema (admin actions)
export const updateBookingSchema = z.object({
  status: z
    .enum(BOOKING_STATUSES)
    .optional(),
  confirmedDate: z
    .string()
    .optional(),
  confirmedTime: z
    .enum(TIME_SLOTS)
    .optional(),
  adminNotes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional(),
  cancellationReason: z
    .string()
    .max(500, 'Reason must be less than 500 characters')
    .optional(),
});

export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;

// Cancel booking schema (customer self-service)
export const cancelBookingSchema = z.object({
  reason: z
    .string()
    .max(500, 'Reason must be less than 500 characters')
    .optional(),
});

export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;

// Admin list bookings query params
export const listBookingsSchema = z.object({
  status: z
    .enum(BOOKING_STATUSES)
    .optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 20))
    .pipe(z.number().int().min(1).max(100)),
});

export type ListBookingsInput = z.infer<typeof listBookingsSchema>;

// Blocked date schema
export const blockedDateSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  reason: z
    .string()
    .max(200, 'Reason must be less than 200 characters')
    .optional(),
});

export type BlockedDateInput = z.infer<typeof blockedDateSchema>;
