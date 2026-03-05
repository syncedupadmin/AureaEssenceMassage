'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { businessConfig, getPhoneHref } from '@/config/business';

const phone = businessConfig.contact.phone!;
const phoneHref = getPhoneHref(phone);

const services = [
  {
    id: 'Swedish Massage',
    icon: '🌊',
    name: 'Swedish Massage',
    tagline: 'Deep relaxation & stress relief',
    detail: '60 · 90 · 120 min',
  },
  {
    id: 'Deep Tissue Massage',
    icon: '💪',
    name: 'Deep Tissue',
    tagline: 'Chronic tension & muscle recovery',
    detail: '60 · 90 · 120 min',
  },
  {
    id: 'Couples Massage',
    icon: '💑',
    name: 'Couples Massage',
    tagline: 'Share the experience together',
    detail: '120 · 180 min',
  },
  {
    id: 'Prenatal Massage',
    icon: '🤱',
    name: 'Prenatal Massage',
    tagline: 'Safe, nurturing care for moms-to-be',
    detail: '60 · 90 min',
  },
  {
    id: 'Lymphatic Drainage Massage',
    icon: '✨',
    name: 'Lymphatic Drainage',
    tagline: 'Detox, reduce swelling & heal',
    detail: '60 · 90 min',
  },
  {
    id: 'Post-Surgical Massage',
    icon: '🏥',
    name: 'Post-Surgical',
    tagline: 'Recovery & scar tissue support',
    detail: '60 · 90 min',
  },
];

const reviews = [
  {
    name: 'Maria G.',
    location: 'Miami Beach',
    stars: 5,
    text: 'Absolutely incredible. Arrived right on time, set up beautifully, and the massage was world-class. I felt like I was at a 5-star resort — in my own living room.',
  },
  {
    name: 'Carlos R.',
    location: 'Brickell',
    stars: 5,
    text: 'Best massage I\'ve ever had, and I didn\'t have to drive anywhere. The therapist was professional, calm, and incredibly skilled. Already booked again.',
  },
  {
    name: 'Sofia L.',
    location: 'Coral Gables',
    stars: 5,
    text: 'Booked a couples massage for our anniversary. It was the most relaxing evening. They handled everything — table, linens, music, oils. Pure luxury.',
  },
];

export default function AdsLandingPage() {
  const [selectedService, setSelectedService] = useState('');
  const [name, setName] = useState('');
  const [phone2, setPhone2] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  function selectService(id: string) {
    setSelectedService(id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: phone2,
          email: 'noreply@ads.com',
          service: selectedService || 'Not specified',
          locationType: 'home',
          address,
          preferredDate: date,
          message,
        }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please call us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Sticky Bottom Bar (mobile) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-white/10 shadow-2xl">
        <a
          href={phoneHref}
          className="flex-1 flex items-center justify-center gap-2 bg-charcoal text-white py-4 text-sm font-semibold tracking-wide"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
          </svg>
          Call Now
        </a>
        <button
          onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="flex-1 flex items-center justify-center gap-2 bg-gold-500 text-charcoal py-4 text-sm font-semibold tracking-wide"
        >
          Book My Session →
        </button>
      </div>

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center bg-charcoal text-white px-5 pt-12 pb-32 md:pb-20 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(183,110,121,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />

        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/aurea-essence-logo.png"
            width={2000}
            height={500}
            priority
            alt="Áurea Essence Massage"
            className="w-52 sm:w-64 h-auto mx-auto opacity-90"
          />
        </div>

        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-5">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          <span className="text-champagne-300 text-sm font-medium ml-1">5.0 · 100+ Sessions in South Florida</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-4 tracking-wide max-w-2xl">
          Luxury Massage,
          <br />
          <span className="text-gold-400">Delivered to You</span>
        </h1>

        {/* Subheadline */}
        <p className="text-champagne-200 text-lg sm:text-xl max-w-md mx-auto mb-8 leading-relaxed">
          We bring the full spa experience to your home, hotel, or office — anywhere in South Florida.
        </p>

        {/* Trust chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {['Licensed & Insured', 'Same-Day Available', 'We Bring Everything', 'Miami · Fort Lauderdale · Palm Beach'].map(t => (
            <span key={t} className="text-xs font-medium bg-white/10 border border-white/20 text-champagne-200 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="flex-1 bg-gold-500 text-charcoal font-semibold py-4 px-6 rounded-sm text-base tracking-wide hover:bg-gold-400 transition-colors shadow-xl"
          >
            Book My Session
          </button>
          <a
            href={phoneHref}
            className="flex-1 flex items-center justify-center gap-2 border border-white/30 text-white font-medium py-4 px-6 rounded-sm text-base hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
            </svg>
            {phone}
          </a>
        </div>

        {/* Scroll hint */}
        <p className="mt-8 text-white/30 text-xs tracking-widest uppercase animate-pulse">
          scroll to choose your service
        </p>
      </section>

      {/* ── Service Click-Through Cards ── */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-10 h-0.5 bg-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-medium text-charcoal mb-2">Choose Your Experience</h2>
            <p className="text-charcoal/50 text-sm">Tap a service to select it and book below</p>
          </div>

          <div className="space-y-3">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => selectService(s.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-sm border-2 text-left transition-all duration-200 ${
                  selectedService === s.id
                    ? 'border-gold-500 bg-gold-50 shadow-elegant'
                    : 'border-champagne-200 bg-white hover:border-gold-300 hover:shadow-soft active:scale-[0.99]'
                }`}
              >
                <span className="text-3xl flex-shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-charcoal text-base leading-tight">{s.name}</p>
                  <p className="text-charcoal/50 text-sm mt-0.5">{s.tagline}</p>
                  <p className="text-gold-500 text-xs font-medium mt-1">{s.detail}</p>
                </div>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedService === s.id
                    ? 'border-gold-500 bg-gold-500'
                    : 'border-champagne-300'
                }`}>
                  {selectedService === s.id && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="bg-charcoal py-10 px-4">
        <div className="max-w-lg mx-auto grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: '🛡️', label: 'Licensed & Insured' },
            { icon: '🚗', label: 'We Come to You' },
            { icon: '⚡', label: 'Same-Day Booking' },
            { icon: '🛏️', label: 'We Bring Everything' },
          ].map(item => (
            <div key={item.label} className="flex flex-col items-center text-center gap-2 py-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-champagne-200 text-xs font-medium leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-champagne-100 py-14 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <div className="w-10 h-0.5 bg-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-medium text-charcoal">How It Works</h2>
          </div>
          <div className="space-y-6">
            {[
              { n: '1', title: 'Book in Seconds', body: 'Choose your service and fill out the short form below — or just call us. No account needed.' },
              { n: '2', title: 'We Confirm & Arrive', body: 'We confirm your appointment and arrive on time with everything: table, linens, oils, and music.' },
              { n: '3', title: 'Melt into Relaxation', body: 'Enjoy a world-class massage in the comfort of your own space. Zero commute, zero stress.' },
            ].map(step => (
              <div key={step.n} className="flex gap-5 items-start">
                <div className="w-11 h-11 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0 font-serif font-bold text-charcoal text-lg shadow-md">
                  {step.n}
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-charcoal text-base mb-1">{step.title}</p>
                  <p className="text-charcoal/60 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="bg-white py-14 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-10 h-0.5 bg-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-medium text-charcoal mb-1">What Clients Say</h2>
            <p className="text-charcoal/40 text-sm">100+ sessions · 5.0 average rating</p>
          </div>
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.name} className="bg-champagne-50 border border-champagne-200 rounded-sm p-5">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.stars)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-charcoal/70 text-sm leading-relaxed italic mb-3">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-500/20 flex items-center justify-center">
                    <span className="text-gold-600 text-xs font-bold">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-charcoal text-xs font-semibold">{r.name}</p>
                    <p className="text-charcoal/40 text-xs">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Booking Form ── */}
      <section ref={formRef} className="bg-charcoal py-14 px-4 pb-28 md:pb-14" id="book">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <div className="w-10 h-0.5 bg-gold-500 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-medium text-white mb-2">Reserve Your Session</h2>
            <p className="text-champagne-300 text-sm">We&apos;ll confirm within 1 hour · No payment required now</p>
          </div>

          {submitted ? (
            <div className="bg-white/10 border border-gold-500/40 rounded-sm p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-gold-500 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">You&apos;re on the list!</h3>
              <p className="text-champagne-300 text-sm mb-6">We received your request and will text you to confirm shortly.</p>
              <a href={phoneHref} className="inline-flex items-center gap-2 text-gold-400 text-sm font-medium hover:text-gold-300 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                </svg>
                Need sooner? Call {phone}
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected service badge */}
              {selectedService && (
                <div className="flex items-center gap-2 bg-gold-500/15 border border-gold-500/40 rounded-sm px-4 py-3">
                  <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gold-300 text-sm font-medium">{selectedService} selected</span>
                  <button type="button" onClick={() => setSelectedService('')} className="ml-auto text-white/30 hover:text-white/60 text-xs">change</button>
                </div>
              )}

              {/* Service select (if none tapped above) */}
              {!selectedService && (
                <div>
                  <label className="block text-champagne-300 text-xs font-medium uppercase tracking-wide mb-2">Service *</label>
                  <select
                    required
                    value={selectedService}
                    onChange={e => setSelectedService(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-colors"
                  >
                    <option value="" className="text-charcoal bg-white">Choose a service…</option>
                    {services.map(s => (
                      <option key={s.id} value={s.id} className="text-charcoal bg-white">{s.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-champagne-300 text-xs font-medium uppercase tracking-wide mb-2">Your Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="First & Last Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-champagne-300 text-xs font-medium uppercase tracking-wide mb-2">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    placeholder="(305) 000-0000"
                    value={phone2}
                    onChange={e => setPhone2(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-champagne-300 text-xs font-medium uppercase tracking-wide mb-2">Your Address *</label>
                <input
                  required
                  type="text"
                  placeholder="123 Ocean Dr, Miami Beach, FL 33139"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-colors"
                />
                <p className="text-white/25 text-xs mt-1.5">We come to you — home, hotel, or office</p>
              </div>

              <div>
                <label className="block text-champagne-300 text-xs font-medium uppercase tracking-wide mb-2">Preferred Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white/10 border border-white/20 text-white rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-colors [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-champagne-300 text-xs font-medium uppercase tracking-wide mb-2">Anything Else?</label>
                <textarea
                  rows={2}
                  placeholder="Special requests, questions…"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-sm px-4 py-3.5 text-sm focus:outline-none focus:border-gold-400 focus:bg-white/15 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-rose-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold-500 text-charcoal font-bold py-4 rounded-sm text-base tracking-wide hover:bg-gold-400 transition-colors disabled:opacity-60 shadow-xl mt-2"
              >
                {loading ? 'Sending…' : 'Reserve My Session →'}
              </button>

              <p className="text-center text-white/30 text-xs">
                No payment now · We&apos;ll confirm by text · No spam, ever.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── Final Call CTA ── */}
      <section className="bg-rose-500 py-12 px-4 text-center">
        <p className="text-white/80 text-sm uppercase tracking-widest mb-2 font-medium">Prefer to Talk?</p>
        <a
          href={phoneHref}
          className="inline-flex items-center gap-3 text-white font-serif text-3xl sm:text-4xl font-medium hover:text-champagne transition-colors"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.18 21 3 13.82 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
          </svg>
          {phone}
        </a>
        <p className="text-white/60 text-sm mt-3">{businessConfig.hours.display} · {businessConfig.hours.days} · Same-day available</p>
      </section>

      {/* ── Footer ── */}
      <div className="bg-charcoal py-6 px-4 text-center border-t border-white/10">
        <Image
          src="/images/aurea-essence-logo.png"
          width={2000}
          height={500}
          alt="Áurea Essence Massage"
          className="w-32 h-auto mx-auto mb-3 opacity-60"
        />
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Áurea Essence Massage · South Florida · All rights reserved
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <Link href="/" className="text-white/30 hover:text-white/60 text-xs transition-colors">Main Site</Link>
          <Link href="/contact" className="text-white/30 hover:text-white/60 text-xs transition-colors">Full Booking Form</Link>
        </div>
      </div>

    </div>
  );
}
