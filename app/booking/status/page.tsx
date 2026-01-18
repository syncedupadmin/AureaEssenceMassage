'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { businessConfig } from '@/config/business';

interface BookingStatus {
  lookupToken: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  service: string;
  locationType: string;
  locationTypeLabel: string;
  preferredDate?: string;
  preferredDateFormatted?: string;
  preferredTime?: string;
  preferredTimeLabel?: string;
  confirmedDate?: string;
  confirmedDateFormatted?: string;
  confirmedTime?: string;
  confirmedTimeLabel?: string;
  createdAt: string;
  createdAtFormatted: string;
  cancellationReason?: string;
  cancelledAt?: string;
  canCancel: boolean;
}

const STATUS_CONFIG = {
  pending: {
    label: 'Pending Review',
    color: 'bg-amber-100 text-amber-800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Your booking request is being reviewed. We\'ll confirm your appointment soon.',
  },
  confirmed: {
    label: 'Confirmed',
    color: 'bg-emerald-100 text-emerald-800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: 'Your appointment is confirmed! We look forward to seeing you.',
  },
  completed: {
    label: 'Completed',
    color: 'bg-blue-100 text-blue-800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    description: 'This appointment has been completed. Thank you for choosing us!',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    description: 'This booking has been cancelled.',
  },
};

function BookingStatusContent() {
  const searchParams = useSearchParams();
  const refFromUrl = searchParams.get('ref') || '';

  const [referenceNumber, setReferenceNumber] = useState(refFromUrl);
  const [booking, setBooking] = useState<BookingStatus | null>(null);
  const [loading, setLoading] = useState(!!refFromUrl);
  const [error, setError] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (refFromUrl) {
      lookupBooking(refFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refFromUrl]);

  const lookupBooking = async (ref: string) => {
    if (!ref.trim()) {
      setError('Please enter a reference number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/bookings/status/${encodeURIComponent(ref.trim())}`);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        throw new Error(data.error || 'Booking not found');
      }

      setBooking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to lookup booking');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    lookupBooking(referenceNumber);
  };

  const handleCancel = async () => {
    if (!booking) return;

    setCancelling(true);

    try {
      const response = await fetch(`/api/bookings/cancel/${booking.lookupToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: cancelReason || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel booking');
      }

      // Refresh booking status
      setShowCancelModal(false);
      setCancelReason('');
      await lookupBooking(booking.lookupToken);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking');
    } finally {
      setCancelling(false);
    }
  };

  const statusConfig = booking ? STATUS_CONFIG[booking.status] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-champagne-50 to-white py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-2xl font-serif text-rose-500 tracking-wide">
              {businessConfig.name}
            </h1>
          </Link>
          <h2 className="text-3xl font-serif font-medium text-charcoal mb-2">
            Booking Status
          </h2>
          <p className="text-charcoal/60">
            Enter your reference number to view your booking
          </p>
        </div>

        {/* Lookup Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
              placeholder="e.g., AUR-ABC123"
              className="flex-1 px-4 py-3 bg-white border border-champagne-200 text-charcoal rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 text-center font-mono tracking-wider"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-rose-500 text-white rounded-sm font-medium hover:bg-rose-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Looking up...' : 'Look Up'}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Booking Details */}
        {booking && statusConfig && (
          <div className="bg-white rounded-sm shadow-elegant border border-champagne-200 overflow-hidden">
            {/* Status Header */}
            <div className="p-6 border-b border-champagne-100">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-charcoal/50 uppercase tracking-wider">Reference</span>
                <span className="font-mono text-lg tracking-wider text-charcoal">{booking.lookupToken}</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm ${statusConfig.color}`}>
                {statusConfig.icon}
                <span className="font-medium">{statusConfig.label}</span>
              </div>
              <p className="mt-3 text-sm text-charcoal/60">{statusConfig.description}</p>
            </div>

            {/* Booking Info */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider block mb-1">Service</span>
                <span className="text-charcoal">{booking.service}</span>
              </div>

              <div>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider block mb-1">Location Type</span>
                <span className="text-charcoal">{booking.locationTypeLabel}</span>
              </div>

              {/* Show confirmed date/time for confirmed bookings */}
              {booking.status === 'confirmed' && booking.confirmedDateFormatted && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm">
                  <span className="text-xs text-emerald-700 uppercase tracking-wider block mb-2">Confirmed Appointment</span>
                  <div className="text-lg font-medium text-emerald-800">{booking.confirmedDateFormatted}</div>
                  {booking.confirmedTimeLabel && (
                    <div className="text-emerald-700">{booking.confirmedTimeLabel}</div>
                  )}
                </div>
              )}

              {/* Show preferred date/time for pending bookings */}
              {booking.status === 'pending' && booking.preferredDateFormatted && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-sm">
                  <span className="text-xs text-amber-700 uppercase tracking-wider block mb-2">Requested Appointment</span>
                  <div className="text-amber-800">{booking.preferredDateFormatted}</div>
                  {booking.preferredTimeLabel && (
                    <div className="text-amber-700 text-sm">{booking.preferredTimeLabel}</div>
                  )}
                </div>
              )}

              {/* Cancellation reason */}
              {booking.status === 'cancelled' && booking.cancellationReason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-sm">
                  <span className="text-xs text-red-700 uppercase tracking-wider block mb-1">Cancellation Reason</span>
                  <span className="text-red-800 text-sm">{booking.cancellationReason}</span>
                </div>
              )}

              <div>
                <span className="text-xs text-charcoal/50 uppercase tracking-wider block mb-1">Request Submitted</span>
                <span className="text-charcoal/70 text-sm">{booking.createdAtFormatted}</span>
              </div>
            </div>

            {/* Actions */}
            {booking.canCancel && (
              <div className="p-6 border-t border-champagne-100 bg-stone-50">
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="w-full py-3 border border-red-300 text-red-600 rounded-sm font-medium text-sm hover:bg-red-50 transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            )}

            {/* 24-hour policy message for confirmed bookings that can't be cancelled */}
            {booking.status === 'confirmed' && !booking.canCancel && (
              <div className="p-6 border-t border-champagne-100 bg-stone-50">
                <p className="text-sm text-charcoal/60 text-center">
                  Need to make changes? Contact us at{' '}
                  <a href={`tel:${businessConfig.contact.phoneRaw}`} className="text-rose-500 font-medium">
                    {businessConfig.contact.phone}
                  </a>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Back to Home Link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-rose-500 hover:text-rose-600 text-sm font-medium">
            Back to Home
          </Link>
        </div>

        {/* Cancel Modal */}
        {showCancelModal && booking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-sm shadow-xl w-full max-w-md p-6">
              <h3 className="text-xl font-serif font-medium text-charcoal mb-2">
                Cancel Booking?
              </h3>
              <p className="text-charcoal/60 text-sm mb-6">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal/80 mb-2">
                  Reason (optional)
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Let us know why you're cancelling..."
                  rows={3}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 text-charcoal rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelReason('');
                  }}
                  className="flex-1 py-3 border border-stone-300 text-charcoal rounded-sm font-medium text-sm hover:bg-stone-50 transition-colors"
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="flex-1 py-3 bg-red-500 text-white rounded-sm font-medium text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading...</p>
        </div>
      </div>
    }>
      <BookingStatusContent />
    </Suspense>
  );
}
