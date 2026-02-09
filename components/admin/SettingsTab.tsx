'use client';

import { useState, useEffect } from 'react';

interface SiteSettings {
  emailProvider: 'resend' | 'none';
  resendApiKey?: string;
  fromEmail: string;
  adminEmail: string;
  siteUrl: string;
  businessName: string;
  businessPhone: string;
  reminderEmailsEnabled: boolean;
  cancellationHours: number;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  twilioPhoneNumber?: string;
  twilioAdminPhone?: string;
  smsNotificationsEnabled: boolean;
  hasApiKey?: boolean;
  hasTwilioCredentials?: boolean;
}

interface SettingsTabProps {
  onMessage: (message: string, type: 'success' | 'error') => void;
}

export default function SettingsTab({ onMessage }: SettingsTabProps) {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasCustomPassword, setHasCustomPassword] = useState(false);
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [smsConfigured, setSmsConfigured] = useState(false);

  // Form state for settings
  const [formData, setFormData] = useState({
    resendApiKey: '',
    fromEmail: '',
    adminEmail: '',
    siteUrl: '',
    businessName: '',
    businessPhone: '',
    reminderEmailsEnabled: true,
    cancellationHours: 24,
    twilioAccountSid: '',
    twilioAuthToken: '',
    twilioPhoneNumber: '',
    twilioAdminPhone: '',
    smsNotificationsEnabled: false,
  });

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setSettings(data.settings);
      setHasCustomPassword(data.hasCustomPassword);
      setEmailConfigured(data.emailConfigured);
      setSmsConfigured(data.smsConfigured || false);

      // Populate form with current settings
      setFormData({
        resendApiKey: '', // Don't populate API key for security
        fromEmail: data.settings.fromEmail || '',
        adminEmail: data.settings.adminEmail || '',
        siteUrl: data.settings.siteUrl || '',
        businessName: data.settings.businessName || '',
        businessPhone: data.settings.businessPhone || '',
        reminderEmailsEnabled: data.settings.reminderEmailsEnabled ?? true,
        cancellationHours: data.settings.cancellationHours || 24,
        twilioAccountSid: '', // Don't populate credentials for security
        twilioAuthToken: '',
        twilioPhoneNumber: data.settings.twilioPhoneNumber || '',
        twilioAdminPhone: data.settings.twilioAdminPhone || '',
        smsNotificationsEnabled: data.settings.smsNotificationsEnabled ?? false,
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      onMessage('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      // Only include resendApiKey if it was changed (not empty)
      const updates: Record<string, unknown> = {
        fromEmail: formData.fromEmail,
        adminEmail: formData.adminEmail,
        siteUrl: formData.siteUrl,
        businessName: formData.businessName,
        businessPhone: formData.businessPhone,
        reminderEmailsEnabled: formData.reminderEmailsEnabled,
        cancellationHours: formData.cancellationHours,
        twilioPhoneNumber: formData.twilioPhoneNumber,
        twilioAdminPhone: formData.twilioAdminPhone,
        smsNotificationsEnabled: formData.smsNotificationsEnabled,
      };

      if (formData.resendApiKey) {
        updates.resendApiKey = formData.resendApiKey;
      }

      // Only include Twilio credentials if they were changed
      if (formData.twilioAccountSid) {
        updates.twilioAccountSid = formData.twilioAccountSid;
      }
      if (formData.twilioAuthToken) {
        updates.twilioAuthToken = formData.twilioAuthToken;
      }

      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save settings');
      }

      onMessage('Settings saved successfully', 'success');
      // Clear sensitive inputs
      setFormData(prev => ({
        ...prev,
        resendApiKey: '',
        twilioAccountSid: '',
        twilioAuthToken: '',
      }));
      fetchSettings(); // Refresh to get updated state
    } catch (error) {
      console.error('Error saving settings:', error);
      onMessage(error instanceof Error ? error.message : 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      onMessage('New passwords do not match', 'error');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      onMessage('New password must be at least 8 characters', 'error');
      return;
    }

    setChangingPassword(true);

    try {
      const res = await fetch('/api/admin/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordForm),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to change password');
      }

      onMessage('Password changed successfully', 'success');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setHasCustomPassword(true);
    } catch (error) {
      console.error('Error changing password:', error);
      onMessage(error instanceof Error ? error.message : 'Failed to change password', 'error');
    } finally {
      setChangingPassword(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`rounded-sm border p-4 ${emailConfigured ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${emailConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <div>
              <p className="font-medium text-stone-800">Email Configuration</p>
              <p className="text-sm text-stone-600">
                {emailConfigured ? 'Email is configured and ready' : 'Email not configured'}
              </p>
            </div>
          </div>
        </div>
        <div className={`rounded-sm border p-4 ${smsConfigured ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${smsConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <div>
              <p className="font-medium text-stone-800">SMS Configuration</p>
              <p className="text-sm text-stone-600">
                {smsConfigured ? 'SMS is configured and enabled' : 'SMS not configured'}
              </p>
            </div>
          </div>
        </div>
        <div className={`rounded-sm border p-4 ${hasCustomPassword ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${hasCustomPassword ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <div>
              <p className="font-medium text-stone-800">Admin Password</p>
              <p className="text-sm text-stone-600">
                {hasCustomPassword ? 'Custom password set' : 'Using default password'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Settings Section */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-sm border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
          <h3 className="font-semibold text-stone-800">Email & Site Settings</h3>
          <p className="text-sm text-stone-500 mt-1">Configure email notifications and site information</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Resend API Key */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Resend API Key
            </label>
            <input
              type="password"
              value={formData.resendApiKey}
              onChange={(e) => setFormData(prev => ({ ...prev, resendApiKey: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder={settings?.hasApiKey ? '••••••••••••••••' : 'Enter API key (starts with re_)'}
            />
            <p className="text-xs text-stone-500 mt-1">
              {settings?.hasApiKey ? 'API key is set. Enter a new value to update.' : 'Get your free API key from resend.com'}
            </p>
          </div>

          {/* From Email */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              From Email Address
            </label>
            <input
              type="email"
              value={formData.fromEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, fromEmail: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="noreply@yourdomain.com"
            />
            <p className="text-xs text-stone-500 mt-1">Email address that sends notifications</p>
          </div>

          {/* Admin Email */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Admin Email Address
            </label>
            <input
              type="email"
              value={formData.adminEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, adminEmail: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="admin@yourdomain.com"
            />
            <p className="text-xs text-stone-500 mt-1">Receives new booking notifications</p>
          </div>

          {/* Site URL */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Site URL
            </label>
            <input
              type="url"
              value={formData.siteUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, siteUrl: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="https://yourdomain.com"
            />
            <p className="text-xs text-stone-500 mt-1">Used for email links</p>
          </div>

          {/* Business Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Aurea Essence Massage"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Business Phone
              </label>
              <input
                type="tel"
                value={formData.businessPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, businessPhone: e.target.value }))}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Cancellation Hours */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Cancellation Notice (hours)
            </label>
            <input
              type="number"
              min="1"
              max="168"
              value={formData.cancellationHours}
              onChange={(e) => setFormData(prev => ({ ...prev, cancellationHours: parseInt(e.target.value) || 24 }))}
              className="w-32 px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <p className="text-xs text-stone-500 mt-1">Customers cannot self-cancel within this many hours of their appointment</p>
          </div>

          {/* Reminder Emails Toggle */}
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-sm">
            <div>
              <p className="font-medium text-stone-800">Reminder Emails</p>
              <p className="text-sm text-stone-500">Send appointment reminders 24 hours before</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, reminderEmailsEnabled: !prev.reminderEmailsEnabled }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${formData.reminderEmailsEnabled ? 'bg-primary' : 'bg-stone-300'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.reminderEmailsEnabled ? 'translate-x-6' : ''}`}
              />
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* SMS/Twilio Settings Section */}
      <form onSubmit={handleSaveSettings} className="bg-white rounded-sm border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
          <h3 className="font-semibold text-stone-800">SMS Notifications (Twilio)</h3>
          <p className="text-sm text-stone-500 mt-1">Configure SMS alerts for booking notifications and reminders</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Twilio Account SID */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Twilio Account SID
            </label>
            <input
              type="password"
              value={formData.twilioAccountSid}
              onChange={(e) => setFormData(prev => ({ ...prev, twilioAccountSid: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder={settings?.hasTwilioCredentials ? '••••••••••••••••' : 'Enter Account SID (starts with AC)'}
            />
            <p className="text-xs text-stone-500 mt-1">
              {settings?.hasTwilioCredentials ? 'Credentials are set. Enter new values to update.' : 'Get your credentials from twilio.com/console'}
            </p>
          </div>

          {/* Twilio Auth Token */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Twilio Auth Token
            </label>
            <input
              type="password"
              value={formData.twilioAuthToken}
              onChange={(e) => setFormData(prev => ({ ...prev, twilioAuthToken: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder={settings?.hasTwilioCredentials ? '••••••••••••••••' : 'Enter Auth Token'}
            />
            <p className="text-xs text-stone-500 mt-1">Twilio authentication token from your account</p>
          </div>

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Twilio Phone Number (From)
              </label>
              <input
                type="tel"
                value={formData.twilioPhoneNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, twilioPhoneNumber: e.target.value }))}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="+1 (555) 123-4567"
              />
              <p className="text-xs text-stone-500 mt-1">Your Twilio number that sends SMS</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Admin Phone Number (Alerts)
              </label>
              <input
                type="tel"
                value={formData.twilioAdminPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, twilioAdminPhone: e.target.value }))}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="+1 (555) 987-6543"
              />
              <p className="text-xs text-stone-500 mt-1">Receives new booking SMS alerts</p>
            </div>
          </div>

          {/* SMS Notifications Toggle */}
          <div className="flex items-center justify-between p-4 bg-stone-50 rounded-sm">
            <div>
              <p className="font-medium text-stone-800">Enable SMS Notifications</p>
              <p className="text-sm text-stone-500">Send SMS for bookings and reminders (Twilio must be configured)</p>
            </div>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, smsNotificationsEnabled: !prev.smsNotificationsEnabled }))}
              className={`relative w-12 h-6 rounded-full transition-colors ${formData.smsNotificationsEnabled ? 'bg-primary' : 'bg-stone-300'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${formData.smsNotificationsEnabled ? 'translate-x-6' : ''}`}
              />
            </button>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Saving...' : 'Save SMS Settings'}
          </button>
        </div>
      </form>

      {/* Password Change Section */}
      <form onSubmit={handleChangePassword} className="bg-white rounded-sm border border-stone-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50">
          <h3 className="font-semibold text-stone-800">Change Admin Password</h3>
          <p className="text-sm text-stone-500 mt-1">Update your admin login password</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              minLength={8}
              required
            />
            <p className="text-xs text-stone-500 mt-1">Minimum 8 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-4 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              minLength={8}
              required
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50">
          <button
            type="submit"
            disabled={changingPassword}
            className="px-6 py-2.5 bg-stone-800 text-white rounded-sm hover:bg-stone-700 disabled:opacity-50 transition-colors"
          >
            {changingPassword ? 'Changing...' : 'Change Password'}
          </button>
        </div>
      </form>
    </div>
  );
}
