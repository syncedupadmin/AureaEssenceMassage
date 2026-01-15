import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Aurea Essence Massage',
  description: 'Privacy policy for Aurea Essence mobile massage services.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-beige-300 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-sm shadow-elegant p-8 md:p-12">
          <h1 className="text-4xl sm:text-5xl font-serif font-medium text-charcoal mb-6 tracking-wide">
            Privacy Policy
          </h1>

          <p className="text-base text-charcoal/60 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Overview
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                Aurea Essence Massage ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Information We Collect
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-charcoal/70 space-y-2 mb-4 text-sm">
                <li>Schedule a massage appointment</li>
                <li>Contact us with inquiries</li>
                <li>Subscribe to our newsletter</li>
                <li>Provide feedback or reviews</li>
              </ul>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                This information may include: name, email address, phone number, address, payment information, and health-related information relevant to your massage service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                How We Use Your Information
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-charcoal/70 space-y-2 text-sm">
                <li>Provide and manage our massage services</li>
                <li>Process your appointments and payments</li>
                <li>Communicate with you about your appointments</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Information Security
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Your Rights
              </h2>
              <p className="text-charcoal/70 leading-relaxed mb-4 text-sm">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-charcoal/70 space-y-2 text-sm">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-serif font-medium text-charcoal mb-4 tracking-wide">
                Contact Us
              </h2>
              <p className="text-charcoal/70 leading-relaxed text-sm">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-charcoal/70 mt-2 text-sm">
                Email: <a href="mailto:info@aureaessence.com" className="text-rose-500 hover:text-rose-600">info@aureaessence.com</a><br />
                Phone: <a href="tel:+15551234567" className="text-rose-500 hover:text-rose-600">(555) 123-4567</a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-beige-300">
            <Link
              href="/"
              className="inline-block text-rose-500 hover:text-rose-600 font-medium transition-colors text-sm"
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
