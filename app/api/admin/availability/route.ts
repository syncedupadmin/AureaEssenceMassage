import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { getBlockedDatesForMonths } from '@/lib/bookings';
import { todayET, getMonthKey } from '@/lib/timezone';

export async function GET(request: NextRequest) {
  try {
    // 1. Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse query params (optional month range)
    const searchParams = request.nextUrl.searchParams;
    const monthsParam = searchParams.get('months');

    // Default to current and next 2 months
    let monthKeys: string[];

    if (monthsParam) {
      // If specific months provided, use them
      monthKeys = monthsParam.split(',').map((m) => m.trim());
    } else {
      // Generate current and next 2 months
      const today = new Date(todayET());
      monthKeys = [];

      for (let i = 0; i < 3; i++) {
        const date = new Date(today);
        date.setMonth(date.getMonth() + i);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        monthKeys.push(`${year}-${month}`);
      }
    }

    // 3. Fetch blocked dates for requested months
    const blockedDates = await getBlockedDatesForMonths(monthKeys);

    // 4. Return response
    return NextResponse.json({
      months: monthKeys,
      blockedDates,
    });

  } catch (error) {
    console.error('Error fetching availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    );
  }
}
