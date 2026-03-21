import type { Metadata } from 'next';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import { getLocationBySlug } from '@/lib/seo-locations';
import { businessConfig } from '@/config/business';

const location = getLocationBySlug('mobile-massage-coral-gables')!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
  alternates: {
    canonical: `https://aureaessencemassage.com/${location.slug}`,
  },
  openGraph: {
    title: `${location.metaTitle} | Áurea Essence Massage`,
    description: location.metaDescription,
    url: `https://aureaessencemassage.com/${location.slug}`,
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Áurea Essence Massage",
  "url": "https://aureaessencemassage.com",
  "telephone": "+13055194034",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Coral Gables",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Coral Gables" },
    { "@type": "City", "name": "South Miami" },
    { "@type": "City", "name": "Coconut Grove" },
    { "@type": "City", "name": "Pinecrest" },
    { "@type": "City", "name": "Kendall" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "08:00",
      "closes": "23:00"
    }
  ],
  "paymentAccepted": "Credit Card, Cash, Venmo, Zelle",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aureaessencemassage.com" },
    { "@type": "ListItem", "position": 2, "name": "Mobile Massage Coral Gables", "item": `https://aureaessencemassage.com/${location.slug}` },
  ],
};

export default function CoralGablesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,107,74,0.12)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <p className="text-gold-400 text-xs font-medium tracking-luxury uppercase mb-4">
            Coral Gables, FL · Mobile Massage
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-champagne mb-6 tracking-wide">
            Mobile Massage Therapy<br />
            <span className="text-emerald-400">in Coral Gables</span>
          </h1>
          <p className="text-base sm:text-lg text-champagne/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            {location.intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/contact" variant="gold">Book a Session</CTAButton>
            <CTAButton href="/services" variant="outline-light">View Services</CTAButton>
          </div>
          <p className="mt-6 text-champagne/40 text-sm">Available daily, 8am – 11pm · {businessConfig.contact.phone}</p>
        </div>
      </section>

      {/* Local Context */}
      <section className="py-16 sm:py-20 bg-champagne-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Mobile Massage Therapy in the City Beautiful
          </h2>
          <p className="text-charcoal/70 leading-relaxed mb-6">{location.localContext}</p>
          <p className="text-charcoal/70 leading-relaxed">{location.uniqueAngle}</p>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 sm:py-20 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-4 tracking-wide">
            Neighborhoods We Serve
          </h2>
          <p className="text-charcoal/60 mb-8">Coral Gables and the surrounding South Miami communities.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[...location.neighborhoods, ...location.nearbyAreas].map((area) => (
              <div key={area} className="flex items-center gap-2 text-charcoal/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20 bg-champagne-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-10 tracking-wide">
            Popular Services in Coral Gables
          </h2>
          <div className="space-y-6">
            {location.services.map((service) => (
              <div key={service.name} className="bg-white p-6 border-l-2 border-gold-400 shadow-soft">
                <h3 className="text-lg font-serif font-medium text-charcoal mb-2">{service.name}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{service.localNote}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CTAButton href="/services" variant="outline">View All Services</CTAButton>
          </div>
        </div>
      </section>

      {/* Venue Types */}
      <section className="py-16 sm:py-20 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-8 tracking-wide">
            We Come to You — Anywhere in Coral Gables
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {location.venueTypes.map((venue) => (
              <div key={venue} className="flex items-center gap-3 text-charcoal/70">
                <svg className="w-4 h-4 text-gold-500 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">{venue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-champagne-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-0.5 bg-gold-500 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-10 tracking-wide">
            Common Questions — Coral Gables Clients
          </h2>
          <div className="space-y-8">
            {[
              {
                q: 'Do you serve Biltmore Hotel guests in Coral Gables?',
                a: 'Yes — we are happy to serve guests at the Biltmore Hotel and other Coral Gables-area hotels and properties. We work within your room or suite.',
              },
              {
                q: 'Do you cover South Miami and Coconut Grove as well?',
                a: 'Absolutely. We serve the broader South Miami area including Coconut Grove, Pinecrest, Westchester, and Kendall in addition to Coral Gables.',
              },
              {
                q: 'Can you come to my home office in Coral Gables during the workday?',
                a: 'Yes — midday sessions are available and popular with Coral Gables professionals and remote workers. We work around your schedule.',
              },
              {
                q: 'What massage services do you offer in Coral Gables?',
                a: 'Swedish, deep tissue, couples massage, prenatal, post-surgical, lymphatic drainage, and reflexology — all available throughout Coral Gables and surrounding communities.',
              },
            ].map(({ q, a }) => (
              <div key={q}>
                <h3 className="text-base font-medium text-charcoal mb-2">{q}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-charcoal">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-champagne mb-4 tracking-wide">
            Book Mobile Massage in Coral Gables
          </h2>
          <p className="text-champagne/60 mb-8">Available daily, 8am – 11pm · Coral Gables & South Miami</p>
          <CTAButton href="/contact" variant="gold">Book Your Session</CTAButton>
          <p className="mt-6 text-champagne/30 text-sm">
            Questions? <Link href="/faq" className="text-gold-400 hover:text-gold-300 underline">Read our FAQ</Link> or text us at {businessConfig.contact.phone}
          </p>
        </div>
      </section>
    </>
  );
}
