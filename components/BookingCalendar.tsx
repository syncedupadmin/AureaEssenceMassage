'use client';

import { useEffect } from 'react';

export default function BookingCalendar() {
  useEffect(() => {
    // Load the form embed script
    const script = document.createElement('script');
    script.src = 'https://links.syncedupsolutions.com/js/form_embed.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <iframe
        src="https://links.syncedupsolutions.com/widget/booking/EggKHnSiJTHNpypqk4wA"
        style={{
          width: '100%',
          border: 'none',
          overflow: 'hidden',
          minHeight: '600px',
        }}
        scrolling="no"
        id="EggKHnSiJTHNpypqk4wA_1759351364387"
        title="Booking Calendar"
      />
    </div>
  );
}
