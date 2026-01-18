/**
 * Timezone utilities for handling UTC storage and Eastern Time display
 */

// Eastern Time zone identifier
const ET_TIMEZONE = 'America/New_York';

/**
 * Get current date/time in UTC as ISO string
 */
export function nowUTC(): string {
  return new Date().toISOString();
}

/**
 * Convert a local date string (YYYY-MM-DD) to UTC ISO string
 * Assumes the date is in Eastern Time
 */
export function localDateToUTC(dateString: string): string {
  // Create date at noon ET to avoid DST issues
  const date = new Date(`${dateString}T12:00:00`);
  return date.toISOString();
}

/**
 * Convert UTC ISO string to Eastern Time date string (YYYY-MM-DD)
 */
export function utcToETDate(utcString: string): string {
  const date = new Date(utcString);
  return date.toLocaleDateString('en-CA', { timeZone: ET_TIMEZONE });
}

/**
 * Convert UTC ISO string to formatted Eastern Time date
 * Example: "January 15, 2024"
 */
export function formatETDate(utcString: string): string {
  const date = new Date(utcString);
  return date.toLocaleDateString('en-US', {
    timeZone: ET_TIMEZONE,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Convert UTC ISO string to short formatted Eastern Time date
 * Example: "Jan 15, 2024"
 */
export function formatETDateShort(utcString: string): string {
  const date = new Date(utcString);
  return date.toLocaleDateString('en-US', {
    timeZone: ET_TIMEZONE,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Convert UTC ISO string to formatted Eastern Time date and time
 * Example: "January 15, 2024 at 2:30 PM ET"
 */
export function formatETDateTime(utcString: string): string {
  const date = new Date(utcString);
  const dateStr = date.toLocaleDateString('en-US', {
    timeZone: ET_TIMEZONE,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = date.toLocaleTimeString('en-US', {
    timeZone: ET_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${dateStr} at ${timeStr} ET`;
}

/**
 * Get the current date in Eastern Time as YYYY-MM-DD
 */
export function todayET(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: ET_TIMEZONE });
}

/**
 * Get tomorrow's date in Eastern Time as YYYY-MM-DD
 */
export function tomorrowET(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString('en-CA', { timeZone: ET_TIMEZONE });
}

/**
 * Check if a date string (YYYY-MM-DD) is today in ET
 */
export function isToday(dateString: string): boolean {
  return dateString === todayET();
}

/**
 * Check if a date string (YYYY-MM-DD) is tomorrow in ET
 */
export function isTomorrow(dateString: string): boolean {
  return dateString === tomorrowET();
}

/**
 * Check if an appointment date/time is within 24 hours from now
 * Used for cancellation policy enforcement
 */
export function isWithin24Hours(dateString: string): boolean {
  // Parse the date and set it to end of day ET for maximum flexibility
  const appointmentDate = new Date(`${dateString}T23:59:59`);
  const now = new Date();
  const hoursUntil = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursUntil <= 24;
}

/**
 * Get the number of hours until an appointment date
 */
export function hoursUntilDate(dateString: string): number {
  const appointmentDate = new Date(`${dateString}T12:00:00`);
  const now = new Date();
  return Math.floor((appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60));
}

/**
 * Check if a date is in the past
 */
export function isPastDate(dateString: string): boolean {
  const today = todayET();
  return dateString < today;
}

/**
 * Get month key from date string for availability storage
 * Example: "2024-01-15" -> "2024-01"
 */
export function getMonthKey(dateString: string): string {
  return dateString.substring(0, 7);
}

/**
 * Get all dates for a given month
 * Returns array of YYYY-MM-DD strings
 */
export function getDatesInMonth(year: number, month: number): string[] {
  const dates: string[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    dates.push(dateStr);
  }

  return dates;
}
