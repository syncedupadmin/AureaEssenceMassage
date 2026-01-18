import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { getBookingById, updateBooking, isTimeSlotAvailable, isDateBlocked } from '@/lib/bookings';
import { updateBookingSchema } from '@/lib/schemas/booking';
import { sendBookingConfirmedEmail, sendBookingCancelledEmail } from '@/lib/booking-emails';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteParams) {
  try {
    // 1. Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get booking ID
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 });
    }

    // 3. Fetch booking
    const booking = await getBookingById(id);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ booking });

  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteParams) {
  try {
    // 1. Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get booking ID
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 });
    }

    // 3. Parse and validate body
    const body = await request.json();
    const validation = updateBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // 4. Fetch existing booking
    const existingBooking = await getBookingById(id);

    if (!existingBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const updates = validation.data;

    // 5. Double-booking prevention when confirming
    if (updates.status === 'confirmed' && updates.confirmedDate && updates.confirmedTime) {
      // Check if date is blocked
      const dateBlocked = await isDateBlocked(updates.confirmedDate);
      if (dateBlocked) {
        return NextResponse.json(
          { error: 'This date is blocked and not available for bookings.' },
          { status: 400 }
        );
      }

      // Check for double booking
      const slotAvailable = await isTimeSlotAvailable(
        updates.confirmedDate,
        updates.confirmedTime,
        id // Exclude current booking from check
      );

      if (!slotAvailable) {
        return NextResponse.json(
          { error: 'This time slot already has a booking. Please choose a different time.' },
          { status: 409 }
        );
      }
    }

    // 6. Update booking
    const updatedBooking = await updateBooking(id, updates);

    if (!updatedBooking) {
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      );
    }

    // 7. Send emails based on status change
    try {
      if (updates.status === 'confirmed' && existingBooking.status !== 'confirmed') {
        await sendBookingConfirmedEmail(updatedBooking);
      } else if (updates.status === 'cancelled' && existingBooking.status !== 'cancelled') {
        await sendBookingCancelledEmail(updatedBooking, false); // false = cancelled by admin
      }
    } catch (emailError) {
      console.error('Email send failed (non-critical):', emailError);
    }

    return NextResponse.json({ booking: updatedBooking });

  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}
