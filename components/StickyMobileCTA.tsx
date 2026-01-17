'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  businessConfig,
  getWhatsAppHref,
  getSmsHref,
} from '@/config/business';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const { phoneRaw } = businessConfig.contact;
  const bookingMessage = businessConfig.bookingMessage;
  const showContactButtons = !!phoneRaw;

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
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-charcoal text-white px-4 py-3 shadow-2xl safe-bottom transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-center gap-2 max-w-screen-sm mx-auto">
        {/* WhatsApp Button */}
        {showContactButtons && (
          <a
            href={getWhatsAppHref(phoneRaw, bookingMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2.5 rounded-sm font-medium text-sm tracking-wide active:scale-98 transition-transform"
            aria-label="Contact via WhatsApp"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        )}

        {/* Text/SMS Button */}
        {showContactButtons && (
          <a
            href={getSmsHref(phoneRaw, bookingMessage)}
            className="flex-1 flex items-center justify-center gap-2 bg-rose-400 text-white px-3 py-2.5 rounded-sm font-medium text-sm tracking-wide active:scale-98 transition-transform"
            aria-label="Send a text message"
          >
            <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Text
          </a>
        )}

        {/* Book Online Button */}
        <Link
          href="/contact"
          className={`${showContactButtons ? 'flex-1' : 'flex-1 max-w-xs'} flex items-center justify-center gap-2 bg-rose-500 text-white px-3 py-2.5 rounded-sm font-medium text-sm tracking-wide active:scale-98 transition-transform`}
          aria-label="Book an appointment online"
        >
          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          Book
        </Link>
      </div>
    </div>
  );
}
