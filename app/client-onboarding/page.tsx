import ClientOnboardingForm from '@/components/ClientOnboardingForm';

export const metadata = {
  title: 'Client Onboarding | Aurea Essence Massage',
  description: 'Complete your business information to get started with your mobile massage website.',
};

export default function ClientOnboardingPage() {
  return (
    <div className="min-h-screen bg-beige-300 pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-medium text-charcoal mb-4 tracking-wide">
            Welcome to Your Website Setup
          </h1>
          <p className="text-charcoal/70 text-base max-w-2xl mx-auto">
            Please complete the form below with your business information. This will help us
            customize your website with accurate details about your services.
          </p>
        </div>

        <ClientOnboardingForm />
      </div>
    </div>
  );
}
