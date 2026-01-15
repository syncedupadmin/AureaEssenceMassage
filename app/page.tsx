import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import ServiceCard from '@/components/ServiceCard';

export default function Home() {
  const services = [
    {
      title: 'Swedish Massage',
      description: 'Flowing strokes for deep relaxation and stress relief.',
      imageSrc: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      imageAlt: 'Swedish Massage therapy',
    },
    {
      title: 'Deep Tissue',
      description: 'Targeted therapy for chronic tension and muscle recovery.',
      imageSrc: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
      imageAlt: 'Deep Tissue Massage',
    },
    {
      title: 'Couples Massage',
      description: 'Share a relaxing experience with someone special.',
      imageSrc: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      imageAlt: 'Couples Massage',
    },
    {
      title: 'Hot Stone',
      description: 'Heated stones melt away tension for ultimate relaxation.',
      imageSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      imageAlt: 'Hot Stone Massage',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-champagne">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80"
            alt="Luxury massage experience"
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-champagne/80 via-champagne/60 to-champagne" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20 pb-12">
          <div className="mb-8 animate-fade-in">
            <Image
              src="/images/aurea-essence-logo.png"
              alt="Áurea Essence Massage"
              width={800}
              height={200}
              className="mx-auto w-auto h-16 sm:h-20 md:h-24"
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-charcoal mb-6 animate-fade-in tracking-wide leading-tight">
            Premium Mobile<br />
            <span className="text-rose-500">Massage Therapy</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Spa-quality treatments delivered to your home, hotel, or office.
            Experience luxury wellness on your terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <CTAButton href="/contact" variant="primary">
              Book Your Session
            </CTAButton>
            <CTAButton href="/services" variant="outline">
              Explore Services
            </CTAButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <svg className="w-6 h-6 text-rose-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              How It Works
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Three simple steps to your perfect massage experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-2xl font-serif">
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
      </section>

      {/* Services Preview Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Our Services
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Curated treatments for your complete relaxation
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
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

      {/* Trust Pillars Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              The Áurea Difference
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Luxury wellness delivered with care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-5 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                Discreet Service
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Professional, private sessions in your space. Your comfort and privacy are paramount.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-5 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
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
              <div className="w-14 h-14 mx-auto mb-5 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
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
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-wide">
            Begin Your Wellness Journey
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Book your personalized massage experience today
          </p>
          <CTAButton href="/contact" variant="white">
            Book Now
          </CTAButton>
        </div>
      </section>
    </>
  );
}
