import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getResendApiKey, getAdminEmail, getFromEmail } from '@/lib/settings';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = await getResendApiKey();
  const adminEmail = await getAdminEmail();
  const fromEmail = await getFromEmail();

  if (!apiKey) {
    return NextResponse.json({ error: 'No Resend API key found', envKey: !!process.env.RESEND_API_KEY }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: `Aurea Essence <${fromEmail}>`,
    to: adminEmail,
    subject: 'TEST: Email delivery check',
    html: '<p>Test email from Aurea Essence. If you receive this, email is working.</p>',
  });

  return NextResponse.json({
    apiKeySource: apiKey.substring(0, 8) + '...',
    from: fromEmail,
    to: adminEmail,
    resendResponse: result,
  });
}
