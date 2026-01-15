'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

interface Service {
  name: string;
  price: string;
  duration: string;
  description: string;
}

interface OnboardingFormData {
  // Business Information
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  googleBusiness: string;

  // Branding
  brandColors: string;
  preferredFonts: string;

  // Services
  services: Service[];

  // About & Bio
  ownerBio: string;
  businessHistory: string;
  uniqueSellingPoints: string;

  // Credentials
  licenseNumber: string;
  certifications: string;
  insurance: string;
  yearsExperience: string;

  // Availability
  operatingHours: string;
  serviceLocation: string;
  serviceAreas: string;
  travelFee: string;
  paymentMethods: string;
  cancellationPolicy: string;

  // Messaging
  bookingConfirmation: string;
  reminderSchedule: string;
  messageTone: string;

  // Social
  instagram: string;
  facebook: string;
  otherSocial: string;
  reviewPlatform: string;
  testimonials: string;

  // Legal
  hasLegalDocs: string;
  legalDocUrls: string;

  // Authorization
  signature: string;
  agreedToTerms: boolean;

  // Additional
  additionalNotes: string;
}

export default function ClientOnboardingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    defaultValues: {
      services: [{ name: '', price: '', duration: '', description: '' }],
      serviceLocation: 'both',
      bookingConfirmation: 'both',
      reminderSchedule: '24hr',
      messageTone: 'luxury',
      hasLegalDocs: 'no',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'services',
  });

  const sections = [
    'Business Info',
    'Services',
    'About You',
    'Operations',
    'Social & Reviews',
    'Final Details',
  ];

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/client-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again or contact support.');
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-beige-100 border border-beige-300 text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-colors rounded-sm text-sm";
  const labelClasses = "block text-sm font-medium text-charcoal/80 mb-2 tracking-wide";
  const sectionClasses = "space-y-6";

  if (isSubmitted) {
    return (
      <div className="bg-white shadow-elegant p-10 rounded-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-serif text-charcoal mb-4 tracking-wide">Thank You!</h2>
        <p className="text-charcoal/70 mb-6 text-sm">
          Your information has been submitted successfully. We&apos;ll review your details and
          update your website accordingly. You&apos;ll receive a confirmation email shortly.
        </p>
        <a
          href="/"
          className="inline-block bg-rose-500 text-white px-8 py-3 font-medium tracking-wide hover:bg-rose-600 transition-colors rounded-sm"
        >
          Return Home
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-elegant p-8 md:p-10 rounded-sm">
      {/* Progress Indicator */}
      <div className="flex justify-between mb-10 overflow-x-auto pb-2">
        {sections.map((section, index) => (
          <button
            key={section}
            type="button"
            onClick={() => setCurrentSection(index)}
            className={`flex flex-col items-center min-w-[80px] ${
              index === currentSection
                ? 'text-rose-500'
                : index < currentSection
                ? 'text-green-600'
                : 'text-charcoal/40'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 text-sm font-medium ${
                index === currentSection
                  ? 'bg-rose-500 text-white'
                  : index < currentSection
                  ? 'bg-green-600 text-white'
                  : 'bg-beige-200 text-charcoal/40'
              }`}
            >
              {index < currentSection ? '✓' : index + 1}
            </div>
            <span className="text-xs text-center hidden sm:block">{section}</span>
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Section 1: Business Information */}
        {currentSection === 0 && (
          <div className={sectionClasses}>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Business Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>
                  Business Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('businessName', { required: 'Business name is required' })}
                  className={inputClasses}
                  placeholder="Aurea Essence Massage"
                />
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-400">{errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  Owner/Contact Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('ownerName', { required: 'Owner name is required' })}
                  className={inputClasses}
                  placeholder="Your full name"
                />
                {errors.ownerName && (
                  <p className="mt-1 text-sm text-red-400">{errors.ownerName.message}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  className={inputClasses}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className={labelClasses}>
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register('phone', { required: 'Phone is required' })}
                  className={inputClasses}
                  placeholder="(561) 555-1234"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className={labelClasses}>Business Address / Service Area</label>
                <input
                  type="text"
                  {...register('address')}
                  className={inputClasses}
                  placeholder="Delray Beach, FL (or service area)"
                />
              </div>

              <div>
                <label className={labelClasses}>Website (if existing)</label>
                <input
                  type="url"
                  {...register('website')}
                  className={inputClasses}
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className={labelClasses}>Google Business Profile URL</label>
                <input
                  type="url"
                  {...register('googleBusiness')}
                  className={inputClasses}
                  placeholder="https://g.page/..."
                />
              </div>
            </div>

            <div className="border-t border-beige-300 pt-6 mt-6">
              <h3 className="text-lg font-medium text-charcoal mb-4">Branding Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Brand Colors</label>
                  <input
                    type="text"
                    {...register('brandColors')}
                    className={inputClasses}
                    placeholder="e.g., Gold, Black, Cream"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Preferred Fonts</label>
                  <input
                    type="text"
                    {...register('preferredFonts')}
                    className={inputClasses}
                    placeholder="e.g., Elegant, Modern, Script"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Services */}
        {currentSection === 1 && (
          <div className={sectionClasses}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-charcoal">Your Services</h2>
              <button
                type="button"
                onClick={() => append({ name: '', price: '', duration: '', description: '' })}
                className="px-4 py-2 bg-rose-100 text-rose-500 border border-rose-300 rounded hover:bg-rose-200 transition-colors text-sm"
              >
                + Add Service
              </button>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-6 bg-beige-100 border border-beige-300 rounded-lg relative"
                >
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}

                  <h3 className="text-rose-500 font-medium mb-4">Service {index + 1}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClasses}>Service Name</label>
                      <input
                        type="text"
                        {...register(`services.${index}.name`)}
                        className={inputClasses}
                        placeholder="e.g., Swedish Massage"
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Price</label>
                      <input
                        type="text"
                        {...register(`services.${index}.price`)}
                        className={inputClasses}
                        placeholder="e.g., $150 - $250"
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Duration</label>
                      <input
                        type="text"
                        {...register(`services.${index}.duration`)}
                        className={inputClasses}
                        placeholder="e.g., 60 min, 90 min"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className={labelClasses}>Description</label>
                      <textarea
                        {...register(`services.${index}.description`)}
                        rows={2}
                        className={inputClasses}
                        placeholder="Describe this service..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => append({ name: '', price: '', duration: '', description: '' })}
              className="w-full mt-4 py-3 border-2 border-dashed border-beige-300 text-charcoal/50 hover:border-rose-300 hover:text-rose-500 transition-colors rounded"
            >
              + Add Another Service
            </button>
          </div>
        )}

        {/* Section 3: About You */}
        {currentSection === 2 && (
          <div className={sectionClasses}>
            <h2 className="text-2xl font-serif text-charcoal mb-6">About You & Your Business</h2>

            <div>
              <label className={labelClasses}>
                Your Bio / About the Owner <span className="text-rose-500">*</span>
              </label>
              <textarea
                {...register('ownerBio', { required: 'Please tell us about yourself' })}
                rows={4}
                className={inputClasses}
                placeholder="Tell us about yourself, your background, certifications, and what makes you passionate about massage therapy..."
              />
              {errors.ownerBio && (
                <p className="mt-1 text-sm text-red-400">{errors.ownerBio.message}</p>
              )}
            </div>

            <div>
              <label className={labelClasses}>Business History / Story</label>
              <textarea
                {...register('businessHistory')}
                rows={3}
                className={inputClasses}
                placeholder="How did you start your business? What's your story?"
              />
            </div>

            <div>
              <label className={labelClasses}>What Makes You Unique?</label>
              <textarea
                {...register('uniqueSellingPoints')}
                rows={3}
                className={inputClasses}
                placeholder="What sets you apart from other massage therapists? Special techniques, certifications, experience?"
              />
            </div>

            <div className="border-t border-beige-300 pt-6">
              <h3 className="text-lg font-medium text-charcoal mb-4">Credentials & Licensing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>
                    License Number (LMT) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register('licenseNumber', { required: 'License number is required' })}
                    className={inputClasses}
                    placeholder="e.g., MA12345"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Years of Experience</label>
                  <input
                    type="text"
                    {...register('yearsExperience')}
                    className={inputClasses}
                    placeholder="e.g., 10+ years"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Certifications & Training</label>
                  <textarea
                    {...register('certifications')}
                    rows={2}
                    className={inputClasses}
                    placeholder="List your certifications (e.g., Prenatal Certified, Sports Massage, Hot Stone, etc.)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClasses}>Liability Insurance</label>
                  <input
                    type="text"
                    {...register('insurance')}
                    className={inputClasses}
                    placeholder="Insurance provider or policy info"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Operations */}
        {currentSection === 3 && (
          <div className={sectionClasses}>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Operations & Availability</h2>

            <div>
              <label className={labelClasses}>Operating Hours</label>
              <input
                type="text"
                {...register('operatingHours')}
                className={inputClasses}
                placeholder="e.g., Mon-Sat 8am-10pm, Sun 10am-6pm"
              />
            </div>

            <div>
              <label className={labelClasses}>Service Location</label>
              <div className="space-y-2 mt-2">
                {[
                  { value: 'travel', label: 'I travel to clients only' },
                  { value: 'onsite', label: 'Clients come to my location only' },
                  { value: 'both', label: 'Both options available' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center text-charcoal/80">
                    <input
                      type="radio"
                      value={option.value}
                      {...register('serviceLocation')}
                      className="mr-3"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClasses}>Service Areas / Cities Covered</label>
              <input
                type="text"
                {...register('serviceAreas')}
                className={inputClasses}
                placeholder="e.g., Delray Beach, Boca Raton, Fort Lauderdale, Miami..."
              />
            </div>

            <div>
              <label className={labelClasses}>Travel Fee (if applicable)</label>
              <input
                type="text"
                {...register('travelFee')}
                className={inputClasses}
                placeholder="e.g., Free within 10 miles, $1/mile after, $25 for 15+ miles"
              />
            </div>

            <div>
              <label className={labelClasses}>
                Payment Methods Accepted <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                {...register('paymentMethods', { required: 'Payment methods are required' })}
                className={inputClasses}
                placeholder="e.g., Cash, Credit Card, Venmo, Zelle, PayPal"
              />
            </div>

            <div>
              <label className={labelClasses}>Cancellation Policy</label>
              <textarea
                {...register('cancellationPolicy')}
                rows={3}
                className={inputClasses}
                placeholder="What is your cancellation policy? e.g., 24-hour notice required..."
              />
            </div>

            <div className="border-t border-beige-300 pt-6">
              <h3 className="text-lg font-medium text-charcoal mb-4">Messaging Preferences</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Booking Confirmations</label>
                  <select {...register('bookingConfirmation')} className={inputClasses}>
                    <option value="email">Email only</option>
                    <option value="sms">SMS only</option>
                    <option value="both">Both SMS & Email</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Reminder Schedule</label>
                  <select {...register('reminderSchedule')} className={inputClasses}>
                    <option value="24hr">24 hours before</option>
                    <option value="1hr">1 hour before</option>
                    <option value="both">Both</option>
                    <option value="custom">Custom (specify in notes)</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Message Tone</label>
                  <select {...register('messageTone')} className={inputClasses}>
                    <option value="luxury">Luxury / Elegant</option>
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly / Casual</option>
                    <option value="warm">Warm / Welcoming</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Social & Reviews */}
        {currentSection === 4 && (
          <div className={sectionClasses}>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Social Media & Reviews</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Instagram Profile</label>
                <input
                  type="text"
                  {...register('instagram')}
                  className={inputClasses}
                  placeholder="@yourusername or full URL"
                />
              </div>

              <div>
                <label className={labelClasses}>Facebook Page</label>
                <input
                  type="text"
                  {...register('facebook')}
                  className={inputClasses}
                  placeholder="facebook.com/yourpage"
                />
              </div>

              <div>
                <label className={labelClasses}>Other Social Media</label>
                <input
                  type="text"
                  {...register('otherSocial')}
                  className={inputClasses}
                  placeholder="TikTok, LinkedIn, etc."
                />
              </div>

              <div>
                <label className={labelClasses}>Review Platform (Yelp, Google, etc.)</label>
                <input
                  type="url"
                  {...register('reviewPlatform')}
                  className={inputClasses}
                  placeholder="Link to your reviews"
                />
              </div>
            </div>

            <div className="border-t border-beige-300 pt-6 mt-6">
              <h3 className="text-lg font-medium text-charcoal mb-4">Testimonials</h3>
              <div>
                <label className={labelClasses}>Client Testimonials to Feature</label>
                <textarea
                  {...register('testimonials')}
                  rows={4}
                  className={inputClasses}
                  placeholder="Paste any client reviews or testimonials you'd like featured on your website. Include the client's first name if available."
                />
              </div>
            </div>
          </div>
        )}

        {/* Section 6: Final Details */}
        {currentSection === 5 && (
          <div className={sectionClasses}>
            <h2 className="text-2xl font-serif text-charcoal mb-6">Final Details</h2>

            {/* Logo/Photos Notice */}
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg mb-6">
              <h3 className="text-rose-500 font-medium mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Logo & Photos
              </h3>
              <p className="text-charcoal/70 text-sm">
                After submitting this form, please email your logo and any photos (headshot, massage images) to{' '}
                <a href="mailto:support@syncedupsolutions.com" className="text-rose-500 underline">
                  support@syncedupsolutions.com
                </a>
              </p>
            </div>

            <div>
              <label className={labelClasses}>Do you have existing legal documents?</label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center text-charcoal/80">
                  <input
                    type="radio"
                    value="yes"
                    {...register('hasLegalDocs')}
                    className="mr-3"
                  />
                  Yes, I have terms/policies/waivers
                </label>
                <label className="flex items-center text-charcoal/80">
                  <input
                    type="radio"
                    value="no"
                    {...register('hasLegalDocs')}
                    className="mr-3"
                  />
                  No, I need them created
                </label>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Legal Document URLs (if applicable)</label>
              <input
                type="text"
                {...register('legalDocUrls')}
                className={inputClasses}
                placeholder="Links to your existing documents"
              />
            </div>

            <div>
              <label className={labelClasses}>Additional Notes or Requests</label>
              <textarea
                {...register('additionalNotes')}
                rows={4}
                className={inputClasses}
                placeholder="Anything else you'd like us to know? Special requests, specific features, etc."
              />
            </div>

            <div className="border-t border-beige-300 pt-6">
              <h3 className="text-lg font-medium text-charcoal mb-4">Authorization</h3>

              <div>
                <label className={labelClasses}>
                  Digital Signature (Type Your Full Name) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('signature', { required: 'Please sign with your full name' })}
                  className={inputClasses}
                  placeholder="Your full legal name"
                />
                {errors.signature && (
                  <p className="mt-1 text-sm text-red-400">{errors.signature.message}</p>
                )}
              </div>

              <label className="flex items-start mt-4 text-charcoal/80">
                <input
                  type="checkbox"
                  {...register('agreedToTerms', { required: 'You must agree to continue' })}
                  className="mt-1 mr-3"
                />
                <span className="text-sm">
                  I confirm that all information provided is accurate and I authorize SyncedUp
                  Solutions to use this information to build and customize my website.
                </span>
              </label>
              {errors.agreedToTerms && (
                <p className="mt-1 text-sm text-red-400">{errors.agreedToTerms.message}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 pt-6 border-t border-beige-300">
          <button
            type="button"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            className={`px-6 py-3 border border-beige-300 text-charcoal rounded hover:bg-beige-200 transition-colors ${
              currentSection === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={currentSection === 0}
          >
            ← Previous
          </button>

          {currentSection < sections.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentSection(currentSection + 1)}
              className="px-6 py-3 bg-rose-500 text-white font-medium rounded hover:bg-rose-600 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 bg-rose-500 text-white font-medium rounded transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-600'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Information'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
