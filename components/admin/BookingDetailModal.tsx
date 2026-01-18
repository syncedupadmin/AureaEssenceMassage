'use client';

import { useState } from 'react';
import type { BookingStatus } from '@/lib/schemas/booking';

interface Booking {
  id: string;
  lookupToken: string;
  status: BookingStatus;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  service: string;
  locationType: string;
  address?: string;
  preferredDate?: string;
  preferredTime?: string;
  preferredPressure?: string;
  confirmedDate?: string;
  confirmedTime?: string;
  message?: string;
  adminNotes?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

interface BookingDetailModalProps {
  booking: Booking;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Booking>) => Promise<void>;
  saving: boolean;
}

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-800' },
  confirmed: { label: 'Confirmed', color: 'bg-emerald-100 text-emerald-800' },
  completed: { label: 'Completed', color: 'bg-blue-100 text-blue-800' },
  cancelled: { label: 'Cancelled', color: 'bg-stone-100 text-stone-600' },
};

const TIME_OPTIONS = [
  { value: 'morning', label: 'Morning (8am - 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm - 5pm)' },
  { value: 'evening', label: 'Evening (5pm - 9pm)' },
];

const LOCATION_LABELS: Record<string, string> = {
  home: 'Home',
  hotel: 'Hotel / Resort',
  office: 'Office',
  event: 'Event Venue',
};

const PRESSURE_LABELS: Record<string, string> = {
  light: 'Light - Gentle, relaxing',
  medium: 'Medium - Moderate pressure',
  firm: 'Firm - Deep work',
  varies: 'Varies - Different areas',
};

function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export default function BookingDetailModal({
  booking,
  onClose,
  onUpdate,
  saving,
}: BookingDetailModalProps) {
  const [mode, setMode] = useState<'view' | 'confirm' | 'cancel'>('view');
  const [confirmedDate, setConfirmedDate] = useState(booking.confirmedDate || booking.preferredDate || '');
  const [confirmedTime, setConfirmedTime] = useState(booking.confirmedTime || booking.preferredTime || 'morning');
  const [adminNotes, setAdminNotes] = useState(booking.adminNotes || '');
  const [cancellationReason, setCancellationReason] = useState('');

  const statusConfig = STATUS_CONFIG[booking.status];

  const handleConfirm = async () => {
    if (!confirmedDate || !confirmedTime) return;

    await onUpdate(booking.id, {
      status: 'confirmed',
      confirmedDate,
      confirmedTime: confirmedTime as 'morning' | 'afternoon' | 'evening',
      adminNotes: adminNotes || undefined,
    });
  };

  const handleCancel = async () => {
    await onUpdate(booking.id, {
      status: 'cancelled',
      cancellationReason: cancellationReason || 'Cancelled by admin',
    });
  };

  const handleComplete = async () => {
    await onUpdate(booking.id, {
      status: 'completed',
      adminNotes: adminNotes || undefined,
    });
  };

  const handleSaveNotes = async () => {
    await onUpdate(booking.id, {
      adminNotes: adminNotes || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/30 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center p-4 sm:p-8">
        <div className="bg-white rounded-sm shadow-xl w-full max-w-2xl my-8">
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-medium text-stone-800">Booking Details</h2>
                <span className={`px-2 py-0.5 rounded-sm text-xs font-medium ${statusConfig.color}`}>
                  {statusConfig.label}
                </span>
              </div>
              <p className="text-sm text-stone-500 font-mono mt-1">{booking.lookupToken}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">Customer</h3>
              <div className="bg-stone-50 rounded-sm p-4 space-y-2">
                <p className="font-medium text-stone-800 text-lg">{booking.customerName}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a href={`mailto:${booking.customerEmail}`} className="text-rose-500 hover:text-rose-600">
                    {booking.customerEmail}
                  </a>
                  <a href={`tel:${booking.customerPhone}`} className="text-rose-500 hover:text-rose-600">
                    {booking.customerPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div>
              <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">Service Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-stone-400 block">Service</span>
                  <span className="text-stone-800">{booking.service}</span>
                </div>
                <div>
                  <span className="text-xs text-stone-400 block">Location</span>
                  <span className="text-stone-800">
                    {LOCATION_LABELS[booking.locationType] || booking.locationType}
                    {booking.address && ` - ${booking.address}`}
                  </span>
                </div>
                {booking.preferredPressure && (
                  <div>
                    <span className="text-xs text-stone-400 block">Pressure Preference</span>
                    <span className="text-stone-800">
                      {PRESSURE_LABELS[booking.preferredPressure] || booking.preferredPressure}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Scheduling Info */}
            <div>
              <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">Scheduling</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {booking.preferredDate && (
                  <div>
                    <span className="text-xs text-stone-400 block">Requested Date</span>
                    <span className="text-stone-800">{booking.preferredDate}</span>
                  </div>
                )}
                {booking.preferredTime && (
                  <div>
                    <span className="text-xs text-stone-400 block">Requested Time</span>
                    <span className="text-stone-800">
                      {TIME_OPTIONS.find((t) => t.value === booking.preferredTime)?.label || booking.preferredTime}
                    </span>
                  </div>
                )}
                {booking.confirmedDate && (
                  <div className="sm:col-span-2 p-3 bg-emerald-50 border border-emerald-200 rounded-sm">
                    <span className="text-xs text-emerald-600 block">Confirmed Appointment</span>
                    <span className="text-emerald-800 font-medium">
                      {booking.confirmedDate} - {TIME_OPTIONS.find((t) => t.value === booking.confirmedTime)?.label || booking.confirmedTime}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Message */}
            {booking.message && (
              <div>
                <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">Customer Notes</h3>
                <div className="bg-stone-50 rounded-sm p-4">
                  <p className="text-stone-700 text-sm whitespace-pre-wrap">{booking.message}</p>
                </div>
              </div>
            )}

            {/* Cancellation Reason */}
            {booking.status === 'cancelled' && booking.cancellationReason && (
              <div>
                <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">Cancellation Reason</h3>
                <div className="bg-red-50 border border-red-200 rounded-sm p-4">
                  <p className="text-red-700 text-sm">{booking.cancellationReason}</p>
                </div>
              </div>
            )}

            {/* Admin Notes */}
            <div>
              <h3 className="text-sm font-medium text-stone-500 uppercase tracking-wider mb-3">Admin Notes</h3>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add internal notes..."
                rows={3}
                className="w-full px-4 py-3 border border-stone-200 rounded-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200"
              />
              {adminNotes !== (booking.adminNotes || '') && (
                <button
                  onClick={handleSaveNotes}
                  disabled={saving}
                  className="mt-2 px-4 py-2 text-sm text-rose-500 hover:text-rose-600 font-medium"
                >
                  {saving ? 'Saving...' : 'Save Notes'}
                </button>
              )}
            </div>

            {/* Timestamps */}
            <div className="text-xs text-stone-400 space-y-1 pt-4 border-t border-stone-100">
              <p>Created: {formatDateTime(booking.createdAt)}</p>
              {booking.confirmedAt && <p>Confirmed: {formatDateTime(booking.confirmedAt)}</p>}
              {booking.completedAt && <p>Completed: {formatDateTime(booking.completedAt)}</p>}
              {booking.cancelledAt && <p>Cancelled: {formatDateTime(booking.cancelledAt)}</p>}
            </div>

            {/* Confirm Mode */}
            {mode === 'confirm' && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm space-y-4">
                <h3 className="font-medium text-emerald-800">Confirm Booking</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-emerald-700 block mb-1">Date</label>
                    <input
                      type="date"
                      value={confirmedDate}
                      onChange={(e) => setConfirmedDate(e.target.value)}
                      min={getTodayDate()}
                      className="w-full px-4 py-2 border border-emerald-200 rounded-sm focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-emerald-700 block mb-1">Time Slot</label>
                    <select
                      value={confirmedTime}
                      onChange={(e) => setConfirmedTime(e.target.value)}
                      className="w-full px-4 py-2 border border-emerald-200 rounded-sm focus:outline-none focus:border-emerald-400"
                    >
                      {TIME_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMode('view')}
                    className="px-4 py-2 text-sm border border-stone-200 text-stone-600 rounded-sm hover:bg-stone-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={saving || !confirmedDate}
                    className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-sm hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {saving ? 'Confirming...' : 'Confirm & Send Email'}
                  </button>
                </div>
              </div>
            )}

            {/* Cancel Mode */}
            {mode === 'cancel' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-sm space-y-4">
                <h3 className="font-medium text-red-800">Cancel Booking</h3>
                <div>
                  <label className="text-xs text-red-700 block mb-1">Reason</label>
                  <textarea
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    placeholder="Enter cancellation reason..."
                    rows={2}
                    className="w-full px-4 py-2 border border-red-200 rounded-sm focus:outline-none focus:border-red-400"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMode('view')}
                    className="px-4 py-2 text-sm border border-stone-200 text-stone-600 rounded-sm hover:bg-stone-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="px-4 py-2 text-sm bg-red-600 text-white rounded-sm hover:bg-red-700 disabled:opacity-50"
                  >
                    {saving ? 'Cancelling...' : 'Cancel Booking'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions Footer */}
          {mode === 'view' && (
            <div className="px-6 py-4 border-t border-stone-100 flex flex-wrap gap-3 justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-stone-200 text-stone-600 rounded-sm hover:bg-stone-50"
              >
                Close
              </button>

              <div className="flex flex-wrap gap-3">
                {booking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => setMode('cancel')}
                      className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded-sm hover:bg-red-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setMode('confirm')}
                      className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-sm hover:bg-emerald-700"
                    >
                      Confirm Booking
                    </button>
                  </>
                )}

                {booking.status === 'confirmed' && (
                  <>
                    <button
                      onClick={() => setMode('cancel')}
                      className="px-4 py-2 text-sm border border-red-200 text-red-600 rounded-sm hover:bg-red-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleComplete}
                      disabled={saving}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                      {saving ? 'Completing...' : 'Mark Complete'}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
