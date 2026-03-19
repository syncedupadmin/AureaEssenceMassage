import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { businessConfig, hasContactInfo, getPhoneHref } from '@/config/business';

export const metadata: Metadata = {
  title: 'Book Your Session | Áurea Essence Massage',
  description: 'Book your mobile massage session. We bring luxury spa treatments to your location.',
  keywords: 'book mobile massage, schedule massage, mobile massage booking, Áurea Essence',
};

const { bookingPolicy } = businessConfig;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far in advance should I book?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `We recommend booking at least ${bookingPolicy.advanceNotice} in advance for optimal availability. ${bookingPolicy.sameDayAvailable ? 'Same-day appointments may be available—contact us to check!' : ''}`
      }
    },
    {
      "@type": "Question",
      "name": "What do I need to prepare at home?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nothing! We bring everything: massage table, linens, oils, music, and all equipment. Just provide a quiet space approximately 8x10 feet."
      }
    },
    {
      "@type": "Question",
      "name": "Do you travel to hotels and offices?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely! We serve homes, hotels, resorts, offices, and special event venues."
      }
    }
  ]
};

const included = [
  'Professional massage table & heated pad',
  'Premium linens & bolsters',
  'Luxury aromatherapy oils',
  'Ambient music & atmosphere',
  'Licensed & insured therapist',
  'Complimentary session consultation',
];

const quickInfo = [
  { label: 'Confirmation', value: 'Within 24 hours' },
  { label: 'Cancellation', value: `${bookingPolicy.cancellationNotice} notice` },
  { label: 'Payment', value: 'At time of service' },
  { label: 'Hours', value: `${businessConfig.hours.display}, ${businessConfig.hours.days}` },
];

export default function ContactPage() {
  const { contact, serviceArea } = businessConfig;
  const showPhone = hasContactInfo() && !!contact.phone;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero: Dark Luxury ── */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 bg-charcoal overflow-hidden">
        {/* Subtle ambient glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 25% 60%, rgba(30, 107, 74, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 75% 30%, rgba(201, 169, 110, 0.10) 0%, transparent 50%)',
          }}
        />
        {/* Decorative corner lines */}
        <div className="absolute top-24 left-8 w-16 h-16 border-l border-t border-gold-500/20" />
        <div className="absolute top-24 right-8 w-16 h-16 border-r border-t border-gold-500/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <span className="text-gold-400 text-xs tracking-luxury uppercase">Private Wellness Session</span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-champagne mt-4 mb-6 tracking-wide">
            Reserve Your
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-gold-500 to-emerald-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>

          <p className="text-champagne/60 text-base sm:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            We bring the five-star spa to your door. Fill out the form and we&apos;ll confirm within 24 hours.
          </p>

          {/* Trust indicators */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-champagne/50 text-xs tracking-wide">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Licensed &amp; Insured
            </div>
            <span className="text-gold-500/60">·</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              5-Star Rated
            </div>
            <span className="text-gold-500/60">·</span>
            <span>{serviceArea.primary}</span>
          </div>
        </div>
      </section>

      {/* ── Form + Sidebar ── */}
      <section className="py-16 sm:py-20 md:py-28 bg-champagne-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* ── Main Form (3/5) ── */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* ── Sidebar (2/5) ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Everything Included */}
              <div className="bg-charcoal rounded-sm p-6 sm:p-8">
                <div className="w-8 h-0.5 bg-gold-500 mb-5" />
                <h3 className="text-lg font-serif font-medium text-champagne mb-1 tracking-wide">
                  Everything Included
                </h3>
                <p className="text-champagne/40 text-xs mb-5">No setup required on your end</p>
                <ul className="space-y-3">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-champagne/70 text-sm">
                      <svg className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="bg-white rounded-sm p-6 shadow-soft border-l-4 border-gold-400">
                <div className="flex text-gold-400 mb-3">
                  {'★★★★★'.split('').map((s, i) => <span key={i} className="text-sm">{s}</span>)}
                </div>
                <p className="text-charcoal/70 text-sm italic leading-relaxed mb-4">
                  &ldquo;Absolutely incredible experience. The therapist arrived right on time, set up beautifully, and the massage itself was world-class. Worth every penny.&rdquo;
                </p>
                <p className="text-charcoal/40 text-xs font-medium tracking-wide uppercase">— Maria G., Miami</p>
              </div>

              {/* Quick Info */}
              <div className="bg-white rounded-sm p-6 shadow-soft">
                <h3 className="text-xs font-semibold text-charcoal/60 uppercase tracking-luxury mb-4">
                  Good to Know
                </h3>
                <div className="space-y-3">
                  {quickInfo.map((item, i) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal/50 text-xs">{item.label}</span>
                        <span className="text-charcoal text-xs font-medium">{item.value}</span>
                      </div>
                      {i < quickInfo.length - 1 && <div className="h-px bg-champagne-200 mt-3" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone CTA */}
              {showPhone && (
                <div className="bg-emerald-500 rounded-sm p-6 text-center">
                  <p className="text-white/70 text-xs tracking-wide uppercase mb-2">Prefer to Call?</p>
                  <a
                    href={getPhoneHref(contact.phone!)}
                    className="text-white text-lg font-medium hover:text-champagne transition-colors"
                  >
                    {contact.phone}
                  </a>
                  <p className="text-white/60 text-xs mt-2">{businessConfig.hours.display}, {businessConfig.hours.days}</p>
                </div>
              )}

              {/* Instagram */}
              {businessConfig.social.instagram && (
                <a
                  href={businessConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white rounded-sm p-5 shadow-soft hover:shadow-elegant transition-shadow group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-rose-500 to-amber-400 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-charcoal/40 uppercase tracking-wide">Follow Us</p>
                    <p className="text-sm font-medium text-charcoal group-hover:text-emerald-500 transition-colors">@aureaessencemassage</p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── What Happens Next ── */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              What Happens Next
            </h2>
            <p className="text-base text-charcoal/60">Your path to relaxation in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: 1,
                title: 'We Confirm',
                body: "You'll receive confirmation within 24 hours with your appointment details and everything you need to know.",
              },
              {
                step: 2,
                title: 'We Arrive',
                body: 'Your therapist arrives with a full luxury setup—table, linens, premium oils, and ambient music.',
              },
              {
                step: 3,
                title: 'You Relax',
                body: 'Enjoy your treatment and continue relaxing in your own space long after we leave.',
              },
            ].map(({ step, title, body }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-2xl font-serif ring-2 ring-gold-400 ring-offset-4 ring-offset-champagne-200">
                  {step}
                </div>
                <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">{title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Common Questions
            </h2>
            <p className="text-base text-charcoal/60">Quick answers before you book</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How far in advance should I book?',
                a: `We recommend at least ${bookingPolicy.advanceNotice} in advance.${bookingPolicy.sameDayAvailable ? ' Same-day appointments may be available — contact us to check!' : ''}`,
              },
              {
                q: 'What do I need to prepare?',
                a: 'Nothing at all. We bring everything: massage table, linens, oils, music, and equipment. Just have a quiet space of approximately 8×10 feet ready.',
              },
              {
                q: 'Do you travel to hotels and offices?',
                a: `Absolutely. We serve private residences, hotels, resorts, offices, and event venues throughout ${serviceArea.primary}.`,
              },
              {
                q: "What's your cancellation policy?",
                a: `We require ${bookingPolicy.cancellationNotice} notice for cancellations or rescheduling. Late cancellations may incur a fee of up to ${bookingPolicy.cancellationFee} of the service cost.`,
              },
              {
                q: 'How do I pay?',
                a: `We accept ${businessConfig.paymentMethods.join(', ')}. Payment is collected at the time of service.`,
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white rounded-sm shadow-soft p-6 sm:p-8 border-l-2 border-transparent hover:border-gold-400 transition-all duration-200">
                <h3 className="text-base font-medium text-charcoal mb-2 tracking-wide">{q}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-16 sm:py-20 md:py-24 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-champagne mb-6 tracking-wide">
            We Come to You
          </h2>
          <p className="text-base sm:text-lg text-champagne/60 mb-4 max-w-lg mx-auto">
            Proudly serving {serviceArea.primary} and surrounding regions
          </p>
          {serviceArea.expandable && (
            <p className="text-champagne/40 text-sm mb-10">
              Don&apos;t see your area? Contact us — we often accommodate special requests.
            </p>
          )}
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-gold-500 text-charcoal text-sm font-medium tracking-wide rounded-sm hover:bg-gold-400 transition-all shadow-gold hover:shadow-elegant"
          >
            Book Your Session
          </a>
        </div>
      </section>
    </>
  );
}
