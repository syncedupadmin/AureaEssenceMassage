'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { getServiceNames } from '@/config/business';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  locationType: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  preferredPressure: string;
  message: string;
}

interface BookingResult {
  lookupToken: string;
}

const inputBase =
  'w-full px-4 py-3.5 bg-white border text-charcoal placeholder-charcoal/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all duration-200 text-sm';
const inputError = 'border-red-400 bg-red-50/30';
const inputNormal = 'border-champagne-300 hover:border-champagne-400';

function SectionHeader({ number, label }: { number: number; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-charcoal text-xs font-semibold flex-shrink-0">
        {number}
      </div>
      <span className="text-xs font-semibold text-charcoal/60 uppercase tracking-luxury">{label}</span>
      <div className="flex-1 h-px bg-champagne-200" />
    </div>
  );
}

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
        throw new Error(result.error || 'Failed to submit booking');
      }

      setBookingResult({ lookupToken: result.lookupToken });
      setIsSubmitted(true);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [...getServiceNames(), 'Package / Custom Service'];

  const locationTypes = [
    { value: 'home', label: 'Private Residence' },
    { value: 'hotel', label: 'Hotel / Resort' },
    { value: 'office', label: 'Office' },
    { value: 'event', label: 'Event Venue' },
  ];

  const pressureOptions = [
    { value: 'light', label: 'Light — Gentle & deeply relaxing' },
    { value: 'medium', label: 'Medium — Balanced, moderate pressure' },
    { value: 'firm', label: 'Firm — Deep tissue work' },
    { value: 'varies', label: 'Varies — Different for each area' },
  ];

  if (isSubmitted && bookingResult) {
    return (
      <div className="bg-white rounded-sm shadow-elegant overflow-hidden">
        {/* Gold top bar */}
        <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

        <div className="p-8 sm:p-10 md:p-12">
          <div className="text-center max-w-md mx-auto">
            {/* Animated check */}
            <div className="w-20 h-20 mx-auto mb-6 bg-gold-50 border border-gold-200 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gold-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>

            <span className="text-gold-600 text-xs tracking-luxury uppercase">Request Received</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mt-2 mb-3 tracking-wide">
              Your Experience Awaits
            </h2>
            <p className="text-charcoal/60 text-sm leading-relaxed mb-8">
              Thank you for choosing Áurea Essence. We&apos;ll review your request and confirm your appointment within 24 hours.
            </p>

            {/* Reference Number */}
            <div className="bg-charcoal rounded-sm p-5 mb-4">
              <p className="text-champagne/50 text-xs uppercase tracking-luxury mb-2">Your Reference Number</p>
              <p className="text-2xl font-mono font-semibold text-gold-400 tracking-widest mb-2">
                {bookingResult.lookupToken}
              </p>
              <p className="text-champagne/50 text-xs">
                Save this to check your booking status at any time
              </p>
            </div>

            <div className="bg-champagne-50 border border-champagne-200 rounded-sm p-4 mb-8 text-left">
              <p className="text-charcoal/70 text-xs leading-relaxed">
                <strong className="text-charcoal font-medium">What happens next:</strong> We&apos;ll reach out via phone or email to confirm your date, time, and any special requests. Expect to hear from us within 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/booking/status?ref=${bookingResult.lookupToken}`}
                className="flex-1 inline-flex items-center justify-center px-6 py-3.5 bg-gold-500 text-charcoal rounded-sm font-medium text-sm tracking-wide hover:bg-gold-400 transition-all shadow-gold"
              >
                Check Booking Status
              </Link>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setBookingResult(null);
                }}
                className="flex-1 px-6 py-3.5 border border-champagne-300 text-charcoal/60 rounded-sm font-medium text-sm hover:bg-champagne-50 hover:text-charcoal transition-all"
              >
                New Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm shadow-elegant overflow-hidden">
      {/* Gold gradient top bar */}
      <div className="h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400" />

      <div className="p-6 sm:p-8 md:p-10">
        {/* Form Header */}
        <div className="text-center mb-8 pb-8 border-b border-champagne-200">
          <span className="text-gold-600 text-xs tracking-luxury uppercase">Private Session</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mt-2 mb-2 tracking-wide">
            Reserve Your Experience
          </h2>
          <p className="text-charcoal/50 text-sm">
            Confirmation within 24 hours &mdash; we bring everything to you
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-red-800 font-medium text-sm">Unable to Submit</p>
                <p className="text-red-700 text-xs mt-0.5">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ── Section 1: Your Information ── */}
          <div>
            <SectionHeader number={1} label="Your Information" />
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                  Full Name <span className="text-rose-500 normal-case">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name', {
                    required: 'Name is required',
                    minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  })}
                  className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                    Email <span className="text-rose-500 normal-case">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                    Phone <span className="text-rose-500 normal-case">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^[\d\s\-\(\)]+$/,
                        message: 'Invalid phone number format',
                      },
                      minLength: { value: 10, message: 'Phone number must be at least 10 digits' },
                    })}
                    className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                    placeholder="(305) 555-0100"
                  />
                  {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 2: Your Session ── */}
          <div>
            <SectionHeader number={2} label="Your Session" />
            <div className="space-y-4">
              <div>
                <label htmlFor="service" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                  Service <span className="text-rose-500 normal-case">*</span>
                </label>
                <select
                  id="service"
                  {...register('service', { required: 'Please select a service' })}
                  className={`${inputBase} ${errors.service ? inputError : inputNormal}`}
                >
                  <option value="">Select a service...</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
                {errors.service && <p className="mt-1.5 text-xs text-red-500">{errors.service.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="locationType" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                    Location Type <span className="text-rose-500 normal-case">*</span>
                  </label>
                  <select
                    id="locationType"
                    {...register('locationType', { required: 'Please select a location type' })}
                    className={`${inputBase} ${errors.locationType ? inputError : inputNormal}`}
                  >
                    <option value="">Select location...</option>
                    {locationTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  {errors.locationType && <p className="mt-1.5 text-xs text-red-500">{errors.locationType.message}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                    City / Zip Code
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register('address')}
                    className={`${inputBase} ${inputNormal}`}
                    placeholder="Miami, FL 33101"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 3: Scheduling ── */}
          <div>
            <SectionHeader number={3} label="Scheduling" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredDate" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  {...register('preferredDate')}
                  className={`${inputBase} ${inputNormal}`}
                />
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  {...register('preferredTime')}
                  className={`${inputBase} ${inputNormal}`}
                >
                  <option value="">Select time of day...</option>
                  <option value="morning">Morning (8am – 12pm)</option>
                  <option value="afternoon">Afternoon (12pm – 5pm)</option>
                  <option value="evening">Evening (5pm – 9pm)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Section 4: Preferences ── */}
          <div>
            <SectionHeader number={4} label="Preferences" />
            <div className="space-y-4">
              <div>
                <label htmlFor="preferredPressure" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                  Preferred Pressure
                </label>
                <select
                  id="preferredPressure"
                  {...register('preferredPressure')}
                  className={`${inputBase} ${inputNormal}`}
                >
                  <option value="">Select pressure preference...</option>
                  {pressureOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-charcoal/70 uppercase tracking-wide mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className={`${inputBase} ${inputNormal} resize-none`}
                  placeholder="Areas of focus, injuries to avoid, allergies, or any special requests..."
                />
              </div>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-4 bg-gold-500 text-charcoal font-medium tracking-wide rounded-sm transition-all duration-300 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ${
                isSubmitting
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:bg-gold-400 shadow-gold hover:shadow-elegant'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-4 w-4 text-charcoal" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting Request...
                </span>
              ) : (
                'Reserve My Session'
              )}
            </button>

            <p className="text-center text-xs text-charcoal/40 mt-3">
              <span className="text-rose-400">*</span> Required fields &nbsp;&middot;&nbsp; We confirm within 24 hours
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
