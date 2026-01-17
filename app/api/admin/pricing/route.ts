import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { getBusinessData, updateAllPricing, type Pricing } from '@/lib/data';

// GET - Fetch pricing
export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getBusinessData();
    return NextResponse.json({ pricing: data.pricing });
  } catch (error) {
    console.error('Error fetching pricing:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing' },
      { status: 500 }
    );
  }
}

// POST - Update pricing
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pricing } = await request.json() as { pricing: Pricing };

    if (!pricing) {
      return NextResponse.json(
        { error: 'Pricing data is required' },
        { status: 400 }
      );
    }

    await updateAllPricing(pricing);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving pricing:', error);
    return NextResponse.json(
      { error: 'Failed to save pricing' },
      { status: 500 }
    );
  }
}
