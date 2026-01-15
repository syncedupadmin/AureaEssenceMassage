import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import { businessConfig, hasContactInfo, getPhoneHref, getEmailHref } from '@/config/business';

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

export default function ContactPage() {
  const { contact, serviceArea } = businessConfig;
  const showContactInfo = hasContactInfo();

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
            Request your appointment and we&apos;ll confirm within 24 hours
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

      {/* What Happens Next Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                What Happens Next
              </h2>
              <p className="text-base text-charcoal/60">
                Your path to relaxation in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-serif">
                  1
                </div>
                <h3 className="text-xl font-serif font-medium text-charcoal mb-3">
                  We Confirm
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  You&apos;ll receive confirmation within 24 hours with your appointment details.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-serif">
                  2
                </div>
                <h3 className="text-xl font-serif font-medium text-charcoal mb-3">
                  We Arrive
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  Your therapist arrives with everything needed—table, linens, premium products.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-serif">
                  3
                </div>
                <h3 className="text-xl font-serif font-medium text-charcoal mb-3">
                  You Relax
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  Enjoy your treatment and continue relaxing in your own space afterward.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info - Only show if we have real contact info */}
      {showContactInfo && (
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
                {contact.phone && (
                  <div className="text-center bg-white rounded-sm shadow-soft p-6 sm:p-8">
                    <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-charcoal mb-2 tracking-wide">Phone</h3>
                    <a
                      href={getPhoneHref(contact.phone)}
                      className="text-rose-500 hover:text-rose-600 text-base font-medium"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}

                {contact.email && (
                  <div className="text-center bg-white rounded-sm shadow-soft p-6 sm:p-8">
                    <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-charcoal mb-2 tracking-wide">Email</h3>
                    <a
                      href={getEmailHref(contact.email)}
                      className="text-rose-500 hover:text-rose-600 text-sm sm:text-base font-medium break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                {contact.textNumber && (
                  <div className="text-center bg-white rounded-sm shadow-soft p-6 sm:p-8">
                    <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-charcoal mb-2 tracking-wide">Text</h3>
                    <a
                      href={`sms:${contact.textNumber.replace(/[^0-9+]/g, '')}`}
                      className="text-rose-500 hover:text-rose-600 text-base font-medium"
                    >
                      {contact.textNumber}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

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
                  We recommend booking at least {bookingPolicy.advanceNotice} in advance for optimal availability. {bookingPolicy.sameDayAvailable && 'Same-day appointments may be available—contact us to check!'}
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
                  Absolutely! We serve homes, hotels, resorts, offices, and special event venues throughout {serviceArea.primary}.
                </p>
              </div>

              <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-medium text-charcoal mb-2">
                  What&apos;s your cancellation policy?
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  We require {bookingPolicy.cancellationNotice} notice for cancellations or rescheduling. Late cancellations may incur a fee of up to {bookingPolicy.cancellationFee} of the service cost.
                </p>
              </div>

              <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8">
                <h3 className="text-base sm:text-lg font-medium text-charcoal mb-2">
                  How do I pay?
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  We accept {businessConfig.paymentMethods.join(', ')}. Payment is collected at the time of service.
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
            Proudly serving {serviceArea.primary} and surrounding regions
          </p>
          {serviceArea.expandable && (
            <p className="text-white/70 text-sm">
              Don&apos;t see your location? Contact us—we often accommodate special requests!
            </p>
          )}
        </div>
      </section>
    </>
  );
}
