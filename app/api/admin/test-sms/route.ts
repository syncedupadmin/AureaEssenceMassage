import { NextRequest, NextResponse } from 'next/server';
import { sendOwnerSMSAlert } from '@/lib/booking-emails';
import { Resend } from 'resend';
import { getResendApiKey, getAdminEmail } from '@/lib/settings';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Record<string, any> = {};

  // Test SMS
  try {
    await sendOwnerSMSAlert('TEST: Aurea Essence booking alerts are now active on this number!');
    results.sms = 'sent';
  } catch (e: any) {
    results.sms = { error: e?.message };
  }

  // Test Email
  try {
    const apiKey = await getResendApiKey();
    const adminEmail = await getAdminEmail();
    if (!apiKey || !adminEmail) throw new Error('Resend not configured');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: 'Aurea Essence <noreply@aureaessencemassage.com>',
      to: adminEmail,
      subject: 'TEST: Email alerts are working',
      html: '<p>This is a test email confirming that Aurea Essence email notifications are configured correctly.</p>',
    });
    results.email = { sent: true, to: adminEmail };
  } catch (e: any) {
    results.email = { error: e?.message };
  }

  return NextResponse.json({ success: true, results });
}
