import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Spa Package Deals & Couples Massage | Destiny Eden FL',
  description: 'Curated massage packages for executives, couples & athletes. Monthly memberships with priority booking. South Florida\'s premier mobile spa experience.',
  keywords: 'luxury massage packages, couples massage South Florida, executive massage packages, athlete recovery massage, mobile spa membership',
};

export default function PackagesPage() {
  const packages = [
    {
      name: 'Executive Stress Relief',
      tagline: 'Escape the Boardroom',
      duration: '90 minutes',
      price: 'Premium Package',
      description: 'Designed for busy professionals who need deep relaxation and mental clarity. This intensive package melts away tension from long hours and high-stress environments.',
      includes: [
        'Deep tissue massage (60 min)',
        'Aromatherapy with stress-relief blend',
        'Hot towel treatment',
        'Scalp and neck focus (30 min)',
        'Premium CBD oil upgrade',
      ],
      idealFor: 'Executives, entrepreneurs, and busy professionals',
      imageSrc: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      imageAlt: 'Executive stress relief massage',
      accentColor: 'gold',
    },
    {
      name: 'Couples Retreat',
      tagline: 'Romance & Relaxation',
      duration: '180 minutes total (90 min per person)',
      price: 'Romantic Package',
      description: 'An unforgettable shared spa experience in the intimacy of your home or hotel. One skilled therapist provides consecutive massage sessions for both partners, creating a romantic journey of relaxation.',
      includes: [
        'Back-to-back Swedish or deep tissue massage (90 min each)',
        'Rose petal aromatherapy',
        'Champagne and chocolate pairing',
        'Candlelit ambiance setup',
        'Complimentary luxury gift',
      ],
      idealFor: 'Couples, anniversaries, special celebrations',
      imageSrc: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      imageAlt: 'Back-to-back couples massage retreat',
      accentColor: 'terracotta',
    },
    {
      name: 'Athlete Recovery',
      tagline: 'Performance & Restoration',
      duration: '75 minutes',
      price: 'Performance Package',
      description: 'Sport-specific therapy designed to enhance performance, prevent injury, and accelerate recovery. Perfect for athletes at all levels.',
      includes: [
        'Sports massage with targeted muscle work',
        'Dynamic stretching session',
        'CBD muscle recovery treatment',
        'Percussion therapy',
        'Customized recovery plan',
      ],
      idealFor: 'Athletes, fitness enthusiasts, active individuals',
      imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      imageAlt: 'Athlete recovery massage',
      accentColor: 'gold',
    },
    {
      name: 'Ultimate Indulgence',
      tagline: 'Pure Luxury',
      duration: '120 minutes',
      price: 'Signature Package',
      description: 'Our most comprehensive treatment—a full two hours of blissful luxury. This is the pinnacle of at-home spa experiences.',
      includes: [
        'Full body Swedish massage (60 min)',
        'Hot stone therapy (30 min)',
        'Aromatherapy facial massage',
        'Hand and foot reflexology (30 min)',
        'Premium organic oils and products',
      ],
      idealFor: 'Special occasions, ultimate relaxation seekers',
      imageSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      imageAlt: 'Ultimate indulgence spa package',
      accentColor: 'terracotta',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 bg-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-serif font-light text-cream mb-8 tracking-wide">
              Curated Packages
            </h1>
            <p className="text-base text-cream/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              Complete experiences designed for relaxation, recovery, and special occasions
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-32 bg-charcoal">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-black-light border-l-2 border-gold-300/30 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={pkg.imageSrc}
                    alt={pkg.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="px-3 py-1 bg-gold-300/10 border-l-2 border-gold-300 text-gold-300 text-xs font-medium tracking-wide mb-3 inline-block">
                      {pkg.duration}
                    </div>
                    <h2 className="text-3xl font-serif font-light text-cream tracking-wide">
                      {pkg.name}
                    </h2>
                    <p className="text-gold-300 font-medium text-sm mt-1">
                      {pkg.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-10">
                  <p className="text-cream/80 mb-8 leading-relaxed text-sm">
                    {pkg.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xs font-medium text-gold-300 mb-4 tracking-wide uppercase">
                      Includes
                    </h3>
                    <ul className="space-y-3">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-gold-300 mr-3 flex-shrink-0 mt-0.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-cream/70 text-xs">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-8 p-5 bg-charcoal border-l-2 border-gold-300/30">
                    <p className="text-xs text-gold-300 mb-2 tracking-wide uppercase">Ideal For</p>
                    <p className="text-cream text-sm">{pkg.idealFor}</p>
                  </div>

                  <CTAButton
                    href="/contact"
                    variant="secondary"
                    className="w-full"
                  >
                    Reserve
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Packages Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-light text-cream mb-8 tracking-wide">
              Custom Experiences
            </h2>
            <p className="text-base text-cream/70 mb-12 leading-relaxed max-w-2xl mx-auto">
              Tailored treatments for special events and celebrations
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-charcoal border-l-2 border-gold-300/30 p-8">
                <h3 className="font-medium text-cream mb-3 text-sm tracking-wide">Corporate</h3>
                <p className="text-xs text-cream/70">
                  Team wellness and on-site sessions
                </p>
              </div>
              <div className="bg-charcoal border-l-2 border-gold-300/30 p-8">
                <h3 className="font-medium text-cream mb-3 text-sm tracking-wide">Weddings</h3>
                <p className="text-xs text-cream/70">
                  Bridal party relaxation
                </p>
              </div>
              <div className="bg-charcoal border-l-2 border-gold-300/30 p-8">
                <h3 className="font-medium text-cream mb-3 text-sm tracking-wide">Celebrations</h3>
                <p className="text-xs text-cream/70">
                  Birthdays and special occasions
                </p>
              </div>
            </div>
            <CTAButton href="/contact" variant="primary">
              Inquire
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section className="py-32 bg-charcoal">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-light text-cream mb-8 tracking-wide">
              Monthly Membership
            </h2>
            <p className="text-base text-cream/70 mb-12 max-w-lg mx-auto">
              Make wellness a regular practice
            </p>
            <div className="bg-black border-l-2 border-gold-300/30 p-10 mb-12">
              <ul className="space-y-4 text-left max-w-md mx-auto">
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-gold-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-cream/80 text-sm">Priority booking</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-gold-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-cream/80 text-sm">Member pricing (up to 20% savings)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-gold-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-cream/80 text-sm">Complimentary upgrades</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-gold-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-cream/80 text-sm">Flexible session rollover</span>
                </li>
              </ul>
            </div>
            <CTAButton
              href="/contact"
              variant="secondary"
            >
              Learn More
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-4xl font-serif font-light text-cream mb-8 tracking-wide">
            Reserve Your Package
          </h2>
          <p className="text-base text-cream/70 mb-12 max-w-lg mx-auto">
            South Florida's preferred mobile spa
          </p>
          <CTAButton href="/contact" variant="primary">
            Book Now
          </CTAButton>
        </div>
      </section>
    </>
  );
}
