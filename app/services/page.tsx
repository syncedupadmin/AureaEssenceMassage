import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import {
  coreServices,
  serviceAddOns,
  getServicePrice,
  getAddOnPrice,
  hasAnyPricing,
} from '@/config/business';

export const metadata: Metadata = {
  title: 'Services | Áurea Essence Massage',
  description: 'Swedish, deep tissue, reflexology, lymphatic drainage, post-surgical, couples & prenatal massage delivered to your location. Premium mobile massage therapy.',
  keywords: 'Swedish massage, deep tissue massage, reflexology, lymphatic drainage, post-surgical massage, couples massage, prenatal massage, mobile massage',
};

export default function ServicesPage() {
  const enabledAddOns = serviceAddOns.filter(a => a.enabled);

  // Icon mapping for add-ons
  const getAddOnIcon = (iconName: string) => {
    switch (iconName) {
      case 'fire':
        return (
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
            <path d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
          </svg>
        );
      case 'leaf':
        return (
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
        );
      case 'sparkles':
        return (
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Gold decorative element */}
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6"></div>
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
            {coreServices.map((service, index) => {
              const hasPricing = hasAnyPricing(service.id);

              return (
                <div
                  key={service.id}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 lg:gap-16 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative h-64 sm:h-80 md:h-[400px] lg:h-[500px] overflow-hidden rounded-sm shadow-elegant ring-1 ring-gold-200">
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
                      <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 text-xs font-medium tracking-wide border-l-2 border-gold-500">
                        {service.durations.join(' / ')}
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

                    {/* Pricing Section */}
                    {hasPricing ? (
                      <div className="mb-6 sm:mb-8 p-4 bg-champagne-200 rounded-sm border-l-2 border-gold-500">
                        <h3 className="text-xs font-medium text-gold-600 mb-3 tracking-wide uppercase">
                          Pricing
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {service.durations.map((duration) => {
                            const price = getServicePrice(service.id, duration);
                            if (!price) return null;
                            return (
                              <div key={duration} className="text-sm bg-white px-3 py-1.5 rounded-sm shadow-sm">
                                <span className="text-charcoal/60">{duration}:</span>{' '}
                                <span className="font-medium text-charcoal">{price}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6 sm:mb-8 p-4 bg-champagne-200 rounded-sm border-l-2 border-gold-500">
                        <p className="text-sm text-charcoal/70 italic">
                          Pricing available upon request
                        </p>
                      </div>
                    )}

                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-sm font-medium text-rose-500 mb-3 sm:mb-4 tracking-wide uppercase">
                        Benefits
                      </h3>
                      <ul className="space-y-2 sm:space-y-3">
                        {service.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gold-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5"
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section - Only show if there are enabled add-ons */}
      {enabledAddOns.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              {/* Gold decorative element */}
              <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6"></div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Enhancements
              </h2>
              <p className="text-base text-charcoal/60 max-w-xl mx-auto">
                Optional add-ons to elevate your experience
              </p>
            </div>

            <div className={`grid grid-cols-1 ${enabledAddOns.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'md:grid-cols-3'} gap-6 md:gap-8`}>
              {enabledAddOns.map((addOn) => {
                const price = getAddOnPrice(addOn.id);
                return (
                  <div key={addOn.id} className="bg-white rounded-sm shadow-soft p-6 sm:p-8 text-center hover:shadow-gold transition-shadow border-t-2 border-gold-400">
                    <div className="w-12 h-12 mx-auto mb-4 text-gold-600 bg-gold-100 rounded-full flex items-center justify-center ring-1 ring-gold-300">
                      {getAddOnIcon(addOn.icon)}
                    </div>
                    <h3 className="text-lg font-serif font-medium text-charcoal mb-2 tracking-wide">
                      {addOn.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm mb-3">
                      {addOn.description}
                    </p>
                    {price ? (
                      <p className="text-gold-600 font-medium text-sm">{price}</p>
                    ) : (
                      <p className="text-charcoal/50 text-xs italic">Price upon request</p>
                    )}
                  </div>
                );
              })}
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
