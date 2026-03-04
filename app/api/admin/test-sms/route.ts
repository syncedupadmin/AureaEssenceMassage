import { NextRequest, NextResponse } from 'next/server';
import { sendOwnerSMSAlert } from '@/lib/booking-emails';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await sendOwnerSMSAlert('TEST: Aurea Essence booking alerts are now active on this number!');
    return NextResponse.json({ success: true, message: 'SMS sent via Twilio direct' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
