import ClientOnboardingForm from '@/components/ClientOnboardingForm';

export const metadata = {
  title: 'Client Onboarding | Destiny Eden Mobile Massage',
  description: 'Complete your business information to get started with your mobile massage website.',
};

export default function ClientOnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-black py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-light text-cream mb-4">
            Welcome to Your Website Setup
          </h1>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Please complete the form below with your business information. This will help us
            customize your website with accurate details about your services.
          </p>
        </div>

        <ClientOnboardingForm />
      </div>
    </div>
  );
}
