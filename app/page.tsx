import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';

export default function Home() {
  const services = [
    {
      title: 'Swedish Massage',
      description: 'Gentle, flowing strokes for stress relief and deep relaxation. Perfect for unwinding.',
      imageSrc: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      imageAlt: 'Swedish Massage therapy session',
    },
    {
      title: 'Deep Tissue',
      description: 'Targeted therapy for chronic tension and muscle recovery. Relief that lasts.',
      imageSrc: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
      imageAlt: 'Deep Tissue Massage therapy',
    },
    {
      title: 'Couples Massage',
      description: 'Share a relaxing experience with someone special. Create lasting memories together.',
      imageSrc: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      imageAlt: 'Couples Massage experience',
    },
    {
      title: 'Hot Stone',
      description: 'Heated stones melt away tension. Deep warmth for ultimate relaxation.',
      imageSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      imageAlt: 'Hot Stone Massage therapy',
    },
  ];

  const testimonials = [
    {
      name: 'Jennifer M.',
      text: 'An absolutely transformative experience. The therapist was professional and the massage was exactly what I needed.',
      rating: 5,
    },
    {
      name: 'Michael T.',
      text: 'Best decision I made this month. The convenience of having a professional massage at home is unmatched.',
      rating: 5,
    },
    {
      name: 'Amanda K.',
      text: 'The hot stone massage was heavenly. I felt completely renewed afterwards. Will definitely book again!',
      rating: 5,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-beige-300">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&q=80"
            alt="Luxury massage therapy"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-beige-300/80 via-beige-300/60 to-beige-300" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto pt-20 pb-12">
          {/* Logo Display */}
          <div className="mb-8 animate-fade-in">
            <Image
              src="/images/aurea-essence-logo.png"
              alt="Aurea Essence Massage"
              width={400}
              height={200}
              className="mx-auto w-auto h-24 sm:h-32 md:h-40"
              priority
            />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-charcoal mb-6 animate-fade-in tracking-wide leading-tight">
            Premium Mobile<br />
            <span className="text-rose-500">Massage Therapy</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Experience the golden standard in wellness. Certified therapists bring luxury spa treatments directly to you.
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

      {/* Services Preview Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Our Services
            </h2>
            <p className="text-base sm:text-lg text-charcoal/60 max-w-xl mx-auto">
              Curated treatments designed for your complete relaxation
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

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-beige-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              The Aurea Difference
            </h2>
            <p className="text-base sm:text-lg text-charcoal/60 max-w-xl mx-auto">
              Luxury wellness delivered with care and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-5 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                Certified Therapists
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Licensed professionals with extensive training and experience
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-5 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                Premium Products
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Organic oils and luxury linens for your comfort
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-14 h-14 mx-auto mb-5 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                Your Space
              </h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">
                Home, hotel, or office - wherever you feel most comfortable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Client Stories
            </h2>
            <p className="text-base sm:text-lg text-charcoal/60 max-w-xl mx-auto">
              Hear from those who have experienced our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
