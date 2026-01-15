export default function CertificationBadges() {
  const badges = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      text: "FL Licensed LMT",
      subtitle: "State Certified"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      text: "NCBTMB Certified",
      subtitle: "National Board"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      ),
      text: "AMTA Member",
      subtitle: "Professional Association"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      ),
      text: "Liability Insured",
      subtitle: "$2M Coverage"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
      ),
      text: "Background Checked",
      subtitle: "Verified Safe"
    }
  ];

  return (
    <section className="py-20 bg-charcoal">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-serif font-light text-gold-300 mb-4 tracking-wide">
            Licensed & Certified
          </h3>
          <p className="text-cream/70 text-sm">Your safety and wellness are our top priorities</p>
        </div>
        <div className="flex justify-center gap-8 flex-wrap max-w-5xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-black border-l-2 border-gold-300/30 p-6 min-w-[150px] transition-opacity duration-300 hover:opacity-95"
            >
              <div className="text-gold-300 mb-4">
                {badge.icon}
              </div>
              <p className="text-cream font-medium text-sm tracking-wide mb-1">{badge.text}</p>
              <p className="text-cream/60 text-xs">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
