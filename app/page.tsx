import Image from 'next/image';
import Link from 'next/link';
import CTAButton from '@/components/CTAButton';
import ServiceCard from '@/components/ServiceCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import LocationsSection from '@/components/LocationsSection';
import { getBusinessData, getAddOnPriceDisplay } from '@/lib/data';

// ISR - revalidate every 60 seconds for fresh pricing data
export const revalidate = 60;

export default async function Home() {
  const data = await getBusinessData();
  const { services, addOns, pricing } = data;

  // Take first 4 services for homepage preview
  const previewServices = services.slice(0, 4).map(service => ({
    title: service.title,
    description: service.shortDescription,
    imageSrc: service.imageSrc,
    imageAlt: service.imageAlt,
  }));

  // Get enabled add-ons for preview
  const enabledAddOns = addOns.filter(a => a.enabled);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0">
          {/* Base Image */}
          <Image
            src="/images/massage-oceanview-room.jpg"
            alt="Luxury massage room with oceanfront view"
            fill
            priority
            className="object-cover"
          />
          {/* Gradient Overlay - shows image on edges */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(245,240,232,0.92) 0%, rgba(245,240,232,0.75) 60%, rgba(245,240,232,0.5) 100%)'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Gold Decorative Line */}
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-6" />

          {/* Logo */}
          <Image
            src="/images/aurea-essence-logo.png"
            alt="Áurea Essence Massage"
            width={400}
            height={100}
            priority
            className="mx-auto mb-8 w-auto h-16 sm:h-20 md:h-24"
          />

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-wide mb-4">
            <span className="text-charcoal">Luxury Wellness,</span>
            <br />
            <span className="bg-gradient-to-r from-rose-400 via-gold-500 to-rose-400 bg-clip-text text-transparent">
              Delivered to Your Door
            </span>
          </h1>

          {/* Subheadline with Gold Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10">
            <div className="hidden sm:block w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-gold-400" />
            <p className="text-charcoal/60 text-base sm:text-lg md:text-xl tracking-wide">
              Five-star spa. Your private setting.
            </p>
            <div className="hidden sm:block w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-gold-400" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-rose-500 text-white text-base font-medium tracking-wide rounded-sm hover:bg-rose-600 transition-all shadow-elegant hover:shadow-dark ring-1 ring-gold-400/30 hover:ring-gold-400/60"
            >
              Book Your Session
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-charcoal text-base font-medium tracking-wide rounded-sm border border-gold-400/50 hover:border-gold-500 hover:bg-gold-50/30 transition-all"
            >
              Explore Services
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-charcoal/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Limited availability this week</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-charcoal/20" />
            <div className="flex items-center gap-4 text-xs tracking-wide">
              <span>Licensed & Insured</span>
              <span className="text-gold-500">•</span>
              <span>5-Star Rated</span>
              <span className="text-gold-500">•</span>
              <span>South Florida</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <svg className="w-6 h-6 text-gold-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Your Experience Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            {/* Gold decorative element */}
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Your Experience
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Three simple steps to your perfect massage experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-serif ring-2 ring-gold-400 ring-offset-4 ring-offset-champagne-200">
                1
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-3">
                Book Online
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Choose your service, select your preferred time, and tell us your location.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-serif ring-2 ring-gold-400 ring-offset-4 ring-offset-champagne-200">
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
              <div className="w-16 h-16 mx-auto mb-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-serif ring-2 ring-gold-400 ring-offset-4 ring-offset-champagne-200">
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
      </section>

      {/* Settings Gallery Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Where Relaxation Happens
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              From beachside retreats to luxury condos—we bring five-star wellness anywhere
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large featured image */}
            <div className="md:col-span-2 lg:col-span-2 relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-sm shadow-elegant group">
              <Image
                src="/images/massage-beachside-tropical.jpg"
                alt="Beachside massage under palm trees"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-medium tracking-wide uppercase text-gold-400">Beachfront</span>
                <h3 className="text-lg font-serif">Paradise Awaits</h3>
              </div>
            </div>

            {/* Modern interior */}
            <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-sm shadow-elegant group">
              <Image
                src="/images/massage-modern-interior.jpg"
                alt="Modern in-home massage setup"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-medium tracking-wide uppercase text-gold-400">Private Residence</span>
                <h3 className="text-lg font-serif">Your Space, Elevated</h3>
              </div>
            </div>

            {/* Beachfront patio */}
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-sm shadow-elegant group">
              <Image
                src="/images/massage-beachfront-patio.jpg"
                alt="Beachfront patio massage setup"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-medium tracking-wide uppercase text-gold-400">Events & Groups</span>
                <h3 className="text-lg font-serif">Celebrate Together</h3>
              </div>
            </div>

            {/* Luxury condo */}
            <div className="md:col-span-1 lg:col-span-2 relative h-64 sm:h-80 overflow-hidden rounded-sm shadow-elegant group">
              <Image
                src="/images/massage-luxury-condo.jpg"
                alt="Luxury condo massage experience"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-medium tracking-wide uppercase text-gold-400">Luxury Living</span>
                <h3 className="text-lg font-serif">Five-Star Comfort</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Treatments Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            {/* Gold decorative element */}
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Signature Treatments
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Curated treatments for your complete relaxation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {previewServices.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center mt-10 md:mt-12">
            <CTAButton href="/services" variant="secondary">
              View All Services
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Elevate Your Session Section */}
      {enabledAddOns.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              {/* Gold decorative element */}
              <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6"></div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Elevate Your Session
              </h2>
              <p className="text-base text-charcoal/60 max-w-xl mx-auto">
                Premium add-ons to elevate any session
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
              {enabledAddOns.map((addOn) => {
                const price = getAddOnPriceDisplay(pricing, addOn.id);
                return (
                  <div
                    key={addOn.id}
                    className="bg-white rounded-sm p-5 sm:p-6 text-center shadow-soft hover:shadow-gold transition-shadow border-t-2 border-gold-400"
                  >
                    <div className="w-10 h-10 mx-auto mb-3 text-gold-600 bg-gold-100 rounded-full flex items-center justify-center">
                      {addOn.icon === 'fire' && (
                        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
                        </svg>
                      )}
                      {addOn.icon === 'leaf' && (
                        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                      )}
                      {addOn.icon === 'sparkles' && (
                        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      )}
                    </div>
                    <h3 className="text-base font-serif font-medium text-charcoal mb-1">
                      {addOn.title}
                    </h3>
                    <p className="text-charcoal/50 text-xs mb-2">
                      {addOn.description}
                    </p>
                    {price ? (
                      <span className="text-gold-600 font-medium text-sm">{price}</span>
                    ) : (
                      <span className="text-charcoal/40 text-xs italic">Price upon request</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Locations Section */}
      <LocationsSection />

      {/* The Áurea Standard Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            {/* Gold decorative element */}
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6"></div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              The Áurea Standard
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Luxury wellness delivered with care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-5 text-gold-600 bg-gold-100 rounded-full flex items-center justify-center ring-1 ring-gold-300">
                <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                Professional Service
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Private in-home sessions with attentive care. Your comfort and privacy are paramount.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-5 text-gold-600 bg-gold-100 rounded-full flex items-center justify-center ring-1 ring-gold-300">
                <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                Always On Time
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                We respect your schedule. Punctual arrivals so your relaxation starts exactly when planned.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-5 text-gold-600 bg-gold-100 rounded-full flex items-center justify-center ring-1 ring-gold-300">
                <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                Premium Quality
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Quality products, professional equipment, and attention to every detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-champagne mb-6 tracking-wide">
            Your Relaxation Awaits
          </h2>
          <p className="text-base sm:text-lg text-champagne/70 mb-10 max-w-lg mx-auto">
            Don&apos;t wait for a special occasion. You deserve this today.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-gold-500 text-charcoal text-base font-medium tracking-wide rounded-sm hover:bg-gold-400 transition-all shadow-elegant hover:shadow-gold"
          >
            Book Your Session
          </Link>
          <p className="mt-6 text-champagne/50 text-sm">
            Same-day availability • Easy rescheduling • No commitment
          </p>
        </div>
      </section>
    </>
  );
}
