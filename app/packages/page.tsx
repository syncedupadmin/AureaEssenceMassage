import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import { businessConfig } from '@/config/business';

export const metadata: Metadata = {
  title: 'Packages | Áurea Essence Massage',
  description: 'Curated massage packages for relaxation, recovery, and special occasions. Premium mobile spa experiences.',
  keywords: 'massage packages, couples massage package, executive massage, mobile spa packages',
};

export default function PackagesPage() {
  const { packageInclusions } = businessConfig.features;

  const packages = [
    {
      name: 'Executive Relief',
      tagline: 'For Busy Professionals',
      duration: '90 minutes',
      description: 'Designed for busy professionals who need deep relaxation and mental clarity. Intensive therapy for relief from desk work and long hours.',
      includes: [
        'Deep tissue massage',
        'Aromatherapy blend',
        'Hot towel treatment',
        'Scalp and neck focus',
        ...(packageInclusions.premiumProductUpgrade ? ['Premium product selection'] : []),
      ],
      idealFor: 'Executives, entrepreneurs, professionals',
      imageSrc: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      imageAlt: 'Executive massage',
    },
    {
      name: 'Couples Retreat',
      tagline: 'Shared Relaxation',
      duration: '180 minutes total',
      description: 'An unforgettable shared spa experience at your location. Consecutive massage sessions for both partners in a relaxing atmosphere.',
      includes: [
        'Swedish or deep tissue (90 min each)',
        'Aromatherapy',
        'Premium products',
        'Relaxing ambiance setup',
        ...(packageInclusions.complimentaryGift ? ['Complimentary gift'] : []),
      ],
      idealFor: 'Couples, anniversaries, celebrations',
      imageSrc: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      imageAlt: 'Couples massage',
    },
    {
      name: 'Athlete Recovery',
      tagline: 'Performance & Restoration',
      duration: '75 minutes',
      description: 'Sport-specific therapy designed to enhance performance and support recovery. For athletes and active individuals at all levels.',
      includes: [
        'Sports massage with targeted work',
        'Dynamic stretching session',
        'Muscle recovery treatment',
        ...(packageInclusions.percussionTherapy ? ['Percussion therapy'] : []),
        'Recovery guidance',
      ],
      idealFor: 'Athletes, fitness enthusiasts, active individuals',
      imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      imageAlt: 'Athletic recovery massage',
    },
    {
      name: 'Ultimate Indulgence',
      tagline: 'Pure Luxury',
      duration: '120 minutes',
      description: 'Our most comprehensive treatment—a full two hours of blissful relaxation. The pinnacle of at-home spa experiences.',
      includes: [
        'Full body Swedish massage',
        'Hot stone therapy',
        'Aromatherapy facial massage',
        'Hand and foot reflexology',
        'Premium organic products',
      ],
      idealFor: 'Special occasions, self-care, gift experiences',
      imageSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      imageAlt: 'Ultimate spa package',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Curated Packages
          </h1>
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Complete experiences designed for relaxation, recovery, and special occasions
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-sm shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                  <Image
                    src={pkg.imageSrc}
                    alt={pkg.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <span className="inline-block px-3 py-1 bg-rose-500/90 text-white text-xs font-medium tracking-wide mb-2 rounded-sm">
                      {pkg.duration}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-medium text-white tracking-wide">
                      {pkg.name}
                    </h2>
                    <p className="text-white/80 text-sm mt-1">
                      {pkg.tagline}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 md:p-8">
                  <p className="text-charcoal/70 mb-6 leading-relaxed text-sm">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-xs font-medium text-rose-500 mb-3 tracking-wide uppercase">
                      Includes
                    </h3>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0 mt-0.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-charcoal/60 text-xs sm:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 p-4 bg-champagne-200 rounded-sm border-l-2 border-rose-500">
                    <p className="text-xs text-rose-600 mb-1 tracking-wide uppercase font-medium">Ideal For</p>
                    <p className="text-charcoal/70 text-sm">{pkg.idealFor}</p>
                  </div>

                  <CTAButton
                    href="/contact"
                    variant="outline"
                    className="w-full"
                  >
                    Book This Package
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Packages Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Custom Experiences
          </h2>
          <p className="text-base text-charcoal/60 mb-10 leading-relaxed max-w-2xl mx-auto">
            Tailored treatments for special events and celebrations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
            <div className="bg-white rounded-sm shadow-soft p-5 sm:p-6 hover:shadow-elegant transition-shadow">
              <h3 className="font-medium text-charcoal mb-2 text-sm tracking-wide">Corporate</h3>
              <p className="text-xs text-charcoal/60">
                Team wellness and on-site sessions
              </p>
            </div>
            <div className="bg-white rounded-sm shadow-soft p-5 sm:p-6 hover:shadow-elegant transition-shadow">
              <h3 className="font-medium text-charcoal mb-2 text-sm tracking-wide">Events</h3>
              <p className="text-xs text-charcoal/60">
                Bridal parties and celebrations
              </p>
            </div>
            <div className="bg-white rounded-sm shadow-soft p-5 sm:p-6 hover:shadow-elegant transition-shadow">
              <h3 className="font-medium text-charcoal mb-2 text-sm tracking-wide">Private</h3>
              <p className="text-xs text-charcoal/60">
                Fully customized experiences
              </p>
            </div>
          </div>
          <CTAButton href="/contact" variant="primary">
            Inquire About Custom Packages
          </CTAButton>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-wide">
            Reserve Your Package
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Experience premium mobile massage therapy
          </p>
          <CTAButton href="/contact" variant="white">
            Book Now
          </CTAButton>
        </div>
      </section>
    </>
  );
}
