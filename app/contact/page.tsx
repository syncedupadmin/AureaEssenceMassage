import type { Metadata } from 'next';
import BookingCalendar from '@/components/BookingCalendar';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Book Mobile Massage - Same Day Available | (561) 555-1234',
  description: 'Book your mobile massage in 60 seconds. Call (561) 555-1234 or text for same-day availability. Serving Delray Beach to Miami daily 8am-10pm.',
  keywords: 'book mobile massage, same day massage South Florida, schedule massage Miami, mobile massage booking',
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
        "text": "Absolutely! We serve homes, hotels, resorts, offices, and special event venues throughout South Florida."
      }
    },
    {
      "@type": "Question",
      "name": "What's your cancellation policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We require 24 hours notice for cancellations or rescheduling. Late cancellations may incur a fee."
      }
    },
    {
      "@type": "Question",
      "name": "How do I pay?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We accept all major credit cards, cash, Venmo, and Zelle. Payment is collected at the time of service."
      }
    },
    {
      "@type": "Question",
      "name": "Are gratuities included?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gratuities are not included but always appreciated for exceptional service. Most clients tip 15-20%."
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
      <section className="relative pt-40 pb-20 bg-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-serif font-light text-cream mb-8 tracking-wide">
              Schedule Your Session
            </h1>
            <p className="text-base text-cream/70 leading-relaxed mb-4 max-w-2xl mx-auto">
              Select your service and preferred time
            </p>
            <p className="text-sm text-gold-300 tracking-wide">
              Delray Beach to Miami
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-light text-cream mb-6 tracking-wide">
              Direct Booking
            </h2>
            <p className="text-base text-cream/70">
              Schedule your appointment online
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <BookingCalendar />
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-32 bg-charcoal">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-light text-cream mb-6 tracking-wide">
                Get in Touch
              </h2>
              <p className="text-base text-cream/70">
                Questions about our services?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Phone */}
              <div className="text-center bg-black border-l-2 border-gold-300/30 p-10">
                <div className="w-12 h-12 mx-auto mb-6 text-gold-300">
                  <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-cream mb-3 tracking-wide">Phone</h3>
                <a
                  href="tel:+15615551234"
                  className="text-gold-300 hover:text-gold-400 text-base"
                >
                  (561) 555-1234
                </a>
                <p className="text-xs text-cream/60 mt-3">8am-10pm Daily</p>
              </div>

              {/* Email */}
              <div className="text-center bg-black border-l-2 border-gold-300/30 p-10">
                <div className="w-12 h-12 mx-auto mb-6 text-gold-300">
                  <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-cream mb-3 tracking-wide">Email</h3>
                <a
                  href="mailto:info@destinyedenmobilemassage.com"
                  className="text-gold-300 hover:text-gold-400 text-base break-all"
                >
                  info@destinyedenmobilemassage.com
                </a>
                <p className="text-xs text-cream/60 mt-3">Response within 2 hours</p>
              </div>

              {/* Text */}
              <div className="text-center bg-black border-l-2 border-gold-300/30 p-10">
                <div className="w-12 h-12 mx-auto mb-6 text-gold-300">
                  <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-cream mb-3 tracking-wide">Text</h3>
                <a
                  href="sms:+15615551234"
                  className="text-gold-300 hover:text-gold-400 text-base"
                >
                  (561) 555-1234
                </a>
                <p className="text-xs text-cream/60 mt-3">Quick Replies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-white mb-4">
                Booking Questions?
              </h2>
              <p className="text-lg text-gold-200">
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-black-light border border-gold-500/20 p-6 rounded-lg shadow-lg shadow-gold-500/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  How far in advance should I book?
                </h3>
                <p className="text-gold-200">
                  We recommend booking at least 48 hours in advance for optimal availability. Same-day appointments may be available—call us to check!
                </p>
              </div>

              <div className="bg-black-light border border-gold-500/20 p-6 rounded-lg shadow-lg shadow-gold-500/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  What do I need to prepare at home?
                </h3>
                <p className="text-gold-200">
                  Nothing! We bring everything: massage table, linens, oils, music, and all equipment. Just provide a quiet space approximately 8x10 feet.
                </p>
              </div>

              <div className="bg-black-light border border-gold-500/20 p-6 rounded-lg shadow-lg shadow-gold-500/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Do you travel to hotels and offices?
                </h3>
                <p className="text-gold-200">
                  Absolutely! We serve homes, hotels, resorts, offices, and special event venues throughout South Florida.
                </p>
              </div>

              <div className="bg-black-light border border-gold-500/20 p-6 rounded-lg shadow-lg shadow-gold-500/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  What's your cancellation policy?
                </h3>
                <p className="text-gold-200">
                  We require 24 hours notice for cancellations or rescheduling. Late cancellations may incur a fee.
                </p>
              </div>

              <div className="bg-black-light border border-gold-500/20 p-6 rounded-lg shadow-lg shadow-gold-500/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  How do I pay?
                </h3>
                <p className="text-gold-200">
                  We accept all major credit cards, cash, Venmo, and Zelle. Payment is collected at the time of service.
                </p>
              </div>

              <div className="bg-black-light border border-gold-500/20 p-6 rounded-lg shadow-lg shadow-gold-500/10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Are gratuities included?
                </h3>
                <p className="text-gold-200">
                  Gratuities are not included but always appreciated for exceptional service. Most clients tip 15-20%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map Section */}
      <section className="py-16 bg-gold-gradient text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              We Come to You
            </h2>
            <p className="text-xl mb-8">
              Proudly serving the entire South Florida region
            </p>
            <div className="bg-black/10 backdrop-blur-sm rounded-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg font-medium">
                <div className="py-2">Delray Beach</div>
                <div className="py-2">Boca Raton</div>
                <div className="py-2">Pompano Beach</div>
                <div className="py-2">Fort Lauderdale</div>
                <div className="py-2">Hollywood</div>
                <div className="py-2">Aventura</div>
                <div className="py-2">Miami Beach</div>
                <div className="py-2">Coral Gables</div>
                <div className="py-2">Coconut Grove</div>
                <div className="py-2">Sunny Isles</div>
                <div className="py-2">Deerfield Beach</div>
                <div className="py-2">Downtown Miami</div>
              </div>
            </div>
            <p className="mt-6 text-lg">
              Don't see your location? Contact us—we often accommodate special requests!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
