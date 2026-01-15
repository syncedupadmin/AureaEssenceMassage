import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.RESEND_API_KEY || '');

interface Service {
  name: string;
  price: string;
  duration: string;
  description: string;
}

interface OnboardingData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  googleBusiness: string;
  brandColors: string;
  preferredFonts: string;
  services: Service[];
  ownerBio: string;
  businessHistory: string;
  uniqueSellingPoints: string;
  licenseNumber: string;
  certifications: string;
  insurance: string;
  yearsExperience: string;
  operatingHours: string;
  serviceLocation: string;
  serviceAreas: string;
  travelFee: string;
  paymentMethods: string;
  cancellationPolicy: string;
  bookingConfirmation: string;
  reminderSchedule: string;
  messageTone: string;
  instagram: string;
  facebook: string;
  otherSocial: string;
  reviewPlatform: string;
  testimonials: string;
  hasLegalDocs: string;
  legalDocUrls: string;
  signature: string;
  agreedToTerms: boolean;
  additionalNotes: string;
}

export async function POST(request: Request) {
  try {
    const data: OnboardingData = await request.json();

    // Validate required fields
    if (!data.businessName || !data.ownerName || !data.email || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format services list
    const servicesHtml = data.services
      .filter(s => s.name)
      .map((s, i) => `
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">${i + 1}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${s.name}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${s.price || 'TBD'}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${s.duration || 'TBD'}</td>
          <td style="padding: 10px; border: 1px solid #ddd;">${s.description || '-'}</td>
        </tr>
      `).join('');

    // Format the email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 30px; text-align: center;">
          <h1 style="color: #d4af37; margin: 0;">New Client Onboarding Submission</h1>
          <p style="color: #f5f5dc; margin-top: 10px;">Destiny Eden Mobile Massage</p>
        </div>

        <div style="padding: 30px; background: #f9f9f9;">
          <!-- Business Information -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Business Information</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0;"><strong>Business Name:</strong></td><td>${data.businessName}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Owner Name:</strong></td><td>${data.ownerName}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${data.email}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${data.phone}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Address:</strong></td><td>${data.address || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Website:</strong></td><td>${data.website || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Google Business:</strong></td><td>${data.googleBusiness || 'Not provided'}</td></tr>
          </table>

          <!-- Branding -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Branding</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0;"><strong>Brand Colors:</strong></td><td>${data.brandColors || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Preferred Fonts:</strong></td><td>${data.preferredFonts || 'Not specified'}</td></tr>
          </table>

          <!-- Services -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Services (${data.services.filter(s => s.name).length} total)</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background: #d4af37; color: #000;">
                <th style="padding: 10px; border: 1px solid #ddd;">#</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Service</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Duration</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${servicesHtml || '<tr><td colspan="5" style="padding: 10px; text-align: center;">No services added</td></tr>'}
            </tbody>
          </table>

          <!-- About -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">About & Bio</h2>
          <div style="margin-bottom: 20px;">
            <p><strong>Owner Bio:</strong></p>
            <p style="background: #fff; padding: 15px; border-left: 3px solid #d4af37;">${data.ownerBio || 'Not provided'}</p>

            <p><strong>Business History:</strong></p>
            <p style="background: #fff; padding: 15px; border-left: 3px solid #d4af37;">${data.businessHistory || 'Not provided'}</p>

            <p><strong>Unique Selling Points:</strong></p>
            <p style="background: #fff; padding: 15px; border-left: 3px solid #d4af37;">${data.uniqueSellingPoints || 'Not provided'}</p>
          </div>

          <!-- Credentials -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Credentials & Licensing</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0;"><strong>License Number (LMT):</strong></td><td>${data.licenseNumber || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Years of Experience:</strong></td><td>${data.yearsExperience || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Certifications:</strong></td><td>${data.certifications || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Insurance:</strong></td><td>${data.insurance || 'Not provided'}</td></tr>
          </table>

          <!-- Operations -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Operations</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0;"><strong>Operating Hours:</strong></td><td>${data.operatingHours || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Service Location:</strong></td><td>${data.serviceLocation}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Service Areas:</strong></td><td>${data.serviceAreas || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Travel Fee:</strong></td><td>${data.travelFee || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Payment Methods:</strong></td><td>${data.paymentMethods || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Cancellation Policy:</strong></td><td>${data.cancellationPolicy || 'Not specified'}</td></tr>
          </table>

          <!-- Messaging -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Messaging Preferences</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0;"><strong>Booking Confirmation:</strong></td><td>${data.bookingConfirmation}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Reminder Schedule:</strong></td><td>${data.reminderSchedule}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Message Tone:</strong></td><td>${data.messageTone}</td></tr>
          </table>

          <!-- Social Media -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Social Media & Reviews</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0;"><strong>Instagram:</strong></td><td>${data.instagram || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Facebook:</strong></td><td>${data.facebook || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Other Social:</strong></td><td>${data.otherSocial || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Review Platform:</strong></td><td>${data.reviewPlatform || 'Not provided'}</td></tr>
          </table>

          ${data.testimonials ? `
          <h3 style="color: #333; margin-top: 20px;">Testimonials to Feature</h3>
          <p style="background: #fff; padding: 15px; border-left: 3px solid #d4af37; white-space: pre-wrap;">${data.testimonials}</p>
          ` : ''}

          <!-- Legal -->
          <h2 style="color: #333; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">Legal & Additional</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr><td style="padding: 8px 0;"><strong>Has Legal Docs:</strong></td><td>${data.hasLegalDocs === 'yes' ? 'Yes' : 'No - needs creation'}</td></tr>
            <tr><td style="padding: 8px 0;"><strong>Legal Doc URLs:</strong></td><td>${data.legalDocUrls || 'Not provided'}</td></tr>
          </table>

          ${data.additionalNotes ? `
          <p><strong>Additional Notes:</strong></p>
          <p style="background: #fff; padding: 15px; border-left: 3px solid #d4af37;">${data.additionalNotes}</p>
          ` : ''}

          <!-- Authorization -->
          <div style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-radius: 5px;">
            <h3 style="color: #2e7d32; margin-top: 0;">Authorization</h3>
            <p><strong>Digital Signature:</strong> ${data.signature}</p>
            <p><strong>Terms Agreed:</strong> ${data.agreedToTerms ? 'Yes' : 'No'}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>

        <div style="background: #1a1a1a; padding: 20px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">
            This submission was received from the Destiny Eden Mobile Massage client onboarding form.
          </p>
        </div>
      </div>
    `;

    // Plain text version
    const emailText = `
NEW CLIENT ONBOARDING SUBMISSION
================================

Business Information
--------------------
Business Name: ${data.businessName}
Owner Name: ${data.ownerName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address || 'Not provided'}
Website: ${data.website || 'Not provided'}
Google Business: ${data.googleBusiness || 'Not provided'}

Branding
--------
Brand Colors: ${data.brandColors || 'Not specified'}
Preferred Fonts: ${data.preferredFonts || 'Not specified'}

Services (${data.services.filter(s => s.name).length} total)
--------
${data.services.filter(s => s.name).map((s, i) => `${i + 1}. ${s.name} - ${s.price || 'TBD'} - ${s.duration || 'TBD'}\n   ${s.description || 'No description'}`).join('\n\n')}

About & Bio
-----------
Owner Bio: ${data.ownerBio || 'Not provided'}
Business History: ${data.businessHistory || 'Not provided'}
Unique Selling Points: ${data.uniqueSellingPoints || 'Not provided'}

Credentials & Licensing
-----------------------
License Number (LMT): ${data.licenseNumber || 'Not provided'}
Years of Experience: ${data.yearsExperience || 'Not specified'}
Certifications: ${data.certifications || 'Not provided'}
Insurance: ${data.insurance || 'Not provided'}

Operations
----------
Operating Hours: ${data.operatingHours || 'Not specified'}
Service Location: ${data.serviceLocation}
Service Areas: ${data.serviceAreas || 'Not specified'}
Travel Fee: ${data.travelFee || 'Not specified'}
Payment Methods: ${data.paymentMethods || 'Not specified'}
Cancellation Policy: ${data.cancellationPolicy || 'Not specified'}

Messaging Preferences
---------------------
Booking Confirmation: ${data.bookingConfirmation}
Reminder Schedule: ${data.reminderSchedule}
Message Tone: ${data.messageTone}

Social Media
------------
Instagram: ${data.instagram || 'Not provided'}
Facebook: ${data.facebook || 'Not provided'}
Other Social: ${data.otherSocial || 'Not provided'}
Review Platform: ${data.reviewPlatform || 'Not provided'}

Testimonials
------------
${data.testimonials || 'None provided'}

Legal
-----
Has Legal Docs: ${data.hasLegalDocs === 'yes' ? 'Yes' : 'No - needs creation'}
Legal Doc URLs: ${data.legalDocUrls || 'Not provided'}

Additional Notes
----------------
${data.additionalNotes || 'None'}

Authorization
-------------
Digital Signature: ${data.signature}
Terms Agreed: ${data.agreedToTerms ? 'Yes' : 'No'}
Submitted: ${new Date().toLocaleString()}
    `;

    // Send email via SendGrid
    await sgMail.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@example.com',
      to: process.env.RESEND_TO_EMAIL || 'test@example.com',
      replyTo: data.email,
      subject: `New Client Onboarding: ${data.businessName} - ${data.ownerName}`,
      html: emailHtml,
      text: emailText,
    });

    return NextResponse.json(
      { success: true, message: 'Onboarding information submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Onboarding form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit onboarding information' },
      { status: 500 }
    );
  }
}
