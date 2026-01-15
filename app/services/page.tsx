import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import { businessConfig } from '@/config/business';

export const metadata: Metadata = {
  title: 'Services | Áurea Essence Massage',
  description: 'Swedish, deep tissue, couples & hot stone massage delivered to your location. Premium mobile massage therapy.',
  keywords: 'Swedish massage, deep tissue massage, couples massage, hot stone massage, mobile massage',
};

export default function ServicesPage() {
  const { addOns } = businessConfig.features;

  const services = [
    {
      title: 'Swedish Massage',
      duration: '60 / 90 / 120 min',
      idealFor: 'Anyone seeking relaxation and stress relief',
      description: 'Long, flowing strokes release tension from head to toe. Customized pressure and technique tailored to your preferences.',
      benefits: [
        'Reduces stress and anxiety',
        'Improves circulation',
        'Promotes better sleep',
        'Eases muscle tension',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      imageAlt: 'Swedish Massage',
    },
    {
      title: 'Deep Tissue Therapy',
      duration: '60 / 90 / 120 min',
      idealFor: 'Those with chronic tension or muscle pain',
      description: 'Targeted relief for chronic tension and muscle recovery. Advanced techniques reach deep muscle layers, releasing persistent stress.',
      benefits: [
        'Relieves chronic muscle pain',
        'Breaks up scar tissue',
        'Improves athletic recovery',
        'Increases range of motion',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
      imageAlt: 'Deep Tissue Massage',
    },
    {
      title: 'Couples Massage',
      duration: '120 / 180 min',
      idealFor: 'Partners, anniversaries, special occasions',
      description: 'Share a relaxing experience with your partner. Consecutive sessions create the perfect setting for connection and relaxation together.',
      benefits: [
        'Shared relaxation experience',
        'Perfect for special occasions',
        'Customized for each partner',
        'Creates lasting memories',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      imageAlt: 'Couples Massage',
    },
    {
      title: 'Hot Stone Massage',
      duration: '75 / 90 / 120 min',
      idealFor: 'Anyone seeking deep relaxation',
      description: 'Smooth, heated basalt stones placed on key points and used as massage tools. Therapeutic heat penetrates deep for profound relaxation.',
      benefits: [
        'Deep muscle relaxation',
        'Improved circulation',
        'Profound stress relief',
        'Enhanced sense of calm',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      imageAlt: 'Hot Stone Massage',
    },
    {
      title: 'Prenatal Massage',
      duration: '60 / 90 min',
      idealFor: 'Expectant mothers (2nd & 3rd trimester)',
      description: 'Specially designed for expectant mothers. Safe, nurturing techniques ease pregnancy-related discomfort with proper positioning.',
      benefits: [
        'Reduces pregnancy discomfort',
        'Decreases swelling',
        'Improves sleep quality',
        'Reduces stress and anxiety',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
      imageAlt: 'Prenatal Massage',
    },
    {
      title: 'Sports Massage',
      duration: '60 / 90 / 120 min',
      idealFor: 'Athletes and active individuals',
      description: 'Performance-focused therapy for athletes. Combines stretching, compression, and targeted work to enhance performance and recovery.',
      benefits: [
        'Helps prevent injuries',
        'Enhances flexibility',
        'Supports faster recovery',
        'Improves performance',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      imageAlt: 'Sports Massage',
    },
  ];

  // Build enhancements based on config flags
  const enhancements = [
    {
      key: 'aromatherapy',
      enabled: addOns.aromatherapy,
      title: 'Aromatherapy',
      description: 'Essential oil blends tailored to your needs',
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
    },
    {
      key: 'cbdOil',
      enabled: addOns.cbdOil,
      title: 'CBD Oil',
      description: 'Therapeutic CBD-infused treatment',
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
    },
    {
      key: 'hotStones',
      enabled: addOns.hotStones,
      title: 'Hot Stones',
      description: 'Heated stones for deeper relaxation',
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
          <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
        </svg>
      ),
    },
    {
      key: 'extendedTime',
      enabled: addOns.extendedTime,
      title: 'Extended Time',
      description: 'Additional 30 minutes of focused work',
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
  ];

  const enabledEnhancements = enhancements.filter(e => e.enabled);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Our Services
          </h1>
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            Premium massage therapy delivered to your location
          </p>
          <CTAButton href="/contact" variant="primary">
            Book Now
          </CTAButton>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 md:space-y-24">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative h-64 sm:h-80 md:h-[400px] lg:h-[500px] overflow-hidden rounded-sm shadow-elegant">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="mb-4 sm:mb-6">
                    <span className="inline-block px-3 py-1 bg-rose-100 text-rose-600 text-xs font-medium tracking-wide border-l-2 border-rose-500">
                      {service.duration}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-charcoal mb-4 sm:mb-6 tracking-wide">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-charcoal/70 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-xs text-rose-500 font-medium mb-6 sm:mb-8">
                    Ideal for: {service.idealFor}
                  </p>
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-sm font-medium text-rose-500 mb-3 sm:mb-4 tracking-wide uppercase">
                      Benefits
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span className="text-charcoal/70 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <CTAButton href="/contact" variant="outline">
                    Book This Service
                  </CTAButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhancements Section - Only show if there are enabled add-ons */}
      {enabledEnhancements.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Enhancements
              </h2>
              <p className="text-base text-charcoal/60 max-w-xl mx-auto">
                Optional add-ons to elevate your experience
              </p>
            </div>

            <div className={`grid grid-cols-1 ${enabledEnhancements.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : enabledEnhancements.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-6 md:gap-8`}>
              {enabledEnhancements.map((enhancement) => (
                <div key={enhancement.key} className="bg-white rounded-sm shadow-soft p-6 sm:p-8 text-center hover:shadow-elegant transition-shadow">
                  <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                    {enhancement.icon}
                  </div>
                  <h3 className="text-lg font-serif font-medium text-charcoal mb-2 tracking-wide">
                    {enhancement.title}
                  </h3>
                  <p className="text-charcoal/60 text-sm">
                    {enhancement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-wide">
            Ready to Book?
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Schedule your personalized massage session today
          </p>
          <CTAButton href="/contact" variant="white">
            Book Your Session
          </CTAButton>
        </div>
      </section>
    </>
  );
}
