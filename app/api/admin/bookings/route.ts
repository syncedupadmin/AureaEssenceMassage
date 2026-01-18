import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { listBookings, getBookingStats } from '@/lib/bookings';
import { listBookingsSchema, type BookingStatus } from '@/lib/schemas/booking';

export async function GET(request: NextRequest) {
  try {
    // 1. Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse query params
    const searchParams = request.nextUrl.searchParams;
    const params = {
      status: searchParams.get('status') || undefined,
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '20',
    };

    // 3. Validate params
    const validation = listBookingsSchema.safeParse(params);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid parameters', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // 4. Fetch bookings and stats
    const [result, stats] = await Promise.all([
      listBookings({
        status: validation.data.status as BookingStatus | undefined,
        page: validation.data.page,
        limit: validation.data.limit,
      }),
      getBookingStats(),
    ]);

    // 5. Return response
    return NextResponse.json({
      bookings: result.bookings,
      total: result.total,
      page: validation.data.page,
      limit: validation.data.limit,
      stats,
    });

  } catch (error) {
    console.error('Error listing bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
