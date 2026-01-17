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
  tagline: 'Luxury Wellness, Delivered to Your Door',

  // Contact Information
  // Set to null to hide the Connect section in footer and contact page
  contact: {
    phone: '(305) 519-4034',
    phoneRaw: '3055194034', // For WhatsApp/SMS links
    email: null as string | null, // Format: "hello@aureaessence.com"
    textNumber: '(305) 519-4034',
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
      aromatherapy: true,
      cbdOil: true,
      hotStones: true,
      extendedTime: true,
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

  // Prefilled message for WhatsApp/SMS
  bookingMessage: "Hi Áurea Essence Massage, I'd like to book a session.",
} as const;

/**
 * Core Services - The main massage services offered
 */
export const coreServices = [
  {
    id: 'swedish',
    title: 'Swedish Massage',
    shortDescription: 'Flowing strokes for deep relaxation and stress relief.',
    description: 'Long, flowing strokes release tension from head to toe. Customized pressure and technique tailored to your preferences.',
    durations: ['60 min', '90 min', '120 min'],
    idealFor: 'Anyone seeking relaxation and stress relief',
    benefits: [
      'Reduces stress and anxiety',
      'Improves circulation',
      'Promotes better sleep',
      'Eases muscle tension',
    ],
    imageSrc: '/images/generated/service-swedish.png',
    imageAlt: 'Swedish Massage therapy',
  },
  {
    id: 'deep-tissue',
    title: 'Deep Tissue Massage',
    shortDescription: 'Targeted therapy for chronic tension and muscle recovery.',
    description: 'Targeted relief for chronic tension and muscle recovery. Advanced techniques reach deep muscle layers, releasing persistent stress.',
    durations: ['60 min', '90 min', '120 min'],
    idealFor: 'Those with chronic tension or muscle pain',
    benefits: [
      'Relieves chronic muscle pain',
      'Breaks up scar tissue',
      'Improves athletic recovery',
      'Increases range of motion',
    ],
    imageSrc: '/images/generated/service-deep-tissue.png',
    imageAlt: 'Deep Tissue Massage',
  },
  {
    id: 'reflexology',
    title: 'Reflexology',
    shortDescription: 'Pressure point therapy targeting feet for whole-body wellness.',
    description: 'Specialized pressure point therapy focused on the feet. Based on the principle that specific points correspond to different body systems.',
    durations: ['45 min', '60 min'],
    idealFor: 'Those seeking holistic healing and relaxation',
    benefits: [
      'Promotes natural healing',
      'Reduces tension throughout the body',
      'Improves circulation',
      'Enhances overall well-being',
    ],
    imageSrc: '/images/generated/service-reflexology.png',
    imageAlt: 'Reflexology foot massage',
  },
  {
    id: 'lymphatic-drainage',
    title: 'Lymphatic Drainage Massage',
    shortDescription: 'Gentle technique to support the body\'s natural detox.',
    description: 'Gentle, rhythmic massage technique designed to stimulate the lymphatic system and support the body\'s natural detoxification process.',
    durations: ['60 min', '90 min'],
    idealFor: 'Those with swelling, post-surgery, or seeking detox',
    benefits: [
      'Reduces swelling and water retention',
      'Supports immune function',
      'Promotes detoxification',
      'Aids post-surgical recovery',
    ],
    imageSrc: '/images/generated/service-lymphatic-drainage.png',
    imageAlt: 'Lymphatic Drainage Massage',
  },
  {
    id: 'post-surgical',
    title: 'Post-Surgical Massage',
    shortDescription: 'Specialized recovery support for post-operative healing.',
    description: 'Specialized therapeutic massage designed to support healing after surgical procedures. Gentle techniques reduce scar tissue and improve recovery.',
    durations: ['60 min', '90 min'],
    idealFor: 'Post-operative recovery, particularly cosmetic procedures',
    benefits: [
      'Reduces post-surgical swelling',
      'Minimizes scar tissue formation',
      'Speeds up recovery time',
      'Improves range of motion',
    ],
    imageSrc: '/images/generated/service-post-surgical.png',
    imageAlt: 'Post-Surgical Massage therapy',
  },
  {
    id: 'couples',
    title: 'Couples Massage',
    shortDescription: 'Share a relaxing experience with someone special.',
    description: 'Share a relaxing experience with your partner. Consecutive sessions create the perfect setting for connection and relaxation together.',
    durations: ['120 min', '180 min'],
    idealFor: 'Partners, anniversaries, special occasions',
    benefits: [
      'Shared relaxation experience',
      'Perfect for special occasions',
      'Customized for each partner',
      'Creates lasting memories',
    ],
    imageSrc: '/images/generated/service-couples.png',
    imageAlt: 'Couples Massage experience',
  },
  {
    id: 'prenatal',
    title: 'Prenatal Massage',
    shortDescription: 'Safe, nurturing care for expectant mothers.',
    description: 'Specially designed for expectant mothers. Safe, nurturing techniques ease pregnancy-related discomfort with proper positioning.',
    durations: ['60 min', '90 min'],
    idealFor: 'Expectant mothers (2nd & 3rd trimester)',
    benefits: [
      'Reduces pregnancy discomfort',
      'Decreases swelling',
      'Improves sleep quality',
      'Reduces stress and anxiety',
    ],
    imageSrc: '/images/generated/service-prenatal.png',
    imageAlt: 'Prenatal Massage',
  },
] as const;

/**
 * Add-ons - Optional enhancements
 */
export const serviceAddOns = [
  {
    id: 'hot-stones',
    title: 'Hot Stones',
    description: 'Heated basalt stones for deeper relaxation',
    enabled: businessConfig.features.addOns.hotStones,
    icon: 'fire',
  },
  {
    id: 'cbd-oil',
    title: 'CBD Oil',
    description: 'Therapeutic CBD-infused treatment',
    enabled: businessConfig.features.addOns.cbdOil,
    icon: 'leaf',
  },
  {
    id: 'aromatherapy',
    title: 'Aromatherapy',
    description: 'Essential oil blends tailored to your needs',
    enabled: businessConfig.features.addOns.aromatherapy,
    icon: 'sparkles',
  },
] as const;

/**
 * Pricing Configuration
 * Set prices to null to show "Pricing available upon request"
 */
export const pricingConfig = {
  services: {
    'swedish': {
      '60 min': null as number | null,
      '90 min': null as number | null,
      '120 min': null as number | null,
    },
    'deep-tissue': {
      '60 min': null as number | null,
      '90 min': null as number | null,
      '120 min': null as number | null,
    },
    'reflexology': {
      '45 min': null as number | null,
      '60 min': null as number | null,
    },
    'lymphatic-drainage': {
      '60 min': null as number | null,
      '90 min': null as number | null,
    },
    'post-surgical': {
      '60 min': null as number | null,
      '90 min': null as number | null,
    },
    'couples': {
      '120 min': null as number | null,
      '180 min': null as number | null,
    },
    'prenatal': {
      '60 min': null as number | null,
      '90 min': null as number | null,
    },
  },
  addOns: {
    'hot-stones': null as number | null,
    'cbd-oil': null as number | null,
    'aromatherapy': null as number | null,
  },
} as const;

// Type exports for type safety throughout the app
export type BusinessConfig = typeof businessConfig;
export type ContactInfo = typeof businessConfig.contact;
export type BookingPolicy = typeof businessConfig.bookingPolicy;
export type Features = typeof businessConfig.features;
export type CoreService = typeof coreServices[number];
export type ServiceAddOn = typeof serviceAddOns[number];

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

export function getSmsHref(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  // Use & for iOS compatibility, some Android uses ?
  return `sms:${cleanPhone}${encodedMessage ? `&body=${encodedMessage}` : ''}`;
}

export function getWhatsAppHref(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/1${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

export function getEmailHref(email: string): string {
  return `mailto:${email}`;
}

/**
 * Get price display string for a service duration
 * Returns formatted price or "Pricing available upon request" if null
 */
export function getServicePrice(serviceId: string, duration: string): string | null {
  const serviceKey = serviceId as keyof typeof pricingConfig.services;
  const servicePricing = pricingConfig.services[serviceKey];
  if (!servicePricing) return null;

  const price = servicePricing[duration as keyof typeof servicePricing];
  if (price === null || price === undefined) return null;

  return `$${price}`;
}

/**
 * Get add-on price display string
 * Returns formatted price or null if not set
 */
export function getAddOnPrice(addOnId: string): string | null {
  const price = pricingConfig.addOns[addOnId as keyof typeof pricingConfig.addOns];
  if (price === null || price === undefined) return null;

  return `+$${price}`;
}

/**
 * Check if any prices are set for a service
 */
export function hasAnyPricing(serviceId: string): boolean {
  const serviceKey = serviceId as keyof typeof pricingConfig.services;
  const servicePricing = pricingConfig.services[serviceKey];
  if (!servicePricing) return false;

  return Object.values(servicePricing).some(price => price !== null);
}

/**
 * Get list of service names for dropdowns
 */
export function getServiceNames(): string[] {
  return coreServices.map(s => s.title);
}

/**
 * Get enabled add-ons
 */
export function getEnabledAddOns() {
  return serviceAddOns.filter(a => a.enabled);
}
