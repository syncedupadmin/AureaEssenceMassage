import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import {
  getBusinessData,
  saveService,
  deleteService,
  saveAddOn,
  type Service,
  type AddOn,
} from '@/lib/data';

// GET - Fetch all services and add-ons
export async function GET() {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await getBusinessData();
    return NextResponse.json({
      services: data.services,
      addOns: data.addOns,
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST - Create or update a service or add-on
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Check if it's an add-on update
    if (body.addOn) {
      const addOn = body.addOn as AddOn;
      await saveAddOn(addOn);
      return NextResponse.json({ success: true });
    }

    // Otherwise it's a service
    const service = body as Service;

    if (!service.id && !service.title) {
      return NextResponse.json(
        { error: 'Service data is required' },
        { status: 400 }
      );
    }

    await saveService(service);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving service:', error);
    return NextResponse.json(
      { error: 'Failed to save service' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a service
export async function DELETE(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Service ID is required' },
        { status: 400 }
      );
    }

    await deleteService(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
