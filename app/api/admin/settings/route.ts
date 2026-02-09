import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import {
  getSettings,
  updateSettings,
  hasCustomAdminPassword,
  isEmailConfigured,
  isSMSConfigured,
  type SiteSettings,
} from '@/lib/settings';
import { z } from 'zod';

// Schema for updating settings
const updateSettingsSchema = z.object({
  emailProvider: z.enum(['resend', 'none']).optional(),
  resendApiKey: z.string().optional(),
  fromEmail: z.string().email().optional(),
  adminEmail: z.string().email().optional(),
  siteUrl: z.string().url().optional(),
  businessName: z.string().min(1).max(100).optional(),
  businessPhone: z.string().max(20).optional(),
  reminderEmailsEnabled: z.boolean().optional(),
  cancellationHours: z.number().int().min(1).max(168).optional(),
  twilioAccountSid: z.string().optional(),
  twilioAuthToken: z.string().optional(),
  twilioPhoneNumber: z.string().optional(),
  twilioAdminPhone: z.string().optional(),
  smsNotificationsEnabled: z.boolean().optional(),
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
    const smsConfigured = await isSMSConfigured();

    // Don't expose the actual API keys/credentials, just indicate if they're set
    const safeSettings = {
      ...settings,
      resendApiKey: settings.resendApiKey ? '••••••••' : undefined,
      hasApiKey: !!settings.resendApiKey || !!process.env.RESEND_API_KEY,
      twilioAccountSid: settings.twilioAccountSid ? '••••••••' : undefined,
      twilioAuthToken: settings.twilioAuthToken ? '••••••••' : undefined,
      hasTwilioCredentials: !!(settings.twilioAccountSid || process.env.TWILIO_ACCOUNT_SID),
    };

    return NextResponse.json({
      settings: safeSettings,
      hasCustomPassword,
      emailConfigured,
      smsConfigured,
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

    // Don't expose the actual API keys/credentials in response
    const safeSettings = {
      ...updated,
      resendApiKey: updated.resendApiKey ? '••••••••' : undefined,
      hasApiKey: !!updated.resendApiKey,
      twilioAccountSid: updated.twilioAccountSid ? '••••••••' : undefined,
      twilioAuthToken: updated.twilioAuthToken ? '••••••••' : undefined,
      hasTwilioCredentials: !!updated.twilioAccountSid,
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
