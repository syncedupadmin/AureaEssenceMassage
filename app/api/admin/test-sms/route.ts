import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { sendOwnerSMSAlert } from '@/lib/booking-emails';

export async function POST() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: { message: string; success: boolean; error?: string }[] = [];

  // Test 1: New booking alert
  try {
    await sendOwnerSMSAlert(
      'TEST - New booking: Jane Doe - Swedish Massage\nDate: 2026-03-10 morning\nPhone: 786-555-1234'
    );
    results.push({ message: 'New booking SMS', success: true });
  } catch (e: any) {
    results.push({ message: 'New booking SMS', success: false, error: e.message });
  }

  // Test 2: Cancellation alert
  try {
    await sendOwnerSMSAlert(
      'TEST - CANCELLED: Jane Doe - Swedish Massage\nDate: 2026-03-10'
    );
    results.push({ message: 'Cancellation SMS', success: true });
  } catch (e: any) {
    results.push({ message: 'Cancellation SMS', success: false, error: e.message });
  }

  return NextResponse.json({ results });
}
