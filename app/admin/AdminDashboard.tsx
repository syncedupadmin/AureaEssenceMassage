'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Service, AddOn, Pricing } from '@/lib/data';

interface BusinessData {
  services: Service[];
  addOns: AddOn[];
  pricing: Pricing;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'services' | 'pricing' | 'addons'>('services');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info'; title: string; message: string } | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{ title: string; message: string; onConfirm: () => void } | null>(null);
  const [hasUnsavedPricing, setHasUnsavedPricing] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      showNotification('success', 'Service Saved!', `"${service.title}" has been saved successfully. The website will update shortly.`);
      setEditingService(null);
      setIsAddingService(false);
      await fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      showNotification('error', 'Save Failed', 'Could not save the service. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (service: Service) => {
    setConfirmDialog({
      title: `Delete "${service.title}"?`,
      message: 'This will permanently remove this service from your website. This action cannot be undone.',
      onConfirm: async () => {
        setConfirmDialog(null);
        setSaving(true);
        try {
          const response = await fetch(`/api/admin/services?id=${service.id}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to delete');

          showNotification('success', 'Service Deleted', `"${service.title}" has been removed from your website.`);
          await fetchData();
        } catch (error) {
          console.error('Error deleting service:', error);
          showNotification('error', 'Delete Failed', 'Could not delete the service. Please try again.');
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

      showNotification('success', 'Prices Updated!', 'All pricing changes have been saved. Your website will reflect these changes shortly.');
      setHasUnsavedPricing(false);
    } catch (error) {
      console.error('Error saving pricing:', error);
      showNotification('error', 'Save Failed', 'Could not save pricing. Please try again.');
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
        `"${addOn.title}" is now ${newEnabled ? 'visible' : 'hidden'} on your website.`
      );
    } catch (error) {
      console.error('Error updating add-on:', error);
      showNotification('error', 'Update Failed', 'Could not update the add-on. Please try again.');
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-champagne-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-charcoal/60">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-champagne-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 text-red-500 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-charcoal mb-2">Unable to Load Data</h2>
          <p className="text-charcoal/60 mb-4">There was a problem connecting to the server.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage your services and pricing</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-in slide-in-from-right">
          <div className={`rounded-lg shadow-lg p-4 ${
            notification.type === 'success' ? 'bg-green-50 border border-green-200' :
            notification.type === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                notification.type === 'success' ? 'bg-green-500' :
                notification.type === 'error' ? 'bg-red-500' :
                'bg-blue-500'
              }`}>
                {notification.type === 'success' && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {notification.type === 'error' && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
                {notification.type === 'info' && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className={`font-medium ${
                  notification.type === 'success' ? 'text-green-800' :
                  notification.type === 'error' ? 'text-red-800' :
                  'text-blue-800'
                }`}>{notification.title}</h4>
                <p className={`text-sm mt-1 ${
                  notification.type === 'success' ? 'text-green-700' :
                  notification.type === 'error' ? 'text-red-700' :
                  'text-blue-700'
                }`}>{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="w-12 h-12 mx-auto mb-4 text-red-500 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{confirmDialog.title}</h3>
            <p className="text-gray-600 text-center mb-6">{confirmDialog.message}</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDialog(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDialog.onConfirm}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'services', label: 'Services', icon: '🧖', description: 'Manage massage services' },
              { id: 'pricing', label: 'Pricing', icon: '💰', description: 'Set your prices' },
              { id: 'addons', label: 'Add-ons', icon: '✨', description: 'Enhancement options' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 px-6 py-4 text-center transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-rose-600 bg-rose-50/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl block mb-1">{tab.icon}</span>
                <span className="font-medium block">{tab.label}</span>
                <span className="text-xs text-gray-500 block">{tab.description}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"></div>
                )}
                {tab.id === 'pricing' && hasUnsavedPricing && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Your Massage Services</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    These services appear on your website. Click on a service to edit it.
                  </p>
                </div>
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Service
                </button>
              </div>
            </div>

            {/* Service Cards */}
            <div className="grid gap-4">
              {data.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={service.imageSrc}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900">{service.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.shortDescription}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {service.durations.map((d) => (
                          <span key={d} className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingService(service)}
                        className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Edit service"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete service"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Service Pricing</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Set prices for each service duration. Leave blank to show "Price upon request".
                  </p>
                </div>
                <button
                  onClick={handleSavePricing}
                  disabled={saving || !hasUnsavedPricing}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors ${
                    hasUnsavedPricing
                      ? 'bg-rose-500 text-white hover:bg-rose-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : hasUnsavedPricing ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save All Prices
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      All Saved
                    </>
                  )}
                </button>
              </div>
              {hasUnsavedPricing && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-800 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    You have unsaved changes. Click "Save All Prices" to update your website.
                  </p>
                </div>
              )}
            </div>

            {/* Pricing Cards */}
            <div className="grid gap-4">
              {data.services.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {service.durations.map((duration) => (
                      <div key={duration}>
                        <label className="block text-sm text-gray-600 mb-1.5">{duration}</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                          <input
                            type="number"
                            value={data.pricing.services[service.id]?.[duration] ?? ''}
                            onChange={(e) => updatePricing('service', service.id, duration, e.target.value)}
                            placeholder="—"
                            min="0"
                            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 text-gray-900"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Add-on Pricing */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Add-on Pricing</h3>
              <p className="text-sm text-gray-500 mb-4">Extra services customers can add to their booking</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {data.addOns.map((addOn) => (
                  <div key={addOn.id}>
                    <label className="block text-sm text-gray-600 mb-1.5">{addOn.title}</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">+$</span>
                      <input
                        type="number"
                        value={data.pricing.addOns[addOn.id] ?? ''}
                        onChange={(e) => updatePricing('addon', addOn.id, null, e.target.value)}
                        placeholder="—"
                        min="0"
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 text-gray-900"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add-ons Tab */}
        {activeTab === 'addons' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Service Add-ons</h2>
              <p className="text-sm text-gray-500 mt-1">
                Toggle add-ons on or off to show or hide them on your website.
              </p>
            </div>

            {/* Add-on Cards */}
            <div className="grid gap-4">
              {data.addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className={`bg-white rounded-xl shadow-sm border p-6 transition-colors ${
                    addOn.enabled ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        addOn.enabled ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {addOn.icon === 'fire' && '🔥'}
                        {addOn.icon === 'leaf' && '🌿'}
                        {addOn.icon === 'sparkles' && '✨'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{addOn.title}</h3>
                        <p className="text-sm text-gray-500">{addOn.description}</p>
                        {data.pricing.addOns[addOn.id] && (
                          <p className="text-sm text-rose-500 font-medium mt-1">
                            +${data.pricing.addOns[addOn.id]}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleAddOn(addOn)}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        addOn.enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                          addOn.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className={`mt-3 text-xs font-medium ${
                    addOn.enabled ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {addOn.enabled ? '✓ Visible on website' : '○ Hidden from website'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Service Edit Modal */}
      {(editingService || isAddingService) && (
        <ServiceEditModal
          service={editingService!}
          isNew={isAddingService}
          onSave={handleSaveService}
          onClose={() => {
            setEditingService(null);
            setIsAddingService(false);
          }}
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
  onSave,
  onClose,
  saving,
}: {
  service: Service;
  isNew: boolean;
  onSave: (service: Service) => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [formData, setFormData] = useState<Service>(service);
  const [durationsText, setDurationsText] = useState(service.durations.join(', '));
  const [benefitsText, setBenefitsText] = useState(service.benefits.join('\n'));
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Service name is required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';
    if (!formData.description.trim()) newErrors.description = 'Full description is required';
    if (!durationsText.trim()) newErrors.durations = 'At least one duration is required';
    if (!formData.idealFor.trim()) newErrors.idealFor = 'Target audience is required';
    if (!benefitsText.trim()) newErrors.benefits = 'At least one benefit is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-start justify-center min-h-screen px-4 pt-8 pb-20">
        <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>

        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full overflow-hidden">
          {/* Modal Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {isNew ? 'Add New Service' : 'Edit Service'}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {isNew ? 'Create a new massage service for your website' : 'Update the service details'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Swedish Massage"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 ${
                  errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              <p className="mt-1 text-xs text-gray-500">The name that appears on your website</p>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Short Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="e.g., Relaxing full-body massage for stress relief"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 ${
                  errors.shortDescription ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.shortDescription && <p className="mt-1 text-sm text-red-500">{errors.shortDescription}</p>}
              <p className="mt-1 text-xs text-gray-500">A brief tagline (shown in service cards)</p>
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Describe what this service includes and what the client can expect..."
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 ${
                  errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>

            {/* Durations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Available Durations <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={durationsText}
                onChange={(e) => setDurationsText(e.target.value)}
                placeholder="e.g., 60 min, 90 min, 120 min"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 ${
                  errors.durations ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.durations && <p className="mt-1 text-sm text-red-500">{errors.durations}</p>}
              <p className="mt-1 text-xs text-gray-500">Separate multiple durations with commas</p>
            </div>

            {/* Ideal For */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ideal For <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.idealFor}
                onChange={(e) => setFormData({ ...formData, idealFor: e.target.value })}
                placeholder="e.g., Anyone seeking relaxation and stress relief"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 ${
                  errors.idealFor ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.idealFor && <p className="mt-1 text-sm text-red-500">{errors.idealFor}</p>}
              <p className="mt-1 text-xs text-gray-500">Who would benefit most from this service</p>
            </div>

            {/* Benefits */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Benefits <span className="text-red-500">*</span>
              </label>
              <textarea
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
                rows={4}
                placeholder="Reduces stress and anxiety&#10;Improves circulation&#10;Promotes better sleep&#10;Eases muscle tension"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 ${
                  errors.benefits ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.benefits && <p className="mt-1 text-sm text-red-500">{errors.benefits}</p>}
              <p className="mt-1 text-xs text-gray-500">Enter each benefit on a new line</p>
            </div>

            {/* Image Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Service Image <span className="font-normal text-gray-500">(click to select)</span>
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[
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
                ].map((img) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageSrc: img.src })}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      formData.imageSrc === img.src
                        ? 'border-rose-500 ring-2 ring-rose-500/30'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-cover"
                    />
                    {formData.imageSrc === img.src && (
                      <div className="absolute inset-0 bg-rose-500/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
                      <p className="text-white text-xs text-center truncate">{img.label}</p>
                    </div>
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500">Selected: {formData.imageSrc.split('/').pop()?.replace('.png', '')}</p>
            </div>
          </form>

          {/* Modal Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-5 py-2.5 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {isNew ? 'Add Service' : 'Save Changes'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
