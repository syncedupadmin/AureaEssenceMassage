/**
 * Business Configuration
 *
 * Centralized configuration for all business information.
 * Set values to null or empty strings to hide associated UI elements.
 *
 * IMPORTANT: Do not commit real contact info to public repos.
 * Use environment variables in production.
 */

export const businessConfig = {
  // Brand
  name: 'Áurea Essence Massage',
  tagline: 'Premium Mobile Massage Therapy',

  // Contact Information
  // Set to null to hide the Connect section in footer and contact page
  contact: {
    phone: null as string | null, // Format: "(555) 123-4567"
    email: null as string | null, // Format: "hello@aureaessence.com"
    textNumber: null as string | null, // Format: "(555) 123-4567"
  },

  // Service Area
  serviceArea: {
    primary: 'South Florida',
    regions: ['Miami', 'Fort Lauderdale', 'Palm Beach'],
    expandable: true, // Show "Contact us for special requests" message
  },

  // Business Hours
  hours: {
    display: '8am - 9pm',
    days: 'Daily',
    note: 'By appointment only',
  },

  // Booking Policy (single source of truth)
  bookingPolicy: {
    advanceNotice: '24 hours',
    sameDayAvailable: true,
    cancellationNotice: '24 hours',
    cancellationFee: '50%',
    reschedulingNotice: '24 hours',
    reschedulingFee: null as string | null, // null = free
  },

  // Payment Methods
  paymentMethods: ['Credit Cards', 'Cash', 'Venmo', 'Zelle'],

  // Feature Flags - Control what claims/features are displayed
  features: {
    // Certifications - only enable when verified
    showCertificationBadges: false,
    certifications: {
      licensedLMT: false,
      ncbtmbCertified: false,
      amtaMember: false,
      fullyInsured: false,
      backgroundChecked: false,
    },

    // Service Add-ons - only enable when confirmed available
    addOns: {
      aromatherapy: true, // Generally available
      cbdOil: false, // Requires verification
      extendedTime: true, // Generally available
      hotStones: true, // Generally available
    },

    // Package inclusions - only enable when confirmed
    packageInclusions: {
      complimentaryGift: false, // Disable until specified
      percussionTherapy: false, // Disable until confirmed
      premiumProductUpgrade: true, // Generic enough to keep
    },

    // What's included in every session
    standardInclusions: [
      'Professional massage table',
      'Fresh linens',
      'Premium massage oils',
      'Relaxing music',
    ],

    // External booking integration
    bookingIntegration: {
      enabled: false,
      provider: null as 'calendly' | 'acuity' | 'square' | null,
      url: null as string | null,
    },
  },

  // Social Media - set to null to hide
  social: {
    instagram: null as string | null,
    facebook: null as string | null,
  },

  // Legal
  legal: {
    businessEntity: 'Áurea Essence Massage',
    established: null as number | null,
  },
} as const;

// Type exports for type safety throughout the app
export type BusinessConfig = typeof businessConfig;
export type ContactInfo = typeof businessConfig.contact;
export type BookingPolicy = typeof businessConfig.bookingPolicy;
export type Features = typeof businessConfig.features;

// Helper functions
export function hasContactInfo(): boolean {
  const { phone, email, textNumber } = businessConfig.contact;
  return !!(phone || email || textNumber);
}

export function hasAnyContact(): boolean {
  return !!(businessConfig.contact.phone || businessConfig.contact.email);
}

export function getPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

export function getSmsHref(phone: string): string {
  return `sms:${phone.replace(/[^0-9+]/g, '')}`;
}

export function getEmailHref(email: string): string {
  return `mailto:${email}`;
}
