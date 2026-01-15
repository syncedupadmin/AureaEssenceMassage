'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { businessConfig, getPhoneHref, hasAnyContact } from '@/config/business';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { phone, textNumber } = businessConfig.contact;
  const callNumber = phone || textNumber;
  const showCallButton = !!callNumber;

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-rose-500 text-white px-4 py-3 shadow-2xl safe-bottom transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-center gap-3 max-w-screen-sm mx-auto">
        {showCallButton && (
          <a
            href={getPhoneHref(callNumber)}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-rose-500 px-4 py-2.5 rounded-sm font-medium text-sm tracking-wide active:scale-98 transition-transform"
            aria-label="Call to book an appointment"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            Call
          </a>
        )}
        <Link
          href="/contact"
          className={`${showCallButton ? 'flex-1' : 'flex-1 max-w-xs'} flex items-center justify-center gap-2 bg-white text-rose-500 px-4 py-2.5 rounded-sm font-medium text-sm tracking-wide active:scale-98 transition-transform`}
          aria-label="Book an appointment online"
        >
          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Book Online
        </Link>
      </div>
    </div>
  );
}
