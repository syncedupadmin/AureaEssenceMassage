import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { addBlockedDate, removeBlockedDate } from '@/lib/bookings';
import { blockedDateSchema } from '@/lib/schemas/booking';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // 1. Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse and validate body
    const body = await request.json();
    const validation = blockedDateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // 3. Add blocked date
    await addBlockedDate(validation.data.date, validation.data.reason);

    return NextResponse.json({
      success: true,
      message: 'Date has been blocked',
    });

  } catch (error) {
    console.error('Error adding blocked date:', error);
    return NextResponse.json(
      { error: 'Failed to block date' },
      { status: 500 }
    );
  }
}

// Schema for delete request
const deleteDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export async function DELETE(request: NextRequest) {
  try {
    // 1. Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse and validate body
    const body = await request.json();
    const validation = deleteDateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // 3. Remove blocked date
    await removeBlockedDate(validation.data.date);

    return NextResponse.json({
      success: true,
      message: 'Date has been unblocked',
    });

  } catch (error) {
    console.error('Error removing blocked date:', error);
    return NextResponse.json(
      { error: 'Failed to unblock date' },
      { status: 500 }
    );
  }
}
