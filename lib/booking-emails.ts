import sgMail from '@sendgrid/mail';
import type { Booking } from './bookings';
import { formatETDate, formatETDateShort } from './timezone';
import { TIME_SLOT_LABELS, LOCATION_TYPE_LABELS } from './schemas/booking';
import { businessConfig } from '@/config/business';

// Initialize SendGrid
sgMail.setApiKey(process.env.RESEND_API_KEY || '');

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@aureaessencemassage.com';
const ADMIN_EMAIL = process.env.RESEND_TO_EMAIL || 'admin@aureaessencemassage.com';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aureaessencemassage.com';

/**
 * Email template styles (inline CSS for email compatibility)
 */
const styles = {
  container: 'max-width: 600px; margin: 0 auto; font-family: Georgia, serif; color: #1a1a1a; background-color: #faf9f7;',
  header: 'padding: 32px 24px; text-align: center; background: linear-gradient(135deg, #be8a6e 0%, #d4a88a 100%); color: white;',
  headerTitle: 'font-size: 24px; font-weight: 400; margin: 0; letter-spacing: 1px;',
  headerSubtitle: 'font-size: 14px; opacity: 0.9; margin-top: 8px;',
  body: 'padding: 32px 24px;',
  section: 'background-color: white; border-radius: 4px; padding: 24px; margin-bottom: 20px; border: 1px solid #e8e5e0;',
  sectionTitle: 'font-size: 16px; font-weight: 600; margin: 0 0 16px 0; color: #1a1a1a; border-bottom: 1px solid #e8e5e0; padding-bottom: 12px;',
  row: 'margin-bottom: 12px;',
  label: 'font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px;',
  value: 'font-size: 15px; color: #1a1a1a;',
  highlight: 'background-color: #f8f5f1; padding: 16px; border-radius: 4px; text-align: center; margin: 20px 0;',
  highlightLabel: 'font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;',
  highlightValue: 'font-size: 20px; font-weight: 600; color: #be8a6e; letter-spacing: 2px;',
  button: 'display: inline-block; background-color: #be8a6e; color: white; text-decoration: none; padding: 14px 32px; border-radius: 4px; font-size: 14px; font-weight: 500; letter-spacing: 0.5px;',
  buttonSecondary: 'display: inline-block; background-color: transparent; color: #be8a6e; text-decoration: none; padding: 12px 24px; border: 1px solid #be8a6e; border-radius: 4px; font-size: 14px;',
  footer: 'padding: 24px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e8e5e0;',
  statusBadge: (status: string) => {
    const colors: Record<string, string> = {
      pending: 'background-color: #fef3c7; color: #92400e;',
      confirmed: 'background-color: #d1fae5; color: #065f46;',
      completed: 'background-color: #dbeafe; color: #1e40af;',
      cancelled: 'background-color: #fee2e2; color: #991b1b;',
    };
    return `display: inline-block; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; ${colors[status] || colors.pending}`;
  },
};

/**
 * Get time slot label
 */
function getTimeLabel(timeSlot?: string): string {
  if (!timeSlot) return 'Not specified';
  return TIME_SLOT_LABELS[timeSlot as keyof typeof TIME_SLOT_LABELS] || timeSlot;
}

/**
 * Get location type label
 */
function getLocationLabel(locationType: string): string {
  return LOCATION_TYPE_LABELS[locationType as keyof typeof LOCATION_TYPE_LABELS] || locationType;
}

/**
 * Email 1: Booking Received (to customer)
 * Sent immediately when a booking request is submitted
 */
export async function sendBookingReceivedEmail(booking: Booking): Promise<void> {
  const statusUrl = `${SITE_URL}/booking/status?ref=${booking.lookupToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
      <div style="${styles.container}">
        <div style="${styles.header}">
          <h1 style="${styles.headerTitle}">${businessConfig.name}</h1>
          <p style="${styles.headerSubtitle}">Booking Request Received</p>
        </div>

        <div style="${styles.body}">
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
            Dear ${booking.customerName},
          </p>
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
            Thank you for your booking request. We've received your information and will review it shortly.
            You'll receive a confirmation email once your appointment is confirmed.
          </p>

          <div style="${styles.highlight}">
            <p style="${styles.highlightLabel}">Your Reference Number</p>
            <p style="${styles.highlightValue}">${booking.lookupToken}</p>
          </div>

          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Request Details</h2>
            <div style="${styles.row}">
              <span style="${styles.label}">Service</span>
              <span style="${styles.value}">${booking.service}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Location Type</span>
              <span style="${styles.value}">${getLocationLabel(booking.locationType)}</span>
            </div>
            ${booking.preferredDate ? `
            <div style="${styles.row}">
              <span style="${styles.label}">Preferred Date</span>
              <span style="${styles.value}">${formatETDateShort(booking.preferredDate + 'T12:00:00Z')}</span>
            </div>
            ` : ''}
            ${booking.preferredTime ? `
            <div style="${styles.row}">
              <span style="${styles.label}">Preferred Time</span>
              <span style="${styles.value}">${getTimeLabel(booking.preferredTime)}</span>
            </div>
            ` : ''}
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${statusUrl}" style="${styles.button}">Check Booking Status</a>
          </div>

          <p style="margin: 20px 0 0 0; font-size: 14px; color: #666; line-height: 1.6;">
            If you have any questions, please don't hesitate to contact us at
            <a href="tel:${businessConfig.contact.phoneRaw}" style="color: #be8a6e;">${businessConfig.contact.phone}</a>.
          </p>
        </div>

        <div style="${styles.footer}">
          <p>&copy; ${new Date().getFullYear()} ${businessConfig.name}</p>
          <p>Luxury Wellness, Delivered to Your Door</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${businessConfig.name}
Booking Request Received

Dear ${booking.customerName},

Thank you for your booking request. We've received your information and will review it shortly.

Your Reference Number: ${booking.lookupToken}

Request Details:
- Service: ${booking.service}
- Location Type: ${getLocationLabel(booking.locationType)}
${booking.preferredDate ? `- Preferred Date: ${formatETDateShort(booking.preferredDate + 'T12:00:00Z')}` : ''}
${booking.preferredTime ? `- Preferred Time: ${getTimeLabel(booking.preferredTime)}` : ''}

Check your booking status: ${statusUrl}

Questions? Contact us at ${businessConfig.contact.phone}

${businessConfig.name}
Luxury Wellness, Delivered to Your Door
  `;

  await sgMail.send({
    from: FROM_EMAIL,
    to: booking.customerEmail,
    subject: `Booking Request Received - ${booking.lookupToken}`,
    html,
    text,
  });
}

/**
 * Email 2: Booking Confirmed (to customer)
 * Sent when admin confirms the booking with date/time
 */
export async function sendBookingConfirmedEmail(booking: Booking): Promise<void> {
  const statusUrl = `${SITE_URL}/booking/status?ref=${booking.lookupToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
      <div style="${styles.container}">
        <div style="${styles.header}">
          <h1 style="${styles.headerTitle}">${businessConfig.name}</h1>
          <p style="${styles.headerSubtitle}">Appointment Confirmed</p>
        </div>

        <div style="${styles.body}">
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
            Dear ${booking.customerName},
          </p>
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
            Great news! Your appointment has been confirmed. We look forward to providing you with a relaxing experience.
          </p>

          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Confirmed Appointment</h2>
            <div style="${styles.row}">
              <span style="${styles.label}">Date</span>
              <span style="${styles.value}; font-size: 17px; font-weight: 600;">${formatETDate(booking.confirmedDate + 'T12:00:00Z')}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Time</span>
              <span style="${styles.value}; font-size: 17px;">${getTimeLabel(booking.confirmedTime)}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Service</span>
              <span style="${styles.value}">${booking.service}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Location</span>
              <span style="${styles.value}">${getLocationLabel(booking.locationType)}${booking.address ? ` - ${booking.address}` : ''}</span>
            </div>
          </div>

          <div style="${styles.highlight}">
            <p style="${styles.highlightLabel}">Reference Number</p>
            <p style="${styles.highlightValue}">${booking.lookupToken}</p>
          </div>

          <div style="${styles.section}; background-color: #fef9f5;">
            <h2 style="${styles.sectionTitle}">Cancellation Policy</h2>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #666;">
              Please provide at least ${businessConfig.bookingPolicy.cancellationNotice} notice for cancellations.
              Cancellations within ${businessConfig.bookingPolicy.cancellationNotice} of your appointment may be subject to a ${businessConfig.bookingPolicy.cancellationFee} fee.
            </p>
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${statusUrl}" style="${styles.button}">View Booking Details</a>
          </div>

          <p style="margin: 20px 0 0 0; font-size: 14px; color: #666; line-height: 1.6;">
            Need to make changes? Contact us at
            <a href="tel:${businessConfig.contact.phoneRaw}" style="color: #be8a6e;">${businessConfig.contact.phone}</a>.
          </p>
        </div>

        <div style="${styles.footer}">
          <p>&copy; ${new Date().getFullYear()} ${businessConfig.name}</p>
          <p>Luxury Wellness, Delivered to Your Door</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${businessConfig.name}
Appointment Confirmed!

Dear ${booking.customerName},

Great news! Your appointment has been confirmed.

CONFIRMED APPOINTMENT:
Date: ${formatETDate(booking.confirmedDate + 'T12:00:00Z')}
Time: ${getTimeLabel(booking.confirmedTime)}
Service: ${booking.service}
Location: ${getLocationLabel(booking.locationType)}${booking.address ? ` - ${booking.address}` : ''}

Reference Number: ${booking.lookupToken}

CANCELLATION POLICY:
Please provide at least ${businessConfig.bookingPolicy.cancellationNotice} notice for cancellations.

View booking details: ${statusUrl}

Need to make changes? Contact us at ${businessConfig.contact.phone}

${businessConfig.name}
Luxury Wellness, Delivered to Your Door
  `;

  await sgMail.send({
    from: FROM_EMAIL,
    to: booking.customerEmail,
    subject: `Appointment Confirmed - ${formatETDateShort(booking.confirmedDate + 'T12:00:00Z')}`,
    html,
    text,
  });
}

/**
 * Email 3: Booking Cancelled (to customer)
 * Sent when booking is cancelled (by customer or admin)
 */
export async function sendBookingCancelledEmail(booking: Booking, cancelledByCustomer: boolean): Promise<void> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
      <div style="${styles.container}">
        <div style="${styles.header}; background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);">
          <h1 style="${styles.headerTitle}">${businessConfig.name}</h1>
          <p style="${styles.headerSubtitle}">Booking Cancelled</p>
        </div>

        <div style="${styles.body}">
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
            Dear ${booking.customerName},
          </p>
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
            ${cancelledByCustomer
              ? 'Your booking has been cancelled as requested.'
              : 'We regret to inform you that your booking has been cancelled.'}
          </p>

          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Cancelled Booking</h2>
            <div style="${styles.row}">
              <span style="${styles.label}">Reference Number</span>
              <span style="${styles.value}">${booking.lookupToken}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Service</span>
              <span style="${styles.value}">${booking.service}</span>
            </div>
            ${booking.confirmedDate ? `
            <div style="${styles.row}">
              <span style="${styles.label}">Original Date</span>
              <span style="${styles.value}">${formatETDateShort(booking.confirmedDate + 'T12:00:00Z')}</span>
            </div>
            ` : ''}
            ${booking.cancellationReason ? `
            <div style="${styles.row}">
              <span style="${styles.label}">Reason</span>
              <span style="${styles.value}">${booking.cancellationReason}</span>
            </div>
            ` : ''}
          </div>

          <p style="margin: 20px 0; font-size: 15px; line-height: 1.6;">
            We'd love to serve you in the future. Please don't hesitate to book again when you're ready.
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${SITE_URL}/#contact" style="${styles.button}">Book Another Appointment</a>
          </div>

          <p style="margin: 20px 0 0 0; font-size: 14px; color: #666; line-height: 1.6;">
            Questions? Contact us at
            <a href="tel:${businessConfig.contact.phoneRaw}" style="color: #be8a6e;">${businessConfig.contact.phone}</a>.
          </p>
        </div>

        <div style="${styles.footer}">
          <p>&copy; ${new Date().getFullYear()} ${businessConfig.name}</p>
          <p>Luxury Wellness, Delivered to Your Door</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${businessConfig.name}
Booking Cancelled

Dear ${booking.customerName},

${cancelledByCustomer
    ? 'Your booking has been cancelled as requested.'
    : 'We regret to inform you that your booking has been cancelled.'}

CANCELLED BOOKING:
Reference: ${booking.lookupToken}
Service: ${booking.service}
${booking.confirmedDate ? `Original Date: ${formatETDateShort(booking.confirmedDate + 'T12:00:00Z')}` : ''}
${booking.cancellationReason ? `Reason: ${booking.cancellationReason}` : ''}

We'd love to serve you in the future.

Questions? Contact us at ${businessConfig.contact.phone}

${businessConfig.name}
Luxury Wellness, Delivered to Your Door
  `;

  await sgMail.send({
    from: FROM_EMAIL,
    to: booking.customerEmail,
    subject: `Booking Cancelled - ${booking.lookupToken}`,
    html,
    text,
  });
}

/**
 * Email 4: Appointment Reminder (to customer)
 * Sent 24 hours before confirmed appointment
 */
export async function sendAppointmentReminderEmail(booking: Booking): Promise<void> {
  const statusUrl = `${SITE_URL}/booking/status?ref=${booking.lookupToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
      <div style="${styles.container}">
        <div style="${styles.header}">
          <h1 style="${styles.headerTitle}">${businessConfig.name}</h1>
          <p style="${styles.headerSubtitle}">Appointment Reminder</p>
        </div>

        <div style="${styles.body}">
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
            Dear ${booking.customerName},
          </p>
          <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6;">
            This is a friendly reminder that your massage appointment is <strong>tomorrow</strong>.
            We look forward to providing you with a relaxing experience!
          </p>

          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Your Appointment</h2>
            <div style="${styles.row}">
              <span style="${styles.label}">Date</span>
              <span style="${styles.value}; font-size: 17px; font-weight: 600;">${formatETDate(booking.confirmedDate + 'T12:00:00Z')}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Time</span>
              <span style="${styles.value}; font-size: 17px;">${getTimeLabel(booking.confirmedTime)}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Service</span>
              <span style="${styles.value}">${booking.service}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Location</span>
              <span style="${styles.value}">${getLocationLabel(booking.locationType)}${booking.address ? ` - ${booking.address}` : ''}</span>
            </div>
          </div>

          <div style="${styles.section}; background-color: #fef9f5;">
            <h2 style="${styles.sectionTitle}">Preparation Tips</h2>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.8; color: #666;">
              <li>Ensure a quiet, comfortable space is available</li>
              <li>Have clean sheets or towels ready if needed</li>
              <li>Stay hydrated before your session</li>
              <li>Let us know about any areas of concern or focus</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${statusUrl}" style="${styles.button}">View Booking Details</a>
          </div>

          <p style="margin: 20px 0 0 0; font-size: 14px; color: #666; line-height: 1.6;">
            Need to reschedule? Contact us as soon as possible at
            <a href="tel:${businessConfig.contact.phoneRaw}" style="color: #be8a6e;">${businessConfig.contact.phone}</a>.
          </p>
        </div>

        <div style="${styles.footer}">
          <p>&copy; ${new Date().getFullYear()} ${businessConfig.name}</p>
          <p>Luxury Wellness, Delivered to Your Door</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${businessConfig.name}
Appointment Reminder

Dear ${booking.customerName},

This is a friendly reminder that your massage appointment is TOMORROW.

YOUR APPOINTMENT:
Date: ${formatETDate(booking.confirmedDate + 'T12:00:00Z')}
Time: ${getTimeLabel(booking.confirmedTime)}
Service: ${booking.service}
Location: ${getLocationLabel(booking.locationType)}${booking.address ? ` - ${booking.address}` : ''}

PREPARATION TIPS:
- Ensure a quiet, comfortable space is available
- Have clean sheets or towels ready if needed
- Stay hydrated before your session
- Let us know about any areas of concern or focus

View booking details: ${statusUrl}

Need to reschedule? Contact us at ${businessConfig.contact.phone}

${businessConfig.name}
Luxury Wellness, Delivered to Your Door
  `;

  await sgMail.send({
    from: FROM_EMAIL,
    to: booking.customerEmail,
    subject: `Reminder: Your Appointment Tomorrow - ${getTimeLabel(booking.confirmedTime)}`,
    html,
    text,
  });
}

/**
 * Email 5: New Booking Alert (to admin)
 * Sent immediately when a new booking is submitted
 */
export async function sendNewBookingAdminAlert(booking: Booking): Promise<void> {
  const adminUrl = `${SITE_URL}/admin`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 20px; background-color: #f5f5f5;">
      <div style="${styles.container}">
        <div style="${styles.header}; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">
          <h1 style="${styles.headerTitle}">New Booking Request</h1>
          <p style="${styles.headerSubtitle}">${booking.lookupToken}</p>
        </div>

        <div style="${styles.body}">
          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Customer Information</h2>
            <div style="${styles.row}">
              <span style="${styles.label}">Name</span>
              <span style="${styles.value}">${booking.customerName}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Email</span>
              <span style="${styles.value}"><a href="mailto:${booking.customerEmail}" style="color: #be8a6e;">${booking.customerEmail}</a></span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Phone</span>
              <span style="${styles.value}"><a href="tel:${booking.customerPhone}" style="color: #be8a6e;">${booking.customerPhone}</a></span>
            </div>
          </div>

          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Booking Details</h2>
            <div style="${styles.row}">
              <span style="${styles.label}">Service</span>
              <span style="${styles.value}">${booking.service}</span>
            </div>
            <div style="${styles.row}">
              <span style="${styles.label}">Location Type</span>
              <span style="${styles.value}">${getLocationLabel(booking.locationType)}</span>
            </div>
            ${booking.address ? `
            <div style="${styles.row}">
              <span style="${styles.label}">Address/Area</span>
              <span style="${styles.value}">${booking.address}</span>
            </div>
            ` : ''}
            ${booking.preferredDate ? `
            <div style="${styles.row}">
              <span style="${styles.label}">Preferred Date</span>
              <span style="${styles.value}">${formatETDateShort(booking.preferredDate + 'T12:00:00Z')}</span>
            </div>
            ` : ''}
            ${booking.preferredTime ? `
            <div style="${styles.row}">
              <span style="${styles.label}">Preferred Time</span>
              <span style="${styles.value}">${getTimeLabel(booking.preferredTime)}</span>
            </div>
            ` : ''}
            ${booking.preferredPressure ? `
            <div style="${styles.row}">
              <span style="${styles.label}">Preferred Pressure</span>
              <span style="${styles.value}">${booking.preferredPressure}</span>
            </div>
            ` : ''}
          </div>

          ${booking.message ? `
          <div style="${styles.section}">
            <h2 style="${styles.sectionTitle}">Special Requests</h2>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #666;">${booking.message}</p>
          </div>
          ` : ''}

          <div style="text-align: center; margin: 24px 0;">
            <a href="${adminUrl}" style="${styles.button}">Open Admin Dashboard</a>
          </div>
        </div>

        <div style="${styles.footer}">
          <p>This is an automated notification from your booking system.</p>
          <p>Submitted: ${new Date(booking.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
NEW BOOKING REQUEST
Reference: ${booking.lookupToken}

CUSTOMER:
Name: ${booking.customerName}
Email: ${booking.customerEmail}
Phone: ${booking.customerPhone}

BOOKING DETAILS:
Service: ${booking.service}
Location: ${getLocationLabel(booking.locationType)}
${booking.address ? `Address: ${booking.address}` : ''}
${booking.preferredDate ? `Preferred Date: ${formatETDateShort(booking.preferredDate + 'T12:00:00Z')}` : ''}
${booking.preferredTime ? `Preferred Time: ${getTimeLabel(booking.preferredTime)}` : ''}
${booking.preferredPressure ? `Preferred Pressure: ${booking.preferredPressure}` : ''}

${booking.message ? `SPECIAL REQUESTS:\n${booking.message}` : ''}

Admin Dashboard: ${adminUrl}

Submitted: ${new Date(booking.createdAt).toLocaleString('en-US', { timeZone: 'America/New_York' })} ET
  `;

  await sgMail.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Booking: ${booking.service} - ${booking.customerName}`,
    html,
    text,
  });
}
