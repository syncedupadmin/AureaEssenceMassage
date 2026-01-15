import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Ivory & Stone',
  description: 'Terms of service for Ivory & Stone mobile massage services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-900 mb-6">
            Terms of Service
          </h1>

          <p className="text-lg text-charcoal-900/70 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Agreement to Terms
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed">
                By accessing or using [Your Brand] mobile massage services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Service Description
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                [Your Brand] provides professional mobile massage therapy services to clients in South Florida, from Delray Beach to Miami. Our licensed massage therapists travel to your home, hotel, or office to provide spa-quality massage treatments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Booking and Cancellation Policy
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                <strong>Booking:</strong> Appointments must be booked at least 24 hours in advance, subject to therapist availability. Same-day appointments may be available upon request.
              </p>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                <strong>Cancellation:</strong> Cancellations must be made at least 24 hours before your scheduled appointment. Late cancellations or no-shows may be subject to a cancellation fee of up to 50% of the service cost.
              </p>
              <p className="text-charcoal-900/70 leading-relaxed">
                <strong>Rescheduling:</strong> We understand that plans change. You may reschedule your appointment with at least 24 hours notice at no charge.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Payment Terms
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                Payment is due at the time of service. We accept cash, credit cards, Venmo, and Zelle. Gratuities are not included in the service price and are at your discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Client Responsibilities
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                Clients are responsible for:
              </p>
              <ul className="list-disc list-inside text-charcoal-900/70 space-y-2">
                <li>Providing a clean, quiet space for the massage (approximately 8x10 feet)</li>
                <li>Disclosing any medical conditions or allergies that may affect the massage</li>
                <li>Being present at the scheduled location at the appointment time</li>
                <li>Providing accurate contact information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Health and Safety
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed">
                Our massage services are intended for relaxation and wellness. They are not a substitute for medical care. Please consult with your healthcare provider before booking if you have any medical conditions or concerns. We reserve the right to refuse service if we believe it may be contraindicated for your health.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Professional Conduct
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed">
                All our therapists adhere to professional standards and ethical conduct. Any inappropriate behavior from clients will result in immediate termination of the session without refund, and may result in being banned from future services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed">
                [Your Brand] shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Contact Information
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed">
                For questions about these Terms of Service, please contact us:
              </p>
              <p className="text-charcoal-900/70 mt-2">
                Email: <a href="mailto:info@yourbrand.com" className="text-gold-600 hover:text-gold-700">info@yourbrand.com</a><br />
                Phone: <a href="tel:+15615551234" className="text-gold-600 hover:text-gold-700">(561) 555-1234</a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gold-400/20">
            <Link
              href="/"
              className="inline-block text-gold-600 hover:text-gold-700 font-medium transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
