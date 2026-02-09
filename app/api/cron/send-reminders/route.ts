import { NextRequest, NextResponse } from 'next/server';
import { getBookingsForTomorrow } from '@/lib/bookings';
import { sendAppointmentReminderEmail } from '@/lib/booking-emails';
import { sendAppointmentReminderSMS, isTwilioConfigured } from '@/lib/twilio-sms';

/**
 * Cron job to send appointment reminders 24 hours before
 *
 * This endpoint is called daily by Vercel Cron
 * Schedule: Every day at 9 AM ET (14:00 UTC)
 *
 * It finds all confirmed bookings for tomorrow and sends reminder emails
 */
export async function GET(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // In development, allow without auth
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Get confirmed bookings for tomorrow
    const bookings = await getBookingsForTomorrow();

    if (bookings.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No reminders to send',
        count: 0,
      });
    }

    // Send reminder emails and SMS
    const notifications: Promise<any>[] = [];

    bookings.forEach((booking) => {
      // Always send email
      notifications.push(sendAppointmentReminderEmail(booking));

      // Send SMS if Twilio is configured and customer has phone
      if (isTwilioConfigured() && booking.customerPhone) {
        notifications.push(
          sendAppointmentReminderSMS(
            booking.customerPhone,
            booking.customerName,
            booking.service,
            booking.preferredDate || 'Tomorrow',
            booking.preferredTime || 'As requested'
          )
        );
      }
    });

    const results = await Promise.allSettled(notifications);

    const sent = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    // Log failures for debugging
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Failed to send reminder notification ${index}:`, result.reason);
      }
    });

    return NextResponse.json({
      success: true,
      message: `Sent ${sent} reminders, ${failed} failed`,
      count: sent,
      failed,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { error: 'Failed to process reminders' },
      { status: 500 }
    );
  }
}
