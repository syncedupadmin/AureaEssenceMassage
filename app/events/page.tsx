import type { Metadata } from 'next';
import Image from 'next/image';
import CTAButton from '@/components/CTAButton';

export const metadata: Metadata = {
  title: 'Corporate & Events | Áurea Essence Massage - Elevate Your Special Occasion',
  description: 'Bespoke wellness experiences for corporate events, bridal parties, weddings, and special occasions. On-site massage services in South Florida.',
  keywords: 'corporate massage, event massage, bridal party spa, wedding massage, team wellness, South Florida events',
};

const eventTypes = [
  {
    title: 'Corporate Wellness Days',
    description: 'Recharge your team with on-site chair or table massage. Boost morale, reduce stress, and show appreciation for your employees.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Bridal Parties',
    description: 'Pamper the bride and her tribe before the big day. Create lasting memories with a spa-quality experience wherever you celebrate.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Private Events',
    description: 'Dinner parties, birthdays, intimate gatherings. Add a touch of luxury to any celebration with personalized massage services.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: 'Hotel & Resort Partnerships',
    description: 'Elevate your guest experience with in-room luxury massage services. Perfect for boutique hotels and vacation rentals.',
    icon: (
      <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

const benefits = [
  {
    title: 'Multiple Therapists',
    description: 'Coordinate additional professionals for larger groups',
  },
  {
    title: 'Flexible Scheduling',
    description: 'Work around your event timeline seamlessly',
  },
  {
    title: 'All Equipment Provided',
    description: 'Tables, linens, products – everything included',
  },
  {
    title: 'Seamless Setup',
    description: 'Professional arrival, setup, and breakdown',
  },
];

export default function EventsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 bg-champagne">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Gold decorative element */}
          <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Elevate Your Event
          </h1>
          <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto mb-10">
            Bespoke wellness experiences for groups and special occasions
          </p>
        </div>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-sm shadow-elegant">
            <Image
              src="/images/massage-beachfront-patio.jpg"
              alt="Beachfront event massage setup with multiple tables"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs font-medium tracking-wide uppercase text-gold-400 drop-shadow">Group Events</span>
              <h3 className="text-xl sm:text-2xl font-serif drop-shadow">Unforgettable Experiences</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types Grid */}
      <section className="py-16 sm:py-20 md:py-24 bg-champagne-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              Event Services
            </h2>
            <p className="text-charcoal/60 max-w-xl mx-auto">
              Customized wellness experiences for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {eventTypes.map((event) => (
              <div
                key={event.title}
                className="bg-white rounded-sm p-6 sm:p-8 shadow-soft hover:shadow-elegant transition-all duration-300 border-t-2 border-gold-400"
              >
                <div className="w-14 h-14 mb-5 text-gold-600 bg-gold-100 rounded-full flex items-center justify-center ring-1 ring-gold-300">
                  {event.icon}
                </div>
                <h3 className="text-xl font-serif font-medium text-charcoal mb-3 tracking-wide">
                  {event.title}
                </h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-charcoal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-champagne mb-4 tracking-wide">
              Why Book for Events
            </h2>
            <p className="text-champagne/60 max-w-xl mx-auto">
              Professional service that makes your event memorable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="text-center p-6 bg-charcoal-400/50 rounded-sm border border-charcoal-300/30 hover:border-gold-500/50 transition-colors"
              >
                <div className="w-10 h-10 mx-auto mb-4 text-gold-500 bg-gold-500/10 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-base font-serif font-medium text-champagne mb-2">
                  {benefit.title}
                </h3>
                <p className="text-champagne/50 text-xs">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-champagne-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-0.5 bg-gold-500 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-charcoal mb-4 tracking-wide">
              How to Book
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Inquire',
                description: 'Share your event details, date, and guest count',
              },
              {
                step: '2',
                title: 'Customize',
                description: 'We\'ll create a tailored package for your needs',
              },
              {
                step: '3',
                title: 'Relax',
                description: 'We handle everything – you enjoy the experience',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-xl font-serif ring-2 ring-gold-400 ring-offset-4 ring-offset-champagne-200">
                  {item.step}
                </div>
                <h3 className="text-lg font-serif font-medium text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-charcoal/60 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-6 tracking-wide">
            Plan Your Event
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Let&apos;s create an unforgettable wellness experience for your guests
          </p>
          <CTAButton href="/contact" variant="white">
            Inquire About Your Event
          </CTAButton>
        </div>
      </section>
    </>
  );
}
