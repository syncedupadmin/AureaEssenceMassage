import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import {
  getSettings,
  updateSettings,
  hasCustomAdminPassword,
  isEmailConfigured,
  type SiteSettings,
} from '@/lib/settings';
import { z } from 'zod';

// Schema for updating settings
const updateSettingsSchema = z.object({
  emailProvider: z.enum(['sendgrid', 'none']).optional(),
  sendgridApiKey: z.string().optional(),
  fromEmail: z.string().email().optional(),
  adminEmail: z.string().email().optional(),
  siteUrl: z.string().url().optional(),
  businessName: z.string().min(1).max(100).optional(),
  businessPhone: z.string().max(20).optional(),
  reminderEmailsEnabled: z.boolean().optional(),
  cancellationHours: z.number().int().min(1).max(168).optional(),
});

export async function GET() {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get settings
    const settings = await getSettings();
    const hasCustomPassword = await hasCustomAdminPassword();
    const emailConfigured = await isEmailConfigured();

    // Don't expose the actual API key, just indicate if it's set
    const safeSettings = {
      ...settings,
      sendgridApiKey: settings.sendgridApiKey ? '••••••••' : undefined,
      hasApiKey: !!settings.sendgridApiKey || !!process.env.RESEND_API_KEY,
    };

    return NextResponse.json({
      settings: safeSettings,
      hasCustomPassword,
      emailConfigured,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check authentication
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate body
    const body = await request.json();
    const validation = updateSettingsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    // Update settings
    const updated = await updateSettings(validation.data);

    // Don't expose the actual API key in response
    const safeSettings = {
      ...updated,
      sendgridApiKey: updated.sendgridApiKey ? '••••••••' : undefined,
      hasApiKey: !!updated.sendgridApiKey,
    };

    return NextResponse.json({
      settings: safeSettings,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
