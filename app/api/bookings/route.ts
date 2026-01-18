import { NextRequest, NextResponse } from 'next/server';
import { createBookingSchema } from '@/lib/schemas/booking';
import { createBooking } from '@/lib/bookings';
import { rateLimitBookingCreate } from '@/lib/rate-limit';
import { sendBookingReceivedEmail, sendNewBookingAdminAlert } from '@/lib/booking-emails';

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limit check
    const rateLimitResult = await rateLimitBookingCreate(request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Parse and validate input
    const body = await request.json();
    const validation = createBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // 3. Create booking in KV
    const booking = await createBooking(validation.data);

    // 4. Send emails (non-critical - don't fail the request)
    try {
      await Promise.all([
        sendBookingReceivedEmail(booking),
        sendNewBookingAdminAlert(booking),
      ]);
    } catch (emailError) {
      console.error('Email send failed (non-critical):', emailError);
      // Continue - booking was created successfully
    }

    // 5. Return success with lookup token
    return NextResponse.json({
      success: true,
      lookupToken: booking.lookupToken,
      message: 'Your booking request has been received. You will receive a confirmation email shortly.',
    });

  } catch (error) {
    console.error('Booking creation failed:', error);
    return NextResponse.json(
      { error: 'Unable to process booking. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
