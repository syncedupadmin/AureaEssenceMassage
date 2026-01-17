'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Service, AddOn, Pricing } from '@/lib/data';

interface BusinessData {
  services: Service[];
  addOns: AddOn[];
  pricing: Pricing;
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

      showNotification('success', 'Saved!', `"${service.title}" has been saved.`);
      setEditingService(null);
      setIsAddingService(false);
      await fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      showNotification('error', 'Save Failed', 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (service: Service) => {
    setConfirmDialog({
      title: `Delete "${service.title}"?`,
      message: 'This will permanently remove this service from your website.',
      onConfirm: async () => {
        setConfirmDialog(null);
        setSaving(true);
        try {
          const response = await fetch(`/api/admin/services?id=${service.id}`, {
            method: 'DELETE',
          });

          if (!response.ok) throw new Error('Failed to delete');

          showNotification('success', 'Deleted', `"${service.title}" has been removed.`);
          await fetchData();
        } catch (error) {
          console.error('Error deleting service:', error);
          showNotification('error', 'Delete Failed', 'Could not delete. Please try again.');
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

      showNotification('success', 'Prices Saved!', 'Your pricing has been updated.');
      setHasUnsavedPricing(false);
    } catch (error) {
      console.error('Error saving pricing:', error);
      showNotification('error', 'Save Failed', 'Could not save pricing.');
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
        newEnabled ? 'Enabled' : 'Disabled',
        `"${addOn.title}" is now ${newEnabled ? 'visible' : 'hidden'}.`
      );
    } catch (error) {
      console.error('Error updating add-on:', error);
      showNotification('error', 'Update Failed', 'Could not update.');
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

  // Get list of images already in use
  const usedImages = data?.services.map(s => s.imageSrc) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
          <div className="w-14 h-14 mx-auto mb-4 text-red-500 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load</h2>
          <p className="text-gray-500 mb-4 text-sm">There was a connection problem.</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-rose-500 text-white rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile-friendly Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm text-gray-600 bg-gray-100 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-16 left-4 right-4 z-50">
          <div className={`rounded-xl shadow-lg p-4 ${
            notification.type === 'success' ? 'bg-green-500 text-white' :
            notification.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' && (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
              {notification.type === 'error' && (
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm opacity-90">{notification.message}</p>
              </div>
              <button onClick={() => setNotification(null)} className="p-1">
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
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-xl w-full max-w-sm p-6">
            <div className="w-12 h-12 mx-auto mb-4 text-red-500 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">{confirmDialog.title}</h3>
            <p className="text-gray-500 text-center mb-6 text-sm">{confirmDialog.message}</p>
            <div className="space-y-3">
              <button
                onClick={confirmDialog.onConfirm}
                className="w-full py-3 bg-red-500 text-white rounded-xl font-medium"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDialog(null)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation - Mobile Optimized */}
      <div className="bg-white border-b sticky top-[52px] z-30">
        <div className="flex">
          {[
            { id: 'services', label: 'Services', icon: '🧖' },
            { id: 'pricing', label: 'Pricing', icon: '💰' },
            { id: 'addons', label: 'Add-ons', icon: '✨' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 py-3 text-center relative ${
                activeTab === tab.id
                  ? 'text-rose-600'
                  : 'text-gray-500'
              }`}
            >
              <span className="text-xl block">{tab.icon}</span>
              <span className="text-xs font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-rose-500 rounded-full"></div>
              )}
              {tab.id === 'pricing' && hasUnsavedPricing && (
                <span className="absolute top-1 right-1/4 w-2 h-2 bg-orange-500 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 pb-24">
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-4">
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
              className="w-full py-4 bg-rose-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Service
            </button>

            {/* Service Cards */}
            {data.services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="flex">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-3 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{service.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{service.shortDescription}</p>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {service.durations.slice(0, 2).map((d) => (
                        <span key={d} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {d}
                        </span>
                      ))}
                      {service.durations.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          +{service.durations.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex border-t divide-x">
                  <button
                    onClick={() => setEditingService(service)}
                    className="flex-1 py-3 text-sm font-medium text-rose-600 flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteService(service)}
                    className="flex-1 py-3 text-sm font-medium text-red-500 flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pricing Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-4">
            {/* Save Button */}
            {hasUnsavedPricing && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-sm text-orange-800 mb-3">You have unsaved changes</p>
                <button
                  onClick={handleSavePricing}
                  disabled={saving}
                  className="w-full py-3 bg-rose-500 text-white rounded-xl font-medium"
                >
                  {saving ? 'Saving...' : 'Save All Prices'}
                </button>
              </div>
            )}

            {/* Service Pricing */}
            {data.services.map((service) => (
              <div key={service.id} className="bg-white rounded-xl shadow-sm p-4">
                <h3 className="font-semibold text-gray-900 mb-3">{service.title}</h3>
                <div className="space-y-3">
                  {service.durations.map((duration) => (
                    <div key={duration} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-20">{duration}</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          value={data.pricing.services[service.id]?.[duration] ?? ''}
                          onChange={(e) => updatePricing('service', service.id, duration, e.target.value)}
                          placeholder="—"
                          className="w-full pl-8 pr-3 py-3 border border-gray-200 rounded-xl text-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add-on Pricing */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Add-ons</h3>
              <div className="space-y-3">
                {data.addOns.map((addOn) => (
                  <div key={addOn.id} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 flex-1">{addOn.title}</span>
                    <div className="relative w-28">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">+$</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={data.pricing.addOns[addOn.id] ?? ''}
                        onChange={(e) => updatePricing('addon', addOn.id, null, e.target.value)}
                        placeholder="—"
                        className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl text-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!hasUnsavedPricing && (
              <p className="text-center text-sm text-gray-400 py-4">All prices saved</p>
            )}
          </div>
        )}

        {/* Add-ons Tab */}
        {activeTab === 'addons' && (
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">
              Toggle add-ons to show or hide them on your website.
            </p>
            {data.addOns.map((addOn) => (
              <div
                key={addOn.id}
                className={`bg-white rounded-xl shadow-sm p-4 ${
                  addOn.enabled ? 'ring-2 ring-green-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                      addOn.enabled ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {addOn.icon === 'fire' && '🔥'}
                      {addOn.icon === 'leaf' && '🌿'}
                      {addOn.icon === 'sparkles' && '✨'}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{addOn.title}</h3>
                      <p className="text-xs text-gray-500">{addOn.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleAddOn(addOn)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      addOn.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                        addOn.enabled ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
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
    </div>
  );
}

// Service Edit Modal Component - Mobile Optimized
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
    if (!formData.title.trim()) newErrors.title = 'Required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Required';
    if (!formData.description.trim()) newErrors.description = 'Required';
    if (!durationsText.trim()) newErrors.durations = 'Required';
    if (!formData.idealFor.trim()) newErrors.idealFor = 'Required';
    if (!benefitsText.trim()) newErrors.benefits = 'Required';
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
    if (!isNew && service.imageSrc === src) return false; // Current service's image is ok
    return usedImages.includes(src);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Modal Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
        <button
          onClick={onClose}
          className="p-2 -ml-2 text-gray-500"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-900">
          {isNew ? 'New Service' : 'Edit Service'}
        </h2>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="px-4 py-2 bg-rose-500 text-white rounded-lg font-medium text-sm disabled:opacity-50"
        >
          {saving ? '...' : 'Save'}
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-4 space-y-5 pb-8">
        {/* Service Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Name *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Swedish Massage"
            className={`w-full px-4 py-3 border rounded-xl text-base ${
              errors.title ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description *
          </label>
          <input
            type="text"
            value={formData.shortDescription}
            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
            placeholder="Brief tagline for this service"
            className={`w-full px-4 py-3 border rounded-xl text-base ${
              errors.shortDescription ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.shortDescription && <p className="mt-1 text-xs text-red-500">{errors.shortDescription}</p>}
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Detailed description..."
            className={`w-full px-4 py-3 border rounded-xl text-base ${
              errors.description ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
        </div>

        {/* Durations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durations * <span className="font-normal text-gray-400">(comma separated)</span>
          </label>
          <input
            type="text"
            value={durationsText}
            onChange={(e) => setDurationsText(e.target.value)}
            placeholder="60 min, 90 min, 120 min"
            className={`w-full px-4 py-3 border rounded-xl text-base ${
              errors.durations ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.durations && <p className="mt-1 text-xs text-red-500">{errors.durations}</p>}
        </div>

        {/* Ideal For */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ideal For *
          </label>
          <input
            type="text"
            value={formData.idealFor}
            onChange={(e) => setFormData({ ...formData, idealFor: e.target.value })}
            placeholder="Who is this service best for?"
            className={`w-full px-4 py-3 border rounded-xl text-base ${
              errors.idealFor ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.idealFor && <p className="mt-1 text-xs text-red-500">{errors.idealFor}</p>}
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Benefits * <span className="font-normal text-gray-400">(one per line)</span>
          </label>
          <textarea
            value={benefitsText}
            onChange={(e) => setBenefitsText(e.target.value)}
            rows={4}
            placeholder="Reduces stress&#10;Improves circulation&#10;Better sleep"
            className={`w-full px-4 py-3 border rounded-xl text-base ${
              errors.benefits ? 'border-red-300 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.benefits && <p className="mt-1 text-xs text-red-500">{errors.benefits}</p>}
        </div>

        {/* Image Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Service Image
          </label>

          {/* Current Image Preview */}
          <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-gray-100">
            <Image
              src={formData.imageSrc}
              alt="Selected image"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/60 rounded-lg px-3 py-1.5">
              <p className="text-white text-xs truncate">Current: {formData.imageSrc.split('/').pop()}</p>
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
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium mb-4 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Your Own Photo
              </>
            )}
          </button>

          {/* Uploaded Images */}
          {uploadedImages.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Your uploaded images:</p>
              <div className="grid grid-cols-4 gap-2">
                {uploadedImages.map((url) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageSrc: url })}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                      formData.imageSrc === url ? 'border-rose-500' : 'border-gray-200'
                    }`}
                  >
                    <Image src={url} alt="Uploaded" fill className="object-cover" />
                    {formData.imageSrc === url && (
                      <div className="absolute inset-0 bg-rose-500/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <p className="text-xs text-gray-500 mb-2">Or choose a stock image:</p>
          <div className="grid grid-cols-3 gap-2">
            {STOCK_IMAGES.map((img) => {
              const used = isImageUsed(img.src);
              return (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => !used && setFormData({ ...formData, imageSrc: img.src })}
                  disabled={used}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                    formData.imageSrc === img.src
                      ? 'border-rose-500'
                      : used
                      ? 'border-gray-200 opacity-40'
                      : 'border-gray-200'
                  }`}
                >
                  <Image src={img.src} alt={img.label} fill className="object-cover" />
                  {formData.imageSrc === img.src && (
                    <div className="absolute inset-0 bg-rose-500/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {used && (
                    <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                      <span className="text-white text-xs font-medium px-2 py-1 bg-gray-900/70 rounded">In Use</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5">
                    <p className="text-white text-xs text-center truncate">{img.label}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
