import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'About | Áurea Essence Massage',
  description: 'Premium mobile massage therapy. We bring spa-quality treatments to your location with professionalism and care.',
  keywords: 'mobile massage, about us, premium massage therapy, Áurea Essence',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Professionalism',
      description: 'We maintain the highest standards of service, discretion, and expertise in every session.',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
    },
    {
      title: 'Luxury Experience',
      description: 'From premium products to professional equipment, we bring every detail of a high-end spa to you.',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
        </svg>
      ),
    },
    {
      title: 'Client-Centered',
      description: 'Your comfort and satisfaction are our priorities. Every session is customized to your preferences.',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            About Áurea Essence
          </h1>
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
            Premium mobile massage therapy delivered with care and expertise
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden rounded-sm shadow-elegant">
              <Image
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80"
                alt="Luxury massage experience"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-6 tracking-wide">
                Our Philosophy
              </h2>
              <div className="space-y-4 text-charcoal/70 leading-relaxed text-sm sm:text-base">
                <p>
                  Áurea Essence was founded on a simple belief: everyone deserves access to exceptional wellness experiences in the comfort of their own space.
                </p>
                <p>
                  We created a mobile service that delivers spa-quality experiences wherever our clients are most comfortable—whether at home, in a hotel, or at the office.
                </p>
                <p>
                  Today, we serve busy professionals, couples celebrating special moments, and anyone seeking a sanctuary of relaxation without the need to travel.
                </p>
                <p className="text-rose-500 font-medium">
                  We bring the golden essence of wellness to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Our Approach
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Core principles guiding everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-5 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Service Area
          </h2>
          <p className="text-base sm:text-lg text-charcoal/70 mb-8">
            We bring luxury massage experiences to homes, hotels, and offices throughout the region.
          </p>
          <div className="bg-rose-50 border border-rose-200 rounded-sm p-6 sm:p-8 mb-8">
            <p className="text-sm font-medium text-rose-600 mb-4 tracking-wide uppercase">
              Currently Serving
            </p>
            <p className="text-charcoal/70">
              South Florida and surrounding areas
            </p>
          </div>
          <p className="text-charcoal/60 mb-8 text-sm">
            Not sure if we serve your area? Contact us—we often accommodate special requests.
          </p>
          <CTAButton href="/contact" variant="primary">
            Book Your Session
          </CTAButton>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-wide">
            Experience the Difference
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Discover the luxury of at-home spa service
          </p>
          <CTAButton href="/contact" variant="white">
            Schedule Now
          </CTAButton>
        </div>
      </section>
    </>
  );
}
