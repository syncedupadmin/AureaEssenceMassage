import { NextRequest, NextResponse } from 'next/server';
import { getBookingByToken, updateBooking } from '@/lib/bookings';
import { rateLimitBookingCancel } from '@/lib/rate-limit';
import { cancelBookingSchema } from '@/lib/schemas/booking';
import { sendBookingCancelledEmail } from '@/lib/booking-emails';

interface RouteParams {
  params: Promise<{ token: string }>;
}

export async function POST(request: NextRequest, context: RouteParams) {
  try {
    // 1. Rate limit check
    const rateLimitResult = await rateLimitBookingCancel(request);
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

    // 3. Parse and validate body
    const body = await request.json().catch(() => ({}));
    const validation = cancelBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // 4. Look up booking
    const booking = await getBookingByToken(token.toUpperCase());

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found. Please check your reference number.' },
        { status: 404 }
      );
    }

    // 5. Check if booking can be cancelled
    const cancelCheck = checkCanCancel(booking);
    if (!cancelCheck.allowed) {
      return NextResponse.json(
        { error: cancelCheck.reason },
        { status: 400 }
      );
    }

    // 6. Update booking status
    const cancelReason = validation.data.reason
      ? `Customer requested: ${validation.data.reason}`
      : 'Customer requested cancellation';

    const updatedBooking = await updateBooking(booking.id, {
      status: 'cancelled',
      cancellationReason: cancelReason,
    });

    if (!updatedBooking) {
      return NextResponse.json(
        { error: 'Failed to cancel booking. Please try again.' },
        { status: 500 }
      );
    }

    // 7. Send cancellation email (non-critical)
    try {
      await sendBookingCancelledEmail(updatedBooking, true); // true = cancelled by customer
    } catch (emailError) {
      console.error('Cancellation email failed (non-critical):', emailError);
    }

    // 8. Return success
    return NextResponse.json({
      success: true,
      message: 'Your booking has been cancelled. You will receive a confirmation email.',
    });

  } catch (error) {
    console.error('Booking cancellation failed:', error);
    return NextResponse.json(
      { error: 'Unable to cancel booking. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}

/**
 * Check if a booking can be cancelled and return reason if not
 */
function checkCanCancel(booking: {
  status: string;
  confirmedDate?: string;
}): { allowed: boolean; reason?: string } {
  // Already cancelled
  if (booking.status === 'cancelled') {
    return { allowed: false, reason: 'This booking has already been cancelled.' };
  }

  // Already completed
  if (booking.status === 'completed') {
    return { allowed: false, reason: 'This appointment has already been completed.' };
  }

  // Pending bookings can always be cancelled
  if (booking.status === 'pending') {
    return { allowed: true };
  }

  // Confirmed bookings - check 24 hour policy
  if (booking.status === 'confirmed' && booking.confirmedDate) {
    const appointmentDate = new Date(`${booking.confirmedDate}T12:00:00`);
    const now = new Date();
    const hoursUntil = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntil <= 24) {
      return {
        allowed: false,
        reason: 'Bookings cannot be cancelled within 24 hours of the appointment. Please contact us directly at (786) 671-8182 to make changes.',
      };
    }

    return { allowed: true };
  }

  return { allowed: true };
}
