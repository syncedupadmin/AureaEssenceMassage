'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Fetch data on mount
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
      showMessage('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
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

      if (!response.ok) {
        throw new Error('Failed to save service');
      }

      showMessage('success', 'Service saved successfully');
      setEditingService(null);
      setIsAddingService(false);
      await fetchData();
    } catch (error) {
      console.error('Error saving service:', error);
      showMessage('error', 'Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/services?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete service');
      }

      showMessage('success', 'Service deleted successfully');
      await fetchData();
    } catch (error) {
      console.error('Error deleting service:', error);
      showMessage('error', 'Failed to delete service');
    } finally {
      setSaving(false);
    }
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

      if (!response.ok) {
        throw new Error('Failed to save pricing');
      }

      showMessage('success', 'Pricing saved successfully');
    } catch (error) {
      console.error('Error saving pricing:', error);
      showMessage('error', 'Failed to save pricing');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAddOn = async (addOnId: string, enabled: boolean) => {
    if (!data) return;

    const updatedAddOns = data.addOns.map(a =>
      a.id === addOnId ? { ...a, enabled } : a
    );

    setData({ ...data, addOns: updatedAddOns });

    try {
      const addOn = updatedAddOns.find(a => a.id === addOnId);
      if (!addOn) return;

      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addOn }),
      });

      if (!response.ok) {
        throw new Error('Failed to update add-on');
      }

      showMessage('success', 'Add-on updated');
    } catch (error) {
      console.error('Error updating add-on:', error);
      showMessage('error', 'Failed to update add-on');
      await fetchData(); // Revert on error
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
    const newPricing = { ...data.pricing };

    if (type === 'service' && duration) {
      if (!newPricing.services[id]) {
        newPricing.services[id] = {};
      }
      newPricing.services[id][duration] = price;
    } else if (type === 'addon') {
      newPricing.addOns[id] = price;
    }

    setData({ ...data, pricing: newPricing });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-charcoal/60">Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-champagne-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-medium text-charcoal">Admin Dashboard</h1>
            <p className="text-sm text-charcoal/60">Aurea Essence Massage</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-charcoal/70 hover:text-rose-500 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Message Toast */}
      {message && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-sm shadow-lg ${
            message.type === 'success'
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-champagne-100 p-1 rounded-sm w-fit">
          {(['services', 'pricing', 'addons'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-sm font-medium rounded-sm transition-colors ${
                activeTab === tab
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              {tab === 'addons' ? 'Add-ons' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-charcoal">Services</h2>
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
                className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-sm hover:bg-rose-600 transition-colors"
              >
                Add Service
              </button>
            </div>

            {/* Service List */}
            <div className="grid gap-4">
              {data.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-sm shadow-sm p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium text-charcoal">{service.title}</h3>
                    <p className="text-sm text-charcoal/60">{service.shortDescription}</p>
                    <p className="text-xs text-charcoal/40 mt-1">
                      Durations: {service.durations.join(', ')}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingService(service)}
                      className="px-3 py-1.5 text-sm text-charcoal/70 hover:text-rose-500 border border-champagne-200 rounded-sm hover:border-rose-300 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-sm hover:border-red-300 transition-colors"
                    >
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
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-charcoal">Service Pricing</h2>
              <button
                onClick={handleSavePricing}
                disabled={saving}
                className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-sm hover:bg-rose-600 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Pricing'}
              </button>
            </div>

            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-champagne-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Service</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Duration</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Price ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne-100">
                  {data.services.map((service) =>
                    service.durations.map((duration, idx) => (
                      <tr key={`${service.id}-${duration}`}>
                        {idx === 0 && (
                          <td
                            rowSpan={service.durations.length}
                            className="px-4 py-3 text-sm text-charcoal font-medium align-top"
                          >
                            {service.title}
                          </td>
                        )}
                        <td className="px-4 py-3 text-sm text-charcoal/70">{duration}</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={data.pricing.services[service.id]?.[duration] ?? ''}
                            onChange={(e) =>
                              updatePricing('service', service.id, duration, e.target.value)
                            }
                            placeholder="—"
                            className="w-24 px-3 py-1.5 text-sm border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Add-on Pricing */}
            <h3 className="text-lg font-medium text-charcoal mt-8">Add-on Pricing</h3>
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-champagne-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Add-on</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-charcoal">Price ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne-100">
                  {data.addOns.map((addOn) => (
                    <tr key={addOn.id}>
                      <td className="px-4 py-3 text-sm text-charcoal font-medium">{addOn.title}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={data.pricing.addOns[addOn.id] ?? ''}
                          onChange={(e) =>
                            updatePricing('addon', addOn.id, null, e.target.value)
                          }
                          placeholder="—"
                          className="w-24 px-3 py-1.5 text-sm border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add-ons Tab */}
        {activeTab === 'addons' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-charcoal">Add-ons</h2>
            <p className="text-sm text-charcoal/60">
              Toggle which add-ons are visible on the website.
            </p>

            <div className="grid gap-4">
              {data.addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="bg-white rounded-sm shadow-sm p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium text-charcoal">{addOn.title}</h3>
                    <p className="text-sm text-charcoal/60">{addOn.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addOn.enabled}
                      onChange={(e) => handleToggleAddOn(addOn.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-champagne-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-rose-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-champagne-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                    <span className="ml-3 text-sm text-charcoal/70">
                      {addOn.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </label>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate ID from title if new
    const id = isNew
      ? formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      : formData.id;

    // Parse durations and benefits
    const durations = durationsText.split(',').map((d) => d.trim()).filter(Boolean);
    const benefits = benefitsText.split('\n').map((b) => b.trim()).filter(Boolean);

    onSave({
      ...formData,
      id,
      durations,
      benefits,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        <div className="fixed inset-0 bg-charcoal/50" onClick={onClose}></div>

        <div className="relative bg-white rounded-sm shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-medium text-charcoal mb-6">
            {isNew ? 'Add Service' : 'Edit Service'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">
                Short Description
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3 py-2 border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">
                Full Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">
                Durations (comma separated)
              </label>
              <input
                type="text"
                value={durationsText}
                onChange={(e) => setDurationsText(e.target.value)}
                placeholder="60 min, 90 min, 120 min"
                className="w-full px-3 py-2 border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">Ideal For</label>
              <input
                type="text"
                value={formData.idealFor}
                onChange={(e) => setFormData({ ...formData, idealFor: e.target.value })}
                className="w-full px-3 py-2 border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">
                Benefits (one per line)
              </label>
              <textarea
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
                rows={4}
                placeholder="Reduces stress and anxiety&#10;Improves circulation&#10;Promotes better sleep"
                className="w-full px-3 py-2 border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">Image Path</label>
              <input
                type="text"
                value={formData.imageSrc}
                onChange={(e) => setFormData({ ...formData, imageSrc: e.target.value })}
                className="w-full px-3 py-2 border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal/80 mb-1">
                Image Alt Text
              </label>
              <input
                type="text"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                className="w-full px-3 py-2 border border-champagne-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 text-sm"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-charcoal/70 hover:text-charcoal border border-champagne-200 rounded-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-rose-500 text-white text-sm font-medium rounded-sm hover:bg-rose-600 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : isNew ? 'Add Service' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
