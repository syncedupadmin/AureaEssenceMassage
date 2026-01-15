'use client';

import { useEffect } from 'react';
import CTAButton from '@/components/CTAButton';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console in development
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 sm:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-12">
          <div className="w-16 h-16 mx-auto mb-8 text-gold-300">
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-cream mb-6 tracking-wide">
            Something Went Wrong
          </h1>
          <p className="text-base text-cream/70 mb-10">
            We encountered an unexpected error. Please try again or contact us if the problem persists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
          <button
            onClick={reset}
            className="inline-block px-10 py-4 font-medium transition-all duration-300 text-center tracking-wide bg-gold-300 text-black hover:bg-gold-400 shadow-sm hover:shadow-md"
          >
            Try Again
          </button>
          <CTAButton href="/" variant="outline">
            Return Home
          </CTAButton>
        </div>

        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="bg-charcoal border border-charcoal-light p-6 text-left">
            <h3 className="text-sm font-medium text-cream mb-2">
              Error Details (Development Only)
            </h3>
            <p className="text-xs text-cream/60 font-mono">
              Digest: {error.digest}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
