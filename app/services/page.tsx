import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Premium Massage Services | Aurea Essence Massage',
  description: 'Swedish, deep tissue, couples & hot stone massage delivered to your location. Certified therapists, premium products. Book your session today.',
  keywords: 'Swedish massage, deep tissue massage, couples massage, hot stone massage, mobile massage therapy',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Swedish Massage',
      duration: '60 / 90 / 120 minutes',
      pricing: '$120 / $175 / $230',
      description: 'Long, flowing strokes release tension from head to toe. Our certified therapists customize pressure and technique to your body\'s unique needs. Aromatherapy included. Perfect for those seeking deep relaxation.',
      benefits: [
        'Reduces stress and anxiety',
        'Improves blood circulation',
        'Promotes better sleep',
        'Eases muscle tension',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      imageAlt: 'Swedish Massage Therapy',
    },
    {
      title: 'Deep Tissue Therapy',
      duration: '60 / 90 / 120 minutes',
      pricing: '$140 / $200 / $260',
      description: 'Targeted relief for chronic tension and muscle recovery. Our advanced techniques reach deep muscle layers, releasing years of stress. Ideal for athletes and those with persistent muscle issues.',
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
      duration: '120 min / 180 min',
      pricing: '$280 / $420',
      description: 'Share a relaxing experience with your partner. Our couples massage creates the perfect setting for connection and relaxation, whether celebrating a special occasion or simply enjoying time together.',
      benefits: [
        'Shared relaxation experience',
        'Romantic shared experience',
        'Perfect for special occasions',
        'Customized for each partner',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
      imageAlt: 'Couples Massage Experience',
    },
    {
      title: 'Hot Stone Massage',
      duration: '75 / 90 / 120 minutes',
      pricing: '$160 / $220 / $290',
      description: 'Smooth, heated basalt stones are placed on key points and used as massage tools to melt away tension. The therapeutic heat penetrates deep into muscles for profound relaxation.',
      benefits: [
        'Deep muscle relaxation',
        'Improved circulation',
        'Stress and anxiety relief',
        'Enhanced detoxification',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      imageAlt: 'Hot Stone Massage',
    },
    {
      title: 'Prenatal Massage',
      duration: '60 / 90 minutes',
      pricing: '$130 / $190',
      description: 'Specially designed for expectant mothers, our prenatal massage eases pregnancy-related discomfort with safe, nurturing techniques. Our therapists are trained in prenatal care.',
      benefits: [
        'Reduces pregnancy discomfort',
        'Decreases swelling',
        'Improves sleep quality',
        'Reduces stress hormones',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
      imageAlt: 'Prenatal Massage',
    },
    {
      title: 'Sports Massage',
      duration: '60 / 90 / 120 minutes',
      pricing: '$140 / $200 / $260',
      description: 'Performance-focused therapy designed for athletes before or after events. Combines stretching, compression, and targeted work to enhance performance and speed recovery.',
      benefits: [
        'Prevents injuries',
        'Enhances flexibility',
        'Speeds up recovery',
        'Improves performance',
      ],
      imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      imageAlt: 'Sports Massage Therapy',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 bg-beige-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
              Our Services
            </h1>
            <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Premium massage therapy delivered to your location by certified professionals
            </p>
            <CTAButton href="/contact" variant="primary">
              Book Now
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="px-3 sm:px-4 py-1 bg-rose-100 border-l-2 border-rose-500 text-rose-600 text-xs font-medium tracking-wide">
                      {service.duration}
                    </div>
                    {service.pricing && (
                      <div className="px-3 sm:px-4 py-1 bg-rose-100 border-l-2 border-rose-500 text-rose-600 text-xs font-medium tracking-wide">
                        {service.pricing}
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium text-charcoal mb-4 sm:mb-6 tracking-wide">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base text-charcoal/70 mb-6 sm:mb-8 leading-relaxed">
                    {service.description}
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

      {/* Add-Ons Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-beige-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Enhancements
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Add these to any service for an elevated experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-serif font-medium text-charcoal mb-2 tracking-wide">
                Aromatherapy
              </h3>
              <p className="text-charcoal/60 text-sm">
                Essential oil blends tailored to your needs
              </p>
            </div>

            <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-serif font-medium text-charcoal mb-2 tracking-wide">
                CBD Oil
              </h3>
              <p className="text-charcoal/60 text-sm">
                Therapeutic CBD-infused treatment
              </p>
            </div>

            <div className="bg-white rounded-sm shadow-soft p-6 sm:p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-serif font-medium text-charcoal mb-2 tracking-wide">
                Extended Time
              </h3>
              <p className="text-charcoal/60 text-sm">
                Additional 30 minutes of focused work
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
