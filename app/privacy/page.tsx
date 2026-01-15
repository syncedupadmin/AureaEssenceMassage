import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ivory & Stone',
  description: 'Privacy policy for Ivory & Stone mobile massage services.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-charcoal-900 mb-6">
            Privacy Policy
          </h1>

          <p className="text-lg text-charcoal-900/70 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Overview
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                [Your Brand] ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Information We Collect
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-charcoal-900/70 space-y-2 mb-4">
                <li>Schedule a massage appointment</li>
                <li>Contact us with inquiries</li>
                <li>Subscribe to our newsletter</li>
                <li>Provide feedback or reviews</li>
              </ul>
              <p className="text-charcoal-900/70 leading-relaxed">
                This information may include: name, email address, phone number, address, payment information, and health-related information relevant to your massage service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                How We Use Your Information
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-charcoal-900/70 space-y-2">
                <li>Provide and manage our massage services</li>
                <li>Process your appointments and payments</li>
                <li>Communicate with you about your appointments</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Information Security
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Your Rights
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-charcoal-900/70 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-semibold text-charcoal-900 mb-4">
                Contact Us
              </h2>
              <p className="text-charcoal-900/70 leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
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
