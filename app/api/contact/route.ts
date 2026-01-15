import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.RESEND_API_KEY || '');

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, service, preferredDate, preferredTime, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service Interest:</strong> ${service}</p>
      ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ''}
      ${preferredTime ? `<p><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
      ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
      <hr />
      <p style="color: #666; font-size: 12px;">This message was sent from the Destiny Eden Mobile Massage website contact form.</p>
    `;

    const emailText = `
New Contact Form Submission

From: ${name}
Email: ${email}
Phone: ${phone}
Service Interest: ${service}
${preferredDate ? `Preferred Date: ${preferredDate}` : ''}
${preferredTime ? `Preferred Time: ${preferredTime}` : ''}
${message ? `Message: ${message}` : ''}

---
This message was sent from the Destiny Eden Mobile Massage website contact form.
    `;

    // Send email via SendGrid
    await sgMail.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@example.com',
      to: process.env.RESEND_TO_EMAIL || 'test@example.com',
      replyTo: email,
      subject: `New Booking Request: ${service} - ${name}`,
      html: emailHtml,
      text: emailText,
    });

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
