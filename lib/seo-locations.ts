/**
 * SEO Location Data
 * City-specific data for local SEO landing pages.
 * Each city page targets "[service] [city]" keyword clusters.
 */

export interface LocationData {
  slug: string;
  city: string;
  county: string;
  stateAbbr: string;
  heroTagline: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  localContext: string;
  neighborhoods: string[];
  nearbyAreas: string[];
  venueTypes: string[];
  uniqueAngle: string;
  services: {
    name: string;
    localNote: string;
  }[];
}

export const locations: LocationData[] = [
  {
    slug: 'mobile-massage-miami',
    city: 'Miami',
    county: 'Miami-Dade',
    stateAbbr: 'FL',
    heroTagline: "Miami's Premier Mobile Massage Service",
    metaTitle: 'Mobile Massage Miami — Luxury In-Home Massage Therapy',
    metaDescription: "Luxury mobile massage therapy in Miami. We bring the spa to your Brickell high-rise, South Beach hotel, Coral Gables residence, or any Miami location. Book today — available 8am–11pm daily.",
    intro: "Miami moves fast. Whether you're unwinding after a long week in Brickell or recovering between sessions at a South Beach hotel, Áurea Essence Massage brings certified, luxury mobile massage therapy directly to your door — no commute, no spa fees, no waiting room.",
    localContext: "We serve all of Miami-Dade County, including Miami Beach, Brickell, Coral Gables, Coconut Grove, Wynwood, Downtown Miami, Key Biscayne, Aventura, and beyond. From penthouse suites to private waterfront residences, our therapist arrives fully equipped.",
    neighborhoods: ['Brickell', 'South Beach', 'Coral Gables', 'Coconut Grove', 'Wynwood', 'Downtown Miami', 'Key Biscayne', 'Edgewater', 'Midtown', 'Little Havana'],
    nearbyAreas: ['Miami Beach', 'Aventura', 'Doral', 'Hialeah', 'North Miami', 'Pinecrest'],
    venueTypes: ['Luxury condos & high-rises', 'Hotels & boutique properties', 'Private residences', 'Yachts & watercraft', 'Corporate offices', 'Event venues'],
    uniqueAngle: "Miami's luxury lifestyle deserves equally luxurious self-care. Whether you're a resident of a Brickell condo or visiting for Art Basel, our sessions are tailored to deliver a five-star experience exactly where you are.",
    services: [
      { name: 'Swedish Massage', localNote: 'Popular with Miami Beach hotel guests and Brickell residents seeking stress relief after long work weeks.' },
      { name: 'Deep Tissue Massage', localNote: 'Ideal for South Florida athletes, gym-goers, and professionals carrying tension from long commutes.' },
      { name: 'Couples Massage', localNote: 'Perfect for romantic getaways in South Beach, anniversary stays, or any special occasion in Miami.' },
      { name: 'Prenatal Massage', localNote: 'Safe, nurturing care for expectant mothers throughout Miami-Dade County.' },
      { name: 'Lymphatic Drainage', localNote: 'Highly sought after for post-surgical recovery following procedures at Miami\'s cosmetic surgery centers.' },
    ],
  },
  {
    slug: 'mobile-massage-fort-lauderdale',
    city: 'Fort Lauderdale',
    county: 'Broward',
    stateAbbr: 'FL',
    heroTagline: "Fort Lauderdale's Luxury Mobile Massage",
    metaTitle: 'Mobile Massage Fort Lauderdale — In-Home Massage Therapy',
    metaDescription: "Luxury mobile massage therapy in Fort Lauderdale and Broward County. We come to your Las Olas home, beach hotel, or yacht. Swedish, deep tissue, couples & more. Book today — 8am–11pm daily.",
    intro: "Fort Lauderdale's vibrant waterfront culture deserves equally world-class wellness. Áurea Essence Massage delivers certified, luxury mobile massage therapy to your Fort Lauderdale home, hotel, boat, or office — without you ever having to leave your perfect spot.",
    localContext: "We serve all of Broward County, including Fort Lauderdale Beach, Las Olas, Victoria Park, Harbor Beach, Weston, Plantation, Davie, Pompano Beach, Deerfield Beach, and surrounding areas. Whether you're docked at a marina or relaxing in your Weston home, we come to you.",
    neighborhoods: ['Las Olas', 'Fort Lauderdale Beach', 'Victoria Park', 'Harbor Beach', 'Rio Vista', 'Flagler Village', 'Wilton Manors', 'Oakland Park'],
    nearbyAreas: ['Weston', 'Plantation', 'Davie', 'Dania Beach', 'Pompano Beach', 'Deerfield Beach', 'Lauderdale-by-the-Sea'],
    venueTypes: ['Beachfront hotels & resorts', 'Yachts & marinas', 'Waterfront residences', 'Luxury rentals', 'Corporate wellness events', 'Private estates'],
    uniqueAngle: "Fort Lauderdale is known as the 'Venice of America' — a city of waterways, luxury yachts, and refined coastal living. Our mobile massage service matches that standard, delivering spa-quality therapy to wherever you call home.",
    services: [
      { name: 'Swedish Massage', localNote: 'Beloved by Fort Lauderdale beach visitors, snowbirds, and Las Olas professionals.' },
      { name: 'Deep Tissue Massage', localNote: 'Trusted by Broward County athletes and fitness enthusiasts for serious muscle recovery.' },
      { name: 'Couples Massage', localNote: 'A favorite for romantic stays at Fort Lauderdale beach resorts or aboard private yachts.' },
      { name: 'Post-Surgical Massage', localNote: 'Supporting recovery for clients following procedures at Broward Health and surrounding medical centers.' },
      { name: 'Reflexology', localNote: 'A restorative complement for Fort Lauderdale\'s active walking and beach lifestyle.' },
    ],
  },
  {
    slug: 'mobile-massage-palm-beach',
    city: 'Palm Beach',
    county: 'Palm Beach',
    stateAbbr: 'FL',
    heroTagline: 'Palm Beach Luxury Mobile Massage',
    metaTitle: 'Mobile Massage Palm Beach — Luxury In-Home Massage Therapy',
    metaDescription: "Luxury mobile massage therapy in Palm Beach and Palm Beach County. Serving Worth Avenue estates, waterfront properties, Palm Beach Gardens, and Jupiter. Available 8am–11pm daily.",
    intro: "Palm Beach is synonymous with understated luxury and refined living. Áurea Essence Massage honors that standard — bringing certified, discreet, spa-quality massage therapy directly to your Palm Beach estate, resort suite, or private residence.",
    localContext: "We serve Palm Beach Island, West Palm Beach, Palm Beach Gardens, Jupiter, Juno Beach, Boynton Beach, Delray Beach, and across Palm Beach County. Our therapist arrives with the same discretion and professionalism expected in the Palm Beaches.",
    neighborhoods: ['Palm Beach Island', 'West Palm Beach', 'Palm Beach Gardens', 'Jupiter', 'Juno Beach', 'North Palm Beach', 'Tequesta'],
    nearbyAreas: ['Boynton Beach', 'Delray Beach', 'Boca Raton', 'Lake Worth Beach', 'Greenacres'],
    venueTypes: ['Estate homes & private residences', 'Luxury waterfront properties', 'Premier resort hotels', 'Golf & country club properties', 'Private events', 'Vacation rentals'],
    uniqueAngle: "The Palm Beaches attract those who value the best in everything. Our mobile massage service delivers that same level of excellence — every session is unhurried, personalized, and built around your comfort in your own space.",
    services: [
      { name: 'Swedish Massage', localNote: 'The preferred choice for Palm Beach seasonal residents and winter visitors seeking pure relaxation.' },
      { name: 'Deep Tissue Massage', localNote: 'Favored by Palm Beach Gardens golfers and Jupiter athletes for targeted recovery.' },
      { name: 'Couples Massage', localNote: 'Ideal for anniversary celebrations, special retreats, and romantic stays on Palm Beach Island.' },
      { name: 'Prenatal Massage', localNote: 'Gentle, specialized care for expecting mothers across Palm Beach County.' },
      { name: 'Lymphatic Drainage', localNote: 'Highly requested for post-surgical recovery, particularly following cosmetic procedures in the Palm Beach area.' },
    ],
  },
  {
    slug: 'mobile-massage-boca-raton',
    city: 'Boca Raton',
    county: 'Palm Beach',
    stateAbbr: 'FL',
    heroTagline: 'Boca Raton Mobile Massage — Luxury to Your Door',
    metaTitle: 'Mobile Massage Boca Raton — Luxury In-Home Massage Therapy',
    metaDescription: "Luxury mobile massage therapy in Boca Raton. We come to your Mizner Park home, Boca resort, or office. Swedish, deep tissue, couples, lymphatic drainage & more. Available 8am–11pm daily.",
    intro: "Boca Raton's affluent communities and resort lifestyle deserve wellness that keeps pace. Áurea Essence Massage delivers expert mobile massage therapy to your Boca Raton home, hotel suite, or office — bringing the full spa experience to you without the drive.",
    localContext: "We serve Boca Raton and surrounding communities including Delray Beach, Deerfield Beach, Boynton Beach, Coral Springs, and Parkland. From the Boca Raton Resort corridor to the quiet luxury of Broken Sound and the Polo Club, we travel to you.",
    neighborhoods: ['Mizner Park', 'Royal Palm Yacht & Country Club', 'Broken Sound', 'Woodfield Country Club', 'The Polo Club', 'Boca Isles', 'Town Center'],
    nearbyAreas: ['Delray Beach', 'Deerfield Beach', 'Coral Springs', 'Parkland', 'Boynton Beach', 'Coconut Creek'],
    venueTypes: ['Country club residences', 'Luxury condominiums', 'The Boca Raton resort', 'Corporate offices & campuses', 'Private estates', 'Event venues'],
    uniqueAngle: "Boca Raton blends corporate energy with refined residential luxury. Whether you need recovery after a long day at the office or a restorative session before a social event, we bring professional massage therapy to fit your schedule.",
    services: [
      { name: 'Swedish Massage', localNote: 'A staple for Boca Raton residents and resort guests seeking full relaxation without leaving their property.' },
      { name: 'Deep Tissue Massage', localNote: 'Popular with Boca Raton\'s corporate professionals and tennis/golf community for targeted muscle relief.' },
      { name: 'Couples Massage', localNote: 'Perfect for anniversaries, date nights, and special occasions at Boca\'s premier properties.' },
      { name: 'Lymphatic Drainage', localNote: 'Frequently requested for post-surgical recovery, particularly following cosmetic procedures at Boca-area clinics.' },
      { name: 'Reflexology', localNote: 'A wellness favorite among Boca Raton\'s health-conscious active community.' },
    ],
  },
  {
    slug: 'mobile-massage-coral-gables',
    city: 'Coral Gables',
    county: 'Miami-Dade',
    stateAbbr: 'FL',
    heroTagline: 'Coral Gables Mobile Massage — Wellness at Home',
    metaTitle: 'Mobile Massage Coral Gables — Luxury In-Home Massage Therapy',
    metaDescription: "Luxury mobile massage therapy in Coral Gables. We bring the spa to your Mediterranean-style home or Miracle Mile office. Swedish, deep tissue, prenatal & more. Available 8am–11pm daily.",
    intro: "Coral Gables — The City Beautiful — is known for its Mediterranean architecture, tree-lined boulevards, and one of Miami's most distinguished communities. Áurea Essence Massage brings equally refined mobile massage therapy directly to your Coral Gables home, business, or hotel.",
    localContext: "We serve Coral Gables and surrounding neighborhoods including South Miami, Coconut Grove, Pinecrest, Westchester, and the University of Miami area. From the historic estates along Alhambra Circle to the executive homes in Gables Estates, we travel to you.",
    neighborhoods: ['Miracle Mile', 'Gables Estates', 'Cocoplum', 'Alhambra Circle', 'Biltmore area', 'Ponce-Davis', 'Douglas area'],
    nearbyAreas: ['South Miami', 'Coconut Grove', 'Pinecrest', 'Westchester', 'Kendall', 'West Miami'],
    venueTypes: ['Historic estates & Mediterranean residences', 'Corporate offices on Miracle Mile', 'Biltmore Hotel suites', 'University of Miami-area properties', 'Luxury condominiums', 'Private events'],
    uniqueAngle: "Coral Gables' residents appreciate quality, character, and craftsmanship in everything. Our mobile massage sessions reflect those same values — meticulous, personalized, and delivered with the highest level of professionalism.",
    services: [
      { name: 'Swedish Massage', localNote: 'A signature choice for Coral Gables\' professional families and executives seeking at-home relaxation.' },
      { name: 'Deep Tissue Massage', localNote: 'Targeted relief for Coral Gables residents with desk-related tension and active lifestyles.' },
      { name: 'Couples Massage', localNote: 'A refined choice for celebrating milestones in the comfort of a Coral Gables estate or suite.' },
      { name: 'Prenatal Massage', localNote: 'Gentle, specialized care for expectant mothers in the Coral Gables and South Miami communities.' },
      { name: 'Post-Surgical Massage', localNote: 'Supporting recovery for clients following procedures at Coral Gables-area and Miami medical centers.' },
    ],
  },
];

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find(l => l.slug === slug);
}
