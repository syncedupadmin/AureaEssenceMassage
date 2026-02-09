/**
 * Twilio SMS Utility Library
 *
 * Handles SMS notifications for booking confirmations, reminders, and alerts
 * Configuration managed through admin settings panel (with env var fallback)
 */

import {
  getTwilioAccountSid,
  getTwilioAuthToken,
  getTwilioPhoneNumber,
  getTwilioAdminPhone,
  isSMSConfigured as checkSMSConfigured,
} from './settings';

interface SendSMSOptions {
  to: string;
  message: string;
}

interface SMSResult {
  success: boolean;
  messageSid?: string;
  error?: string;
}

/**
 * Check if Twilio is properly configured
 * Now uses admin settings (with env var fallback)
 */
export async function isTwilioConfigured(): Promise<boolean> {
  return await checkSMSConfigured();
}

/**
 * Format phone number to E.164 format (+1XXXXXXXXXX)
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');

  // Add +1 if it's a 10-digit number (US/Canada)
  if (cleanPhone.length === 10) {
    return `+1${cleanPhone}`;
  }

  // Add + if not present
  if (!cleanPhone.startsWith('+')) {
    return `+${cleanPhone}`;
  }

  return cleanPhone;
}

/**
 * Send SMS via Twilio
 */
export async function sendSMS({ to, message }: SendSMSOptions): Promise<SMSResult> {
  // Check configuration
  const isConfigured = await isTwilioConfigured();
  if (!isConfigured) {
    console.warn('Twilio not configured - SMS not sent');
    return {
      success: false,
      error: 'Twilio not configured',
    };
  }

  try {
    // Get credentials from settings
    const accountSid = await getTwilioAccountSid();
    const authToken = await getTwilioAuthToken();
    const phoneNumber = await getTwilioPhoneNumber();

    if (!accountSid || !authToken || !phoneNumber) {
      return {
        success: false,
        error: 'Twilio credentials missing',
      };
    }

    const formattedTo = formatPhoneNumber(to);

    // Make request to Twilio API
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: formattedTo,
          From: phoneNumber,
          Body: message,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Twilio SMS error:', errorText);

      try {
        const errorJson = JSON.parse(errorText);
        return {
          success: false,
          error: errorJson.message || 'Failed to send SMS',
        };
      } catch {
        return {
          success: false,
          error: 'Failed to send SMS',
        };
      }
    }

    const data = await response.json();

    return {
      success: true,
      messageSid: data.sid,
    };

  } catch (error) {
    console.error('SMS send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send booking confirmation SMS to customer
 */
export async function sendBookingConfirmationSMS(
  customerPhone: string,
  customerName: string,
  service: string,
  preferredDate: string
): Promise<SMSResult> {
  const message = `Hi ${customerName}! Your Aurea Essence massage booking request has been received.

Service: ${service}
Preferred Date: ${preferredDate}

We'll confirm your appointment shortly. Reply STOP to unsubscribe.`;

  return sendSMS({
    to: customerPhone,
    message,
  });
}

/**
 * Send new booking alert SMS to admin/therapist
 */
export async function sendNewBookingAlertSMS(
  customerName: string,
  service: string,
  preferredDate: string,
  preferredTime: string,
  phone: string
): Promise<SMSResult> {
  const adminPhone = await getTwilioAdminPhone();

  if (!adminPhone) {
    console.warn('TWILIO_ADMIN_PHONE not configured - admin SMS not sent');
    return {
      success: false,
      error: 'Admin phone not configured',
    };
  }

  const message = `🌟 NEW BOOKING REQUEST

Customer: ${customerName}
Service: ${service}
Date: ${preferredDate}
Time: ${preferredTime}
Phone: ${phone}

Check admin panel for details.`;

  return sendSMS({
    to: adminPhone,
    message,
  });
}

/**
 * Send appointment reminder SMS to customer
 */
export async function sendAppointmentReminderSMS(
  customerPhone: string,
  customerName: string,
  service: string,
  appointmentDate: string,
  appointmentTime: string
): Promise<SMSResult> {
  const message = `Reminder: Hi ${customerName}! Your Aurea Essence massage is tomorrow.

Service: ${service}
Date: ${appointmentDate}
Time: ${appointmentTime}

Looking forward to seeing you! Reply with questions.`;

  return sendSMS({
    to: customerPhone,
    message,
  });
}

/**
 * Send booking status update SMS to customer
 */
export async function sendBookingStatusSMS(
  customerPhone: string,
  customerName: string,
  status: 'confirmed' | 'cancelled',
  service: string,
  appointmentDate?: string,
  appointmentTime?: string
): Promise<SMSResult> {
  let message: string;

  if (status === 'confirmed') {
    message = `Great news ${customerName}! Your Aurea Essence massage is confirmed.

Service: ${service}
Date: ${appointmentDate}
Time: ${appointmentTime}

We look forward to pampering you!`;
  } else {
    message = `Hi ${customerName}, your Aurea Essence massage appointment has been cancelled.

Service: ${service}

If this was a mistake, please contact us to reschedule.`;
  }

  return sendSMS({
    to: customerPhone,
    message,
  });
}
