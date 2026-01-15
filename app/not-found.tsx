import Link from 'next/link';
import CTAButton from '@/components/CTAButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-serif font-bold text-gold-400 mb-4">404</h1>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-charcoal-900/70 mb-8">
            We couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>
        </div>

        <div className="mb-12">
          <CTAButton href="/" variant="primary">
            Return Home
          </CTAButton>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/services"
              className="block p-4 border border-gold-400/20 rounded-md hover:border-gold-400 hover:bg-gold-50 transition-all"
            >
              <h4 className="font-semibold text-charcoal-900 mb-1">Our Services</h4>
              <p className="text-sm text-charcoal-900/70">
                Explore our massage offerings
              </p>
            </Link>
            <Link
              href="/packages"
              className="block p-4 border border-gold-400/20 rounded-md hover:border-gold-400 hover:bg-gold-50 transition-all"
            >
              <h4 className="font-semibold text-charcoal-900 mb-1">Packages</h4>
              <p className="text-sm text-charcoal-900/70">
                View our curated packages
              </p>
            </Link>
            <Link
              href="/about"
              className="block p-4 border border-gold-400/20 rounded-md hover:border-gold-400 hover:bg-gold-50 transition-all"
            >
              <h4 className="font-semibold text-charcoal-900 mb-1">About Us</h4>
              <p className="text-sm text-charcoal-900/70">
                Learn about our team
              </p>
            </Link>
            <Link
              href="/contact"
              className="block p-4 border border-gold-400/20 rounded-md hover:border-gold-400 hover:bg-gold-50 transition-all"
            >
              <h4 className="font-semibold text-charcoal-900 mb-1">Book Now</h4>
              <p className="text-sm text-charcoal-900/70">
                Schedule your massage
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
