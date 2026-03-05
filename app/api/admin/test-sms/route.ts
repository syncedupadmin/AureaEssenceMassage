import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getResendApiKey, getAdminEmail, updateSettings } from '@/lib/settings';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fix fromEmail in KV
  await updateSettings({ fromEmail: 'bookings@notifications.aureaessencemassage.com' });

  const apiKey = await getResendApiKey();
  const adminEmail = await getAdminEmail();
  const fromEmail = 'bookings@notifications.aureaessencemassage.com';

  if (!apiKey) {
    return NextResponse.json({ error: 'No Resend API key' }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: `Aurea Essence <${fromEmail}>`,
    to: adminEmail,
    subject: 'TEST: Email delivery check',
    html: '<p>Test email from Aurea Essence. If you receive this, email notifications are working!</p>',
  });

  return NextResponse.json({ from: fromEmail, to: adminEmail, resendResponse: result });
}
