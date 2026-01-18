'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Service, AddOn, Pricing } from '@/lib/data';
import type { BookingStatus } from '@/lib/schemas/booking';
import BookingsTab from '@/components/admin/BookingsTab';
import AvailabilityTab from '@/components/admin/AvailabilityTab';
import BookingDetailModal from '@/components/admin/BookingDetailModal';

interface BusinessData {
  services: Service[];
  addOns: AddOn[];
  pricing: Pricing;
}

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

interface BookingStats {
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

interface BlockedDate {
  date: string;
  reason?: string;
}

// Available stock images
const STOCK_IMAGES = [
  { src: '/images/generated/service-swedish.png', label: 'Swedish' },
  { src: '/images/generated/service-deep-tissue.png', label: 'Deep Tissue' },
  { src: '/images/generated/service-reflexology.png', label: 'Reflexology' },
  { src: '/images/generated/service-lymphatic-drainage.png', label: 'Lymphatic' },
  { src: '/images/generated/service-post-surgical.png', label: 'Post-Surgery' },
  { src: '/images/generated/service-couples.png', label: 'Couples' },
  { src: '/images/generated/service-prenatal.png', label: 'Prenatal' },
  { src: '/images/generated/addon-hot-stones.png', label: 'Hot Stones' },
  { src: '/images/generated/addon-aromatherapy.png', label: 'Aromatherapy' },
  { src: '/images/generated/addon-cbd-oil.png', label: 'CBD Oil' },
  { src: '/images/generated/hero-about.png', label: 'Spa Scene' },
  { src: '/images/generated/hero-main.png', label: 'Hero' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'pricing' | 'addons' | 'bookings' | 'availability'>('bookings');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; title: string; message: string } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);
  const [hasUnsavedPricing, setHasUnsavedPricing] = useState(false);

  // Booking state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingStats, setBookingStats] = useState<BookingStats>({ pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingStatusFilter, setBookingStatusFilter] = useState<BookingStatus | 'all'>('all');

  // Availability state
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    setBookingsLoading(true);
    try {
      const statusParam = bookingStatusFilter !== 'all' ? `?status=${bookingStatusFilter}` : '';
      const response = await fetch(`/api/admin/bookings${statusParam}`);

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      setBookings(data.bookings);
      setBookingStats(data.stats);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      showNotification('error', 'Connection Error', 'Could not load bookings.');
    } finally {
      setBookingsLoading(false);
    }
  }, [bookingStatusFilter]);

  // Fetch availability
  const fetchAvailability = useCallback(async () => {
    setAvailabilityLoading(true);
    try {
      const response = await fetch('/api/admin/availability');

      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }

      const data = await response.json();
      setBlockedDates(data.blockedDates);
    } catch (error) {
      console.error('Error fetching availability:', error);
      showNotification('error', 'Connection Error', 'Could not load availability.');
    } finally {
      setAvailabilityLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch bookings when tab changes or filter changes
  useEffect(() => {
    if (activeTab === 'bookings') {
      fetchBookings();
    } else if (activeTab === 'availability') {
      fetchAvailability();
    }
  }, [activeTab, bookingStatusFilter, fetchBookings, fetchAvailability]);

  const fetchData = async () => {
    try {
      const [servicesRes, pricingRes] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/admin/pricing'),
      ]);

      if (!servicesRes.ok || !pricingRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const servicesData = await servicesRes.json();
      const pricingData = await pricingRes.json();

      setData({
        services: servicesData.services,
        addOns: servicesData.addOns,
        pricing: pricingData.pricing,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      showNotification('error', 'Connection Error', 'Could not load data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    setNotification({ type, title, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSaveService = async (service: Service) => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });

      if (!response.ok) throw new Error('Failed to save');

      showNotification('success', 'Saved Successfully', `"${service.title}" has been updated.`);
      setEditingService(null);
      setIsAddingService(false);
      await fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      showNotification('error', 'Save Failed', 'Could not save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (service: Service) => {
    setConfirmDialog({
      title: `Delete "${service.title}"?`,
      message: 'This action cannot be undone. The service will be permanently removed from your website.',
      onConfirm: async () => {
        setConfirmDialog(null);
        setSaving(true);
        try {
          const response = await fetch(`/api/admin/services?id=${service.id}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to delete');

          showNotification('success', 'Service Removed', `"${service.title}" has been deleted.`);
          await fetchData();
        } catch (error) {
          console.error('Error deleting service:', error);
          showNotification('error', 'Delete Failed', 'Could not delete service. Please try again.');
        } finally {
          setSaving(false);
        }
      },
    });
  };

  const handleSavePricing = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const response = await fetch('/api/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pricing: data.pricing }),
      });

      if (!response.ok) throw new Error('Failed to save');

      showNotification('success', 'Pricing Updated', 'All price changes have been saved.');
      setHasUnsavedPricing(false);
    } catch (error) {
      console.error('Error saving pricing:', error);
      showNotification('error', 'Save Failed', 'Could not save pricing changes.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAddOn = async (addOn: AddOn) => {
    if (!data) return;

    const newEnabled = !addOn.enabled;
    const updatedAddOns = data.addOns.map(a =>
      a.id === addOn.id ? { ...a, enabled: newEnabled } : a
    );

    setData({ ...data, addOns: updatedAddOns });

    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addOn: { ...addOn, enabled: newEnabled } }),
      });

      if (!response.ok) throw new Error('Failed to update');

      showNotification(
        'success',
        newEnabled ? 'Add-on Enabled' : 'Add-on Disabled',
        `"${addOn.title}" is now ${newEnabled ? 'visible on' : 'hidden from'} your website.`
      );
    } catch (error) {
      console.error('Error updating add-on:', error);
      showNotification('error', 'Update Failed', 'Could not update add-on status.');
      await fetchData();
    }
  };

  const updatePricing = (
    type: 'service' | 'addon',
    id: string,
    duration: string | null,
    value: string
  ) => {
    if (!data) return;

    const price = value === '' ? null : parseInt(value, 10);
    if (value !== '' && isNaN(price as number)) return;

    const newPricing = { ...data.pricing };

    if (type === 'service' && duration) {
      if (!newPricing.services[id]) {
        newPricing.services[id] = {};
      }
      newPricing.services[id] = { ...newPricing.services[id], [duration]: price };
    } else if (type === 'addon') {
      newPricing.addOns = { ...newPricing.addOns, [id]: price };
    }

    setData({ ...data, pricing: newPricing });
    setHasUnsavedPricing(true);
  };

  // Booking handlers
  const handleUpdateBooking = async (id: string, updates: Partial<Booking>) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update booking');
      }

      const data = await response.json();

      // Update local state
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? data.booking : b))
      );

      // Update selected booking if it's the one being edited
      if (selectedBooking?.id === id) {
        setSelectedBooking(data.booking);
      }

      // Refresh stats
      await fetchBookings();

      showNotification('success', 'Booking Updated', 'The booking has been updated successfully.');
    } catch (error) {
      console.error('Error updating booking:', error);
      showNotification('error', 'Update Failed', error instanceof Error ? error.message : 'Could not update booking.');
    } finally {
      setSaving(false);
    }
  };

  // Availability handlers
  const handleAddBlockedDate = async (date: string, reason?: string) => {
    try {
      const response = await fetch('/api/admin/availability/blocked', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to block date');
      }

      await fetchAvailability();
      showNotification('success', 'Date Blocked', `${date} has been blocked.`);
    } catch (error) {
      console.error('Error blocking date:', error);
      showNotification('error', 'Error', 'Could not block date.');
    }
  };

  const handleRemoveBlockedDate = async (date: string) => {
    try {
      const response = await fetch('/api/admin/availability/blocked', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date }),
      });

      if (!response.ok) {
        throw new Error('Failed to unblock date');
      }

      await fetchAvailability();
      showNotification('success', 'Date Unblocked', `${date} is now available.`);
    } catch (error) {
      console.error('Error unblocking date:', error);
      showNotification('error', 'Error', 'Could not unblock date.');
    }
  };

  // Get list of images already in use
  const usedImages = data?.services.map(s => s.imageSrc) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8">
          <div className="w-12 h-12 border-2 border-stone-200 border-t-rose-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-500 font-light tracking-wide">Loading</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
        <div className="text-center bg-white p-8 rounded-sm shadow-sm border border-stone-200 max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-6 text-rose-400 bg-rose-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-light text-stone-800 mb-2">Unable to Connect</h2>
          <p className="text-stone-500 mb-6 font-light">There was a problem loading your data.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-stone-800 text-white rounded-sm font-light tracking-wide hover:bg-stone-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-300 to-rose-400 flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
              <div>
                <h1 className="text-lg font-medium text-stone-800 tracking-tight">Aurea Admin</h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-stone-600 hover:text-stone-800 font-light tracking-wide transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 left-4 sm:left-auto sm:w-96 z-50">
          <div className={`rounded-sm shadow-lg border p-4 ${
            notification.type === 'success'
              ? 'bg-white border-emerald-200'
              : notification.type === 'error'
              ? 'bg-white border-rose-200'
              : 'bg-white border-stone-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                notification.type === 'success' ? 'text-emerald-500' :
                notification.type === 'error' ? 'text-rose-500' : 'text-stone-500'
              }`}>
                {notification.type === 'success' && (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {notification.type === 'error' && (
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-stone-800">{notification.title}</p>
                <p className="text-sm text-stone-500 font-light">{notification.message}</p>
              </div>
              <button onClick={() => setNotification(null)} className="text-stone-400 hover:text-stone-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-sm">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-md p-6 sm:p-8">
            <div className="w-14 h-14 mx-auto mb-6 text-rose-400 bg-rose-50 rounded-full flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-stone-800 text-center mb-2">{confirmDialog.title}</h3>
            <p className="text-stone-500 text-center mb-8 font-light">{confirmDialog.message}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDialog(null)}
                className="flex-1 py-3 border border-stone-200 text-stone-700 rounded-sm font-light tracking-wide hover:bg-stone-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="flex-1 py-3 bg-rose-500 text-white rounded-sm font-light tracking-wide hover:bg-rose-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white border-b border-stone-200 sticky top-[65px] z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'bookings', label: 'Bookings', badge: bookingStats.pending > 0 ? bookingStats.pending : undefined },
              { id: 'availability', label: 'Availability' },
              { id: 'services', label: 'Services' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'addons', label: 'Add-ons' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`relative py-4 text-sm tracking-wide transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-rose-500 font-medium'
                    : 'text-stone-500 hover:text-stone-700 font-light'
                }`}
              >
                {tab.label}
                {'badge' in tab && tab.badge && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-rose-500 text-white rounded-full">
                    {tab.badge}
                  </span>
                )}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-400"></div>
                )}
                {tab.id === 'pricing' && hasUnsavedPricing && (
                  <span className="absolute -top-1 -right-3 w-2 h-2 bg-amber-400 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <BookingsTab
            bookings={bookings}
            stats={bookingStats}
            loading={bookingsLoading}
            onRefresh={fetchBookings}
            onSelectBooking={setSelectedBooking}
            selectedStatus={bookingStatusFilter}
            onStatusFilterChange={setBookingStatusFilter}
          />
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <AvailabilityTab
            blockedDates={blockedDates}
            loading={availabilityLoading}
            onRefresh={fetchAvailability}
            onAddBlockedDate={handleAddBlockedDate}
            onRemoveBlockedDate={handleRemoveBlockedDate}
          />
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Add Service Button */}
            <button
              onClick={() => {
                setIsAddingService(true);
                setEditingService({
                  id: '',
                  title: '',
                  shortDescription: '',
                  description: '',
                  durations: ['60 min'],
                  idealFor: '',
                  benefits: [''],
                  imageSrc: '/images/generated/service-swedish.png',
                  imageAlt: '',
                });
              }}
              className="w-full sm:w-auto px-6 py-3 bg-stone-800 text-white rounded-sm font-light tracking-wide flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              Add New Service
            </button>

            {/* Service Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden group hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-medium text-white text-lg">{service.title}</h3>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <p className="text-sm text-stone-500 font-light line-clamp-2 mb-3">{service.shortDescription}</p>
                    <div className="flex gap-2 flex-wrap">
                      {service.durations.map((d) => (
                        <span key={d} className="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-sm font-light">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex border-t border-stone-100">
                    <button
                      onClick={() => setEditingService(service)}
                      className="flex-1 py-3 text-sm font-light text-stone-600 hover:text-rose-500 hover:bg-stone-50 flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <div className="w-px bg-stone-100"></div>
                    <button
                      onClick={() => handleDeleteService(service)}
                      className="flex-1 py-3 text-sm font-light text-stone-600 hover:text-rose-500 hover:bg-stone-50 flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            {/* Save Button */}
            {hasUnsavedPricing && (
              <div className="bg-amber-50 border border-amber-200 rounded-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-amber-800 font-medium">Unsaved Changes</p>
                  <p className="text-sm text-amber-600 font-light">You have pricing updates that haven&apos;t been saved yet.</p>
                </div>
                <button
                  onClick={handleSavePricing}
                  disabled={saving}
                  className="px-6 py-2.5 bg-stone-800 text-white rounded-sm font-light tracking-wide hover:bg-stone-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save All Prices'}
                </button>
              </div>
            )}

            {/* Service Pricing Table */}
            <div className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-100">
                <h2 className="text-lg font-medium text-stone-800">Service Pricing</h2>
                <p className="text-sm text-stone-500 font-light mt-1">Set prices for each service duration. Leave empty to hide the option.</p>
              </div>
              <div className="divide-y divide-stone-100">
                {data.services.map((service) => (
                  <div key={service.id} className="p-6">
                    <h3 className="font-medium text-stone-800 mb-4">{service.title}</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {service.durations.map((duration) => (
                        <div key={duration} className="flex items-center gap-3">
                          <span className="text-sm text-stone-500 font-light w-20 flex-shrink-0">{duration}</span>
                          <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-light">$</span>
                            <input
                              type="number"
                              inputMode="numeric"
                              value={data.pricing.services[service.id]?.[duration] ?? ''}
                              onChange={(e) => updatePricing('service', service.id, duration, e.target.value)}
                              placeholder="—"
                              className="w-full pl-8 pr-4 py-2.5 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add-on Pricing Table */}
            <div className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-100">
                <h2 className="text-lg font-medium text-stone-800">Add-on Pricing</h2>
                <p className="text-sm text-stone-500 font-light mt-1">Set prices for enhancement add-ons.</p>
              </div>
              <div className="p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.addOns.map((addOn) => (
                    <div key={addOn.id} className="flex items-center gap-3">
                      <span className="text-sm text-stone-600 font-light flex-1">{addOn.title}</span>
                      <div className="relative w-28">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-light">+$</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          value={data.pricing.addOns[addOn.id] ?? ''}
                          onChange={(e) => updatePricing('addon', addOn.id, null, e.target.value)}
                          placeholder="—"
                          className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-sm text-stone-800 focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {!hasUnsavedPricing && (
              <p className="text-center text-sm text-stone-400 font-light py-4">All prices are up to date</p>
            )}
          </div>
        )}

        {/* Add-ons Tab */}
        {activeTab === 'addons' && (
          <div className="space-y-6">
            <div className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-stone-100">
                <h2 className="text-lg font-medium text-stone-800">Manage Add-ons</h2>
                <p className="text-sm text-stone-500 font-light mt-1">Toggle add-ons to show or hide them on your website.</p>
              </div>
              <div className="divide-y divide-stone-100">
                {data.addOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className={`p-6 flex items-center justify-between transition-colors ${
                      addOn.enabled ? 'bg-white' : 'bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        addOn.enabled ? 'bg-rose-50 text-rose-400' : 'bg-stone-100 text-stone-400'
                      }`}>
                        {addOn.icon === 'fire' && (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                          </svg>
                        )}
                        {addOn.icon === 'leaf' && (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                        {addOn.icon === 'sparkles' && (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium transition-colors ${addOn.enabled ? 'text-stone-800' : 'text-stone-500'}`}>
                          {addOn.title}
                        </h3>
                        <p className="text-sm text-stone-400 font-light">{addOn.description}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleAddOn(addOn)}
                      className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ${
                        addOn.enabled ? 'bg-rose-400' : 'bg-stone-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                          addOn.enabled ? 'left-8' : 'left-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Service Edit Modal */}
      {(editingService || isAddingService) && (
        <ServiceEditModal
          service={editingService!}
          isNew={isAddingService}
          usedImages={usedImages}
          onSave={handleSaveService}
          onClose={() => {
            setEditingService(null);
            setIsAddingService(false);
          }}
          saving={saving}
        />
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <BookingDetailModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onUpdate={handleUpdateBooking}
          saving={saving}
        />
      )}
    </div>
  );
}

// Service Edit Modal Component
function ServiceEditModal({
  service,
  isNew,
  usedImages,
  onSave,
  onClose,
  saving,
}: {
  service: Service;
  isNew: boolean;
  usedImages: string[];
  onSave: (service: Service) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [formData, setFormData] = useState<Service>(service);
  const [durationsText, setDurationsText] = useState(service.durations.join(', '));
  const [benefitsText, setBenefitsText] = useState(service.benefits.join('\n'));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Service name is required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (!formData.description.trim()) newErrors.description = 'Full description is required';
    if (!durationsText.trim()) newErrors.durations = 'At least one duration is required';
    if (!formData.idealFor.trim()) newErrors.idealFor = 'This field is required';
    if (!benefitsText.trim()) newErrors.benefits = 'At least one benefit is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const id = isNew
      ? formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : formData.id;

    const durations = durationsText.split(',').map((d) => d.trim()).filter(Boolean);
    const benefits = benefitsText.split('\n').map((b) => b.trim()).filter(Boolean);

    onSave({
      ...formData,
      id,
      durations,
      benefits,
      imageAlt: formData.imageAlt || formData.title,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const { url } = await response.json();
      setUploadedImages(prev => [...prev, url]);
      setFormData({ ...formData, imageSrc: url });
    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Check if image is used by another service
  const isImageUsed = (src: string) => {
    if (!isNew && service.imageSrc === src) return false;
    return usedImages.includes(src);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/30 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen flex items-start justify-center p-4 sm:p-8">
        <div className="bg-white rounded-sm shadow-xl w-full max-w-2xl my-8">
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-lg font-medium text-stone-800">
              {isNew ? 'Add New Service' : 'Edit Service'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-6">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Service Name
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Swedish Massage"
                className={`w-full px-4 py-3 border rounded-sm font-light focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors ${
                  errors.title ? 'border-rose-300 bg-rose-50' : 'border-stone-200'
                }`}
              />
              {errors.title && <p className="mt-2 text-sm text-rose-500 font-light">{errors.title}</p>}
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief tagline for this service"
                className={`w-full px-4 py-3 border rounded-sm font-light focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors ${
                  errors.shortDescription ? 'border-rose-300 bg-rose-50' : 'border-stone-200'
                }`}
              />
              {errors.shortDescription && <p className="mt-2 text-sm text-rose-500 font-light">{errors.shortDescription}</p>}
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Full Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Detailed description of the service..."
                className={`w-full px-4 py-3 border rounded-sm font-light focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors ${
                  errors.description ? 'border-rose-300 bg-rose-50' : 'border-stone-200'
                }`}
              />
              {errors.description && <p className="mt-2 text-sm text-rose-500 font-light">{errors.description}</p>}
            </div>

            {/* Two Column Layout */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Durations */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Durations <span className="font-light text-stone-400">(comma separated)</span>
                </label>
                <input
                  type="text"
                  value={durationsText}
                  onChange={(e) => setDurationsText(e.target.value)}
                  placeholder="60 min, 90 min, 120 min"
                  className={`w-full px-4 py-3 border rounded-sm font-light focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors ${
                    errors.durations ? 'border-rose-300 bg-rose-50' : 'border-stone-200'
                  }`}
                />
                {errors.durations && <p className="mt-2 text-sm text-rose-500 font-light">{errors.durations}</p>}
              </div>

              {/* Ideal For */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Ideal For
                </label>
                <input
                  type="text"
                  value={formData.idealFor}
                  onChange={(e) => setFormData({ ...formData, idealFor: e.target.value })}
                  placeholder="Who is this service best for?"
                  className={`w-full px-4 py-3 border rounded-sm font-light focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors ${
                    errors.idealFor ? 'border-rose-300 bg-rose-50' : 'border-stone-200'
                  }`}
                />
                {errors.idealFor && <p className="mt-2 text-sm text-rose-500 font-light">{errors.idealFor}</p>}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Benefits <span className="font-light text-stone-400">(one per line)</span>
              </label>
              <textarea
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
                rows={4}
                placeholder="Reduces stress&#10;Improves circulation&#10;Promotes better sleep"
                className={`w-full px-4 py-3 border rounded-sm font-light focus:outline-none focus:border-rose-300 focus:ring-1 focus:ring-rose-200 transition-colors ${
                  errors.benefits ? 'border-rose-300 bg-rose-50' : 'border-stone-200'
                }`}
              />
              {errors.benefits && <p className="mt-2 text-sm text-rose-500 font-light">{errors.benefits}</p>}
            </div>

            {/* Image Selection */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-4">
                Service Image
              </label>

              {/* Current Image Preview */}
              <div className="relative w-full h-48 rounded-sm overflow-hidden mb-4 bg-stone-100">
                <Image
                  src={formData.imageSrc}
                  alt="Selected image"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-light">Currently selected</p>
                </div>
              </div>

              {/* Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full py-3 border border-dashed border-stone-300 rounded-sm text-stone-600 font-light mb-4 flex items-center justify-center gap-2 hover:border-rose-300 hover:text-rose-500 transition-colors"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-stone-300 border-t-rose-400 rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upload Custom Image
                  </>
                )}
              </button>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-stone-500 font-light mb-3">Your uploads</p>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {uploadedImages.map((url) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => setFormData({ ...formData, imageSrc: url })}
                        className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-colors ${
                          formData.imageSrc === url ? 'border-rose-400' : 'border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <Image src={url} alt="Uploaded" fill className="object-cover" />
                        {formData.imageSrc === url && (
                          <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Images */}
              <p className="text-sm text-stone-500 font-light mb-3">Stock images</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {STOCK_IMAGES.map((img) => {
                  const used = isImageUsed(img.src);
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => !used && setFormData({ ...formData, imageSrc: img.src })}
                      disabled={used}
                      className={`relative aspect-square rounded-sm overflow-hidden border-2 transition-all ${
                        formData.imageSrc === img.src
                          ? 'border-rose-400'
                          : used
                          ? 'border-stone-200 opacity-50 cursor-not-allowed'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <Image src={img.src} alt={img.label} fill className="object-cover" />
                      {formData.imageSrc === img.src && (
                        <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      {used && (
                        <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center">
                          <span className="text-white text-xs font-light">In Use</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-stone-100 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-stone-200 text-stone-600 rounded-sm font-light tracking-wide hover:bg-stone-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2.5 bg-stone-800 text-white rounded-sm font-light tracking-wide hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : isNew ? 'Create Service' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
