import type { Metadata } from 'next';
import BookingCalendar from '@/components/BookingCalendar';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Book Your Session | Áurea Essence Massage',
  description: 'Book your mobile massage session. Same-day availability. We bring luxury spa treatments to your location.',
  keywords: 'book mobile massage, schedule massage, mobile massage booking, Áurea Essence',
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far in advance should I book?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking at least 48 hours in advance for optimal availability. Same-day appointments may be available—call us to check!"
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

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Book Your Session
          </h1>
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            Select your service and preferred time
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Direct Booking
            </h2>
            <p className="text-base text-charcoal/60">
              Schedule your appointment online
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <BookingCalendar />
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Get in Touch
              </h2>
              <p className="text-base text-charcoal/60">
                Questions about our services?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Phone */}
              <div className="text-center bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2 tracking-wide">Phone</h3>
                <span className="text-charcoal/60 text-sm">[[Client to confirm]]</span>
              </div>

              {/* Email */}
              <div className="text-center bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2 tracking-wide">Email</h3>
                <span className="text-charcoal/60 text-sm">[[Client to confirm]]</span>
              </div>

              {/* Text */}
              <div className="text-center bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-charcoal mb-2 tracking-wide">Text</h3>
                <span className="text-charcoal/60 text-sm">[[Client to confirm]]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Common Questions
              </h2>
              <p className="text-base text-charcoal/60">
                Quick answers to help you book
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-medium text-charcoal mb-2">
                  How far in advance should I book?
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  We recommend booking at least 48 hours in advance for optimal availability. Same-day appointments may be available—contact us to check!
                </p>
              </div>

              <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-medium text-charcoal mb-2">
                  What do I need to prepare at home?
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  Nothing! We bring everything: massage table, linens, oils, music, and all equipment. Just provide a quiet space approximately 8x10 feet.
                </p>
              </div>

              <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-medium text-charcoal mb-2">
                  Do you travel to hotels and offices?
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  Absolutely! We serve homes, hotels, resorts, offices, and special event venues.
                </p>
              </div>

              <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-medium text-charcoal mb-2">
                  What&apos;s your cancellation policy?
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  We require 24 hours notice for cancellations or rescheduling. Late cancellations may incur a fee.
                </p>
              </div>

              <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-medium text-charcoal mb-2">
                  How do I pay?
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  We accept all major credit cards, cash, Venmo, and Zelle. Payment is collected at the time of service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-wide">
            We Come to You
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-6 max-w-lg mx-auto">
            Proudly serving South Florida and surrounding regions
          </p>
          <p className="text-white/70 text-sm">
            Don&apos;t see your location? Contact us—we often accommodate special requests!
          </p>
        </div>
      </section>
    </>
  );
}
