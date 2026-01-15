import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import CertificationBadges from '@/components/CertificationBadges';

export const metadata: Metadata = {
  title: 'About Us | Aurea Essence Massage',
  description: 'Meet our certified massage therapists. Licensed, insured, background-checked professionals delivering premium mobile massage therapy.',
  keywords: 'certified massage therapists, licensed LMT, professional mobile spa, Aurea Essence massage',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Professionalism',
      description: 'Every therapist is licensed, insured, and brings years of spa experience. We maintain the highest standards of service.',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
    },
    {
      title: 'Luxury Experience',
      description: 'From premium organic oils to heated massage tables, we bring every detail of a high-end spa directly to your door.',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
        </svg>
      ),
    },
    {
      title: 'Client-Centered',
      description: 'Your comfort and satisfaction are our top priorities. We customize every session to your preferences and wellness goals.',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      ),
    },
  ];

  const teamMembers = [
    {
      name: 'Sarah Martinez, LMT',
      role: 'Lead Therapist & Founder',
      bio: '15+ years of experience in luxury spa settings. Specialized in deep tissue and sports massage.',
      imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    },
    {
      name: 'Michael Chen, LMT',
      role: 'Senior Therapist',
      bio: 'Expert in Swedish and hot stone therapy. Former therapist at premier resorts.',
      imageSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    },
    {
      name: 'Jessica Williams, LMT',
      role: 'Prenatal & Couples Specialist',
      bio: 'Certified in prenatal massage and aromatherapy. Known for her gentle, nurturing touch.',
      imageSrc: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 bg-beige-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
              About Aurea Essence
            </h1>
            <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
              Certified therapists delivering spa-quality treatments with care and expertise
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative h-64 sm:h-80 lg:h-[500px] overflow-hidden rounded-sm shadow-elegant">
              <Image
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80"
                alt="Luxury massage therapy"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-6 tracking-wide">
                Our Story
              </h2>
              <div className="space-y-4 text-charcoal/70 leading-relaxed text-sm sm:text-base">
                <p>
                  Aurea Essence was born from a simple belief: everyone deserves access to exceptional wellness experiences in the comfort of their own space.
                </p>
                <p>
                  We assembled a team of elite therapists—professionals from prestigious spas—and created a mobile service delivering five-star experiences wherever our clients are most comfortable.
                </p>
                <p>
                  Today, we serve busy professionals, couples celebrating special moments, and anyone seeking a sanctuary of relaxation.
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
      <section className="py-16 sm:py-20 md:py-24 bg-beige-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Our Approach
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Core principles guiding our work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
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

      {/* Team Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Meet Our Therapists
            </h2>
            <p className="text-base text-charcoal/60 max-w-xl mx-auto">
              Licensed professionals with decades of combined experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-sm overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="relative h-64 sm:h-72">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-serif font-medium text-charcoal mb-1">
                    {member.name}
                  </h3>
                  <p className="text-rose-500 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <CertificationBadges />

      {/* Service Area Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal mb-6 tracking-wide">
              Service Area
            </h2>
            <p className="text-base sm:text-lg text-charcoal/70 mb-8">
              We bring luxury massage experiences to homes, hotels, and offices throughout the region.
            </p>
            <div className="bg-rose-50 border border-rose-200 rounded-sm p-6 sm:p-8 mb-8">
              <p className="text-sm font-medium text-rose-600 mb-4 tracking-wide uppercase">
                Areas We Serve
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-charcoal/70 text-sm">
                <div className="py-2">Your City</div>
                <div className="py-2">Nearby Areas</div>
                <div className="py-2">Metro Region</div>
                <div className="py-2">And More</div>
              </div>
            </div>
            <p className="text-charcoal/60 mb-8 text-sm">
              Not sure if we serve your area? Contact us—we often accommodate special requests!
            </p>
            <CTAButton href="/contact" variant="primary">
              Book Your Session
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-wide">
            Experience the Difference
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Join our satisfied clients who've discovered the luxury of at-home spa service.
          </p>
          <CTAButton href="/contact" variant="white">
            Schedule Now
          </CTAButton>
        </div>
      </section>
    </>
  );
}
