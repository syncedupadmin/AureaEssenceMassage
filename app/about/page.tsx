import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';
import CertificationBadges from '@/components/CertificationBadges';

export const metadata: Metadata = {
  title: 'Certified Mobile Massage Therapists | Destiny Eden Story',
  description: 'Meet our certified massage therapists with 15+ years luxury spa experience. Licensed, insured, background-checked. Serving South Florida since 2020.',
  keywords: 'certified massage therapists South Florida, licensed LMT Miami, professional mobile spa, Destiny Eden massage',
};

export default function AboutPage() {
  const certifications = [
    'Licensed Massage Therapists (LMT)',
    'National Certification Board (NCBTMB)',
    'American Massage Therapy Association (AMTA)',
    'CPR & First Aid Certified',
    'Liability Insurance',
    'Background Checked',
  ];

  const values = [
    {
      title: 'Professionalism',
      description: 'Every therapist is licensed, insured, and brings years of spa experience. We maintain the highest standards of service and discretion.',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
    },
    {
      title: 'Luxury Experience',
      description: 'From premium organic oils to heated massage tables, we bring every detail of a high-end spa directly to your door.',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
        </svg>
      ),
    },
    {
      title: 'Client-Centered',
      description: 'Your comfort and satisfaction are our top priorities. We customize every session to your preferences and wellness goals.',
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      ),
    },
  ];

  const teamMembers = [
    {
      name: 'Dr. Sarah Martinez, LMT',
      role: 'Lead Therapist & Founder',
      bio: '15+ years of experience in luxury spa settings. Specialized in deep tissue and sports massage.',
      imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    },
    {
      name: 'Michael Chen, LMT',
      role: 'Senior Therapist',
      bio: 'Expert in Swedish and hot stone therapy. Former therapist at Four Seasons Resort.',
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
      <section className="relative pt-40 pb-32 bg-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-serif font-light text-cream mb-8 tracking-wide">
              About Destiny Eden
            </h1>
            <p className="text-base text-cream/70 leading-relaxed max-w-2xl mx-auto">
              Certified therapists delivering spa-quality treatments with discretion and care
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 bg-charcoal">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 lg:h-[600px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80"
                alt="Luxury massage therapy"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-4xl font-serif font-light text-cream mb-8 tracking-wide">
                Our Story
              </h2>
              <div className="space-y-6 text-cream/80 leading-relaxed text-sm">
                <p>
                  Founded in 2020, Destiny Eden was born from a simple observation: the most successful people in South Florida were too busy to prioritize their wellness.
                </p>
                <p>
                  We assembled a team of elite therapists—professionals from the region's most prestigious spas—and created a mobile service delivering five-star experiences wherever clients are most comfortable.
                </p>
                <p>
                  Today, we serve Fortune 500 executives, busy parents, professional athletes, and couples celebrating life's moments.
                </p>
                <p className="text-gold-300 font-medium">
                  We bring the sanctuary to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-light text-cream mb-6 tracking-wide">
              Our Approach
            </h2>
            <p className="text-base text-cream/70 max-w-xl mx-auto">
              Core principles guiding our work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-6 text-gold-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-serif font-medium text-cream mb-4 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-cream/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              Meet Our Therapists
            </h2>
            <p className="text-lg text-gold-200 max-w-2xl mx-auto">
              Licensed professionals with decades of combined experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-black border border-gold-500/20 rounded-lg overflow-hidden shadow-lg shadow-gold-500/10 hover:shadow-xl hover:shadow-gold-500/20 transition-all duration-300">
                <div className="relative h-80">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gold-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gold-200 text-sm leading-relaxed">
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
      <section className="py-20 bg-black-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Serving South Florida
            </h2>
            <p className="text-xl text-gold-200 mb-8">
              We proudly serve the entire South Florida region, from Delray Beach to Miami, bringing luxury massage experiences to homes, hotels, and offices throughout the area.
            </p>
            <div className="bg-gold-gradient p-8 rounded-lg mb-8">
              <p className="text-lg font-semibold text-black mb-4">
                Service Area Includes:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-black font-medium">
                <div>Delray Beach</div>
                <div>Boca Raton</div>
                <div>Fort Lauderdale</div>
                <div>Hollywood</div>
                <div>Aventura</div>
                <div>Miami Beach</div>
                <div>Coral Gables</div>
                <div>Downtown Miami</div>
              </div>
            </div>
            <p className="text-gold-200 mb-8">
              Not sure if we serve your area? Contact us—we often accommodate special requests!
            </p>
            <CTAButton href="/contact" variant="primary">
              Book Your Session Today
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gold-gradient text-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Experience the Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who've discovered the luxury of at-home spa service.
          </p>
          <CTAButton
            href="/contact"
            variant="outline"
            className="bg-black text-gold-400 hover:bg-black-light border-black hover:border-black-light"
          >
            Schedule Now
          </CTAButton>
        </div>
      </section>
    </>
  );
}
