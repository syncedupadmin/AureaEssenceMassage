import { kv } from '@vercel/kv';
import { hash, compare } from './password';

// Settings stored in KV
export interface SiteSettings {
  // Email Configuration
  emailProvider: 'resend' | 'none';
  resendApiKey?: string;
  fromEmail: string;
  adminEmail: string;

  // Site Configuration
  siteUrl: string;
  businessName: string;
  businessPhone: string;

  // Booking Settings
  reminderEmailsEnabled: boolean;
  cancellationHours: number;

  // Last updated
  updatedAt: string;
}

export interface AdminCredentials {
  passwordHash: string;
  updatedAt: string;
}

const KEYS = {
  settings: 'site:settings',
  adminCredentials: 'site:admin_credentials',
};

// Default settings (used if nothing in KV)
const DEFAULT_SETTINGS: SiteSettings = {
  emailProvider: 'resend',
  fromEmail: process.env.FROM_EMAIL || 'bookings@notifications.aureaessencemassage.com',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@syncedupsolution.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://aureaessencemassage.com',
  businessName: 'Áurea Essence Massage',
  businessPhone: '(305) 519-4034',
  reminderEmailsEnabled: true,
  cancellationHours: 24,
  updatedAt: new Date().toISOString(),
};

/**
 * Check if KV is configured
 */
function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// ==================== SITE SETTINGS ====================

/**
 * Get site settings from KV or defaults
 */
export async function getSettings(): Promise<SiteSettings> {
  if (!isKVConfigured()) {
    return DEFAULT_SETTINGS;
  }

  try {
    const settings = await kv.get<SiteSettings>(KEYS.settings);
    if (settings) {
      // Merge with defaults to ensure all fields exist
      return { ...DEFAULT_SETTINGS, ...settings };
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Update site settings
 */
export async function updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  if (!isKVConfigured()) {
    throw new Error('Database not configured');
  }

  const current = await getSettings();
  const updated: SiteSettings = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await kv.set(KEYS.settings, updated);
  return updated;
}

/**
 * Get a specific setting value with env var fallback
 */
export async function getSetting<K extends keyof SiteSettings>(key: K): Promise<SiteSettings[K]> {
  const settings = await getSettings();
  return settings[key];
}

// ==================== ADMIN PASSWORD ====================

/**
 * Get admin credentials from KV
 */
async function getAdminCredentials(): Promise<AdminCredentials | null> {
  if (!isKVConfigured()) {
    return null;
  }

  try {
    return await kv.get<AdminCredentials>(KEYS.adminCredentials);
  } catch (error) {
    console.error('Error fetching admin credentials:', error);
    return null;
  }
}

/**
 * Verify admin password
 * Checks KV first, then falls back to environment variable
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  // First try KV stored password
  const credentials = await getAdminCredentials();

  if (credentials?.passwordHash) {
    return await compare(password, credentials.passwordHash);
  }

  // Fall back to environment variable (plain text comparison for backwards compatibility)
  const envPassword = process.env.ADMIN_PASSWORD;
  if (envPassword) {
    return password === envPassword;
  }

  return false;
}

/**
 * Update admin password
 */
export async function updateAdminPassword(newPassword: string): Promise<void> {
  if (!isKVConfigured()) {
    throw new Error('Database not configured');
  }

  if (newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const passwordHash = await hash(newPassword);
  const credentials: AdminCredentials = {
    passwordHash,
    updatedAt: new Date().toISOString(),
  };

  await kv.set(KEYS.adminCredentials, credentials);
}

/**
 * Check if admin password has been set in KV (vs using env var)
 */
export async function hasCustomAdminPassword(): Promise<boolean> {
  const credentials = await getAdminCredentials();
  return !!credentials?.passwordHash;
}

// ==================== EMAIL SETTINGS HELPERS ====================

/**
 * Get Resend API key (from KV settings or env var)
 */
export async function getResendApiKey(): Promise<string | null> {
  const settings = await getSettings();

  // Check KV settings first
  if (settings.resendApiKey) {
    return settings.resendApiKey;
  }

  // Fall back to environment variable
  return process.env.RESEND_API_KEY || null;
}

/**
 * Get from email address
 */
export async function getFromEmail(): Promise<string> {
  const settings = await getSettings();
  return settings.fromEmail || process.env.FROM_EMAIL || 'noreply@aureaessencemassage.com';
}

/**
 * Get admin notification email
 */
export async function getAdminEmail(): Promise<string> {
  const settings = await getSettings();
  return settings.adminEmail || process.env.ADMIN_EMAIL || '';
}

/**
 * Check if email is configured
 */
export async function isEmailConfigured(): Promise<boolean> {
  const apiKey = await getResendApiKey();
  return !!apiKey && apiKey.startsWith('re_');
}
