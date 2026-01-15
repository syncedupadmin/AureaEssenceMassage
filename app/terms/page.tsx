import type { Metadata } from 'next';
import Link from 'next/link';
import { businessConfig } from '@/config/business';

export const metadata: Metadata = {
  title: 'Terms of Service | Áurea Essence Massage',
  description: 'Terms of service for Áurea Essence mobile massage services.',
};

export default function TermsPage() {
  const { bookingPolicy, paymentMethods, serviceArea } = businessConfig;

  return (
    <div className="min-h-screen bg-champagne pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-sm shadow-elegant p-8 md:p-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Terms of Service
          </h1>

          <p className="text-base text-charcoal/60 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Agreement to Terms
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                By accessing or using {businessConfig.name} mobile massage services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Service Description
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                {businessConfig.name} provides professional mobile massage therapy services throughout {serviceArea.primary}. Our massage therapists travel to your home, hotel, or office to provide spa-quality massage treatments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Booking and Cancellation Policy
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                <strong className="text-charcoal">Booking:</strong> Appointments should be booked at least {bookingPolicy.advanceNotice} in advance, subject to therapist availability. {bookingPolicy.sameDayAvailable && 'Same-day appointments may be available upon request.'}
              </p>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                <strong className="text-charcoal">Cancellation:</strong> Cancellations must be made at least {bookingPolicy.cancellationNotice} before your scheduled appointment. Late cancellations or no-shows may be subject to a cancellation fee of up to {bookingPolicy.cancellationFee} of the service cost.
              </p>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                <strong className="text-charcoal">Rescheduling:</strong> We understand that plans change. You may reschedule your appointment with at least {bookingPolicy.reschedulingNotice} notice {bookingPolicy.reschedulingFee ? `for a fee of ${bookingPolicy.reschedulingFee}` : 'at no charge'}.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Payment Terms
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                Payment is due at the time of service. We accept {paymentMethods.join(', ')}. Gratuities are not included in the service price and are at your discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Client Responsibilities
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                Clients are responsible for:
              </p>
              <ul className="list-disc list-inside text-charcoal/70 space-y-2 text-sm">
                <li>Providing a clean, quiet space for the massage (approximately 8x10 feet)</li>
                <li>Disclosing any medical conditions or allergies that may affect the massage</li>
                <li>Being present at the scheduled location at the appointment time</li>
                <li>Providing accurate contact information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Health and Safety
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                Our massage services are intended for relaxation and wellness. They are not a substitute for medical care. Please consult with your healthcare provider before booking if you have any medical conditions or concerns. We reserve the right to refuse service if we believe it may be contraindicated for your health.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Professional Conduct
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                All our therapists adhere to professional standards and ethical conduct. Any inappropriate behavior from clients will result in immediate termination of the session without refund, and may result in being banned from future services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Limitation of Liability
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                {businessConfig.name} shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Contact Information
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                For questions about these Terms of Service, please contact us through our website.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-champagne-200">
            <Link
              href="/"
              className="inline-block text-rose-500 hover:text-rose-600 font-medium transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
