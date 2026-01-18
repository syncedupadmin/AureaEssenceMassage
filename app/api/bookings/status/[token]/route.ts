import { NextRequest, NextResponse } from 'next/server';
import { getBookingByToken } from '@/lib/bookings';
import { rateLimitBookingStatus } from '@/lib/rate-limit';
import { formatETDateShort } from '@/lib/timezone';
import { TIME_SLOT_LABELS, LOCATION_TYPE_LABELS } from '@/lib/schemas/booking';

interface RouteParams {
  params: Promise<{ token: string }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    // 1. Rate limit check
    const rateLimitResult = await rateLimitBookingStatus(request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Get token from params
    const { token } = await context.params;

    if (!token || token.length < 4) {
      return NextResponse.json(
        { error: 'Invalid reference number format.' },
        { status: 400 }
      );
    }

    // 3. Look up booking
    const booking = await getBookingByToken(token.toUpperCase());

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found. Please check your reference number.' },
        { status: 404 }
      );
    }

    // 4. Build safe response (exclude internal fields)
    const response = {
      lookupToken: booking.lookupToken,
      status: booking.status,
      service: booking.service,
      locationType: booking.locationType,
      locationTypeLabel: LOCATION_TYPE_LABELS[booking.locationType as keyof typeof LOCATION_TYPE_LABELS] || booking.locationType,

      // Dates
      preferredDate: booking.preferredDate,
      preferredDateFormatted: booking.preferredDate ? formatETDateShort(booking.preferredDate + 'T12:00:00Z') : null,
      preferredTime: booking.preferredTime,
      preferredTimeLabel: booking.preferredTime ? TIME_SLOT_LABELS[booking.preferredTime as keyof typeof TIME_SLOT_LABELS] : null,

      confirmedDate: booking.confirmedDate,
      confirmedDateFormatted: booking.confirmedDate ? formatETDateShort(booking.confirmedDate + 'T12:00:00Z') : null,
      confirmedTime: booking.confirmedTime,
      confirmedTimeLabel: booking.confirmedTime ? TIME_SLOT_LABELS[booking.confirmedTime as keyof typeof TIME_SLOT_LABELS] : null,

      // Timestamps
      createdAt: booking.createdAt,
      createdAtFormatted: formatETDateShort(booking.createdAt),

      // Cancellation info
      cancellationReason: booking.cancellationReason,
      cancelledAt: booking.cancelledAt,

      // Can cancel flag (confirmed bookings more than 24h out, or pending bookings)
      canCancel: canCancelBooking(booking),
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Status lookup failed:', error);
    return NextResponse.json(
      { error: 'Unable to retrieve booking status. Please try again.' },
      { status: 500 }
    );
  }
}

/**
 * Determine if a booking can be cancelled by the customer
 */
function canCancelBooking(booking: { status: string; confirmedDate?: string }): boolean {
  // Can't cancel already completed or cancelled bookings
  if (booking.status === 'completed' || booking.status === 'cancelled') {
    return false;
  }

  // Pending bookings can always be cancelled
  if (booking.status === 'pending') {
    return true;
  }

  // Confirmed bookings can only be cancelled if more than 24 hours out
  if (booking.status === 'confirmed' && booking.confirmedDate) {
    const appointmentDate = new Date(`${booking.confirmedDate}T12:00:00`);
    const now = new Date();
    const hoursUntil = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return hoursUntil > 24;
  }

  return false;
}
