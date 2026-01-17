import type { Metadata } from 'next';
import CTAButton from '@/components/CTAButton';
import { businessConfig } from '@/config/business';

export const metadata: Metadata = {
  title: 'Gift Cards | Áurea Essence Massage - Give the Gift of Luxury Wellness',
  description: 'Give an unforgettable wellness experience. Digital gift certificates for mobile massage therapy, perfect for any occasion.',
  keywords: 'massage gift card, spa gift certificate, wellness gift, luxury gift, South Florida massage gift',
};

export default function GiftCardsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Gold decorative element */}
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            The Gift of Relaxation
          </h1>
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            Give an unforgettable wellness experience to someone special
          </p>
        </div>
      </section>

      {/* Gift Card Visual Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Gift Card Mockup */}
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto max-w-md">
                {/* Card */}
                <div className="bg-gradient-to-br from-charcoal via-charcoal-400 to-charcoal rounded-lg p-8 sm:p-10 shadow-dark aspect-[1.6/1] flex flex-col justify-between border border-gold-500/30">
                  {/* Top - Logo area */}
                  <div>
                    <div className="w-16 h-0.5 bg-gold-500 mb-3" />
                    <p className="text-champagne font-serif text-xl tracking-wide">
                      {businessConfig.name}
                    </p>
                  </div>

                  {/* Center */}
                  <div className="text-center">
                    <p className="text-gold-400 text-xs tracking-[0.2em] uppercase mb-2">
                      Gift Certificate
                    </p>
                    <p className="text-champagne font-serif text-3xl sm:text-4xl">
                      Luxury Wellness
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex justify-between items-end">
                    <p className="text-champagne/50 text-xs">
                      Redeemable for any service
                    </p>
                    <div className="w-12 h-12 rounded-full border border-gold-500/50 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-gold-500/20" />
                    </div>
                  </div>
                </div>

                {/* Decorative shadow */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-charcoal/20 blur-xl rounded-full" />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-6 tracking-wide">
                The Perfect Gift for Any Occasion
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'Birthdays & Anniversaries',
                  'Holidays & Celebrations',
                  'Thank You & Appreciation',
                  'Self-Care Reminder',
                  'Just Because',
                ].map((occasion) => (
                  <li key={occasion} className="flex items-center text-charcoal/70">
                    <svg
                      className="w-5 h-5 text-gold-500 mr-3 flex-shrink-0"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {occasion}
                  </li>
                ))}
              </ul>
              <div className="space-y-3 text-sm text-charcoal/60 mb-8">
                <p>
                  <strong className="text-charcoal">Available in any amount</strong> or for a specific service
                </p>
                <p>
                  <strong className="text-charcoal">Delivered digitally</strong> – instant or scheduled delivery
                </p>
                <p>
                  <strong className="text-charcoal">Never expires</strong> – use whenever they&apos;re ready
                </p>
              </div>
              <CTAButton href="/contact" variant="primary">
                Purchase a Gift Card
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-champagne-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Choose Amount',
                description: 'Select a dollar amount or specific service',
              },
              {
                step: '2',
                title: 'Personalize',
                description: 'Add a personal message and recipient details',
              },
              {
                step: '3',
                title: 'Send Instantly',
                description: 'Delivered by email immediately or on a chosen date',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-serif ring-2 ring-gold-400 ring-offset-4 ring-offset-champagne-200">
                  {item.step}
                </div>
                <h3 className="text-lg font-serif font-medium text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-6 tracking-wide">
            Give the Gift of Wellness
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto">
            A thoughtful gift they&apos;ll truly appreciate
          </p>
          <CTAButton href="/contact" variant="white">
            Get Started
          </CTAButton>
        </div>
      </section>
    </>
  );
}
