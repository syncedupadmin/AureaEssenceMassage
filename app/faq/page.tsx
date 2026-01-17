import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'FAQ | Áurea Essence Massage - Your Questions Answered',
  description: 'Find answers to frequently asked questions about mobile massage services, booking, cancellation policy, service areas, and more.',
  keywords: 'mobile massage FAQ, massage questions, booking information, cancellation policy, South Florida massage',
};

const faqItems = [
  {
    question: 'How does mobile massage work?',
    answer: 'I bring everything needed directly to your location – professional massage table, fresh linens, premium products, and relaxing ambiance. You simply choose a quiet space, and I handle the rest. The experience is identical to a five-star spa, just in your preferred setting.',
  },
  {
    question: 'What do I need to provide?',
    answer: 'Just a room with enough space for a massage table (approximately 7\' x 3\') and a comfortable temperature. Everything else is taken care of – table, linens, oils, and music. I arrive fully prepared to transform your space into a private spa.',
  },
  {
    question: 'How far in advance should I book?',
    answer: 'I recommend booking at least 48-72 hours in advance to secure your preferred time. Last-minute availability may be possible – feel free to reach out via text or WhatsApp to check same-day openings.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'I proudly serve Miami-Dade, Broward, and Palm Beach counties, including private residences, hotels, yachts, and event venues. For locations outside these areas, please contact me to discuss arrangements.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 24+ hours in advance receive a full refund. Cancellations within 24 hours are subject to a 50% fee. No-shows are charged in full. I understand that life happens – please communicate as early as possible if your plans change.',
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Absolutely. I am a fully licensed massage therapist in the state of Florida with comprehensive liability insurance for your complete peace of mind. Your safety and well-being are my top priorities.',
  },
  {
    question: 'What forms of payment do you accept?',
    answer: 'I accept all major credit cards, Zelle, Venmo, and cash. Payment is collected at the end of your session. Gratuity is always appreciated but never expected.',
  },
  {
    question: 'Can I book for multiple people?',
    answer: 'Yes! I offer couples massage and can coordinate additional therapists for group events, bridal parties, and corporate wellness days. Contact me to discuss custom arrangements for your group.',
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Gold decorative element */}
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Questions & Answers
          </h1>
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about your luxury mobile massage experience
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 sm:py-20 bg-champagne-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-4 tracking-wide">
            Still Have Questions?
          </h2>
          <p className="text-charcoal/60 mb-8 max-w-lg mx-auto">
            I&apos;m here to help. Reach out directly and I&apos;ll be happy to assist.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/contact" variant="primary">
              Contact Me
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
