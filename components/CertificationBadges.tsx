'use client';

import { businessConfig } from '@/config/business';

export default function CertificationBadges() {
  const { showCertificationBadges, certifications } = businessConfig.features;

  // Don't render anything if certifications are disabled
  if (!showCertificationBadges) {
    return null;
  }

  const badges = [
    {
      key: 'licensedLMT',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      text: "Licensed LMT",
      subtitle: "State Certified"
    },
    {
      key: 'ncbtmbCertified',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      text: "NCBTMB Certified",
      subtitle: "National Board"
    },
    {
      key: 'amtaMember',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      ),
      text: "AMTA Member",
      subtitle: "Professional Association"
    },
    {
      key: 'fullyInsured',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
      text: "Fully Insured",
      subtitle: "Liability Coverage"
    },
    {
      key: 'backgroundChecked',
      icon: (
        <svg className="w-7 h-7" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
      ),
      text: "Background Checked",
      subtitle: "Verified Safe"
    }
  ];

  // Filter badges based on which certifications are enabled
  const enabledBadges = badges.filter(
    badge => certifications[badge.key as keyof typeof certifications]
  );

  // Don't render if no badges are enabled
  if (enabledBadges.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-champagne-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-charcoal mb-3 tracking-wide">
            Licensed & Certified
          </h3>
          <p className="text-charcoal/60 text-sm">Your safety and wellness are our top priorities</p>
        </div>
        <div className="flex justify-center gap-4 sm:gap-6 flex-wrap max-w-4xl mx-auto">
          {enabledBadges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-sm shadow-soft p-4 sm:p-5 min-w-[120px] sm:min-w-[140px] transition-all duration-300 hover:shadow-elegant"
            >
              <div className="w-12 h-12 mb-3 text-rose-500 bg-rose-100 rounded-full flex items-center justify-center">
                {badge.icon}
              </div>
              <p className="text-charcoal font-medium text-xs sm:text-sm tracking-wide mb-1">{badge.text}</p>
              <p className="text-charcoal/50 text-xs">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
