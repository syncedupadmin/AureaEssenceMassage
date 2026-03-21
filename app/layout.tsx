import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1E6B4A',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aureaessencemassage.com'),
  title: {
    default: 'Áurea Essence Massage | Luxury Mobile Massage — Miami, Fort Lauderdale & Palm Beach',
    template: '%s | Áurea Essence Massage',
  },
  description: 'Luxury mobile massage therapy delivered to your home, hotel, or office in Miami, Fort Lauderdale, and Palm Beach. Swedish, deep tissue, couples massage & more. Book today.',
  keywords: 'mobile massage miami, in-home massage south florida, luxury massage therapy, couples massage miami, deep tissue massage fort lauderdale, mobile massage palm beach',
  authors: [{ name: 'Áurea Essence Massage' }],
  creator: 'Áurea Essence Massage',
  openGraph: {
    title: 'Áurea Essence Massage | Luxury Mobile Massage — South Florida',
    description: 'Spa-quality mobile massage therapy delivered to your location. Serving Miami, Fort Lauderdale & Palm Beach. Book your session today.',
    type: 'website',
    siteName: 'Áurea Essence Massage',
    locale: 'en_US',
    url: 'https://aureaessencemassage.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Áurea Essence Massage | Luxury Mobile Massage — South Florida',
    description: 'Spa-quality mobile massage therapy delivered to your location in Miami, Fort Lauderdale & Palm Beach.',
    creator: '@aureaessence',
  },
  icons: {
    icon: '/images/logo-icon-light.png',
    apple: '/images/logo-icon-light.png',
  },
  verification: {
    google: 'qq36KSnnF9XjcZlTPe0l0Bbrj2T9z3HcNl2pT2eCn-g',
  },
  alternates: {
    canonical: 'https://aureaessencemassage.com',
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "name": "Áurea Essence Massage",
  "image": "https://aureaessencemassage.com/images/aurea-essence-logo.png",
  "@id": "https://aureaessencemassage.com/#business",
  "url": "https://aureaessencemassage.com",
  "telephone": "+13055194034",
  "priceRange": "$$-$$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "areaServed": [
    { "@type": "City", "name": "Miami" },
    { "@type": "City", "name": "Miami Beach" },
    { "@type": "City", "name": "Coral Gables" },
    { "@type": "City", "name": "Brickell" },
    { "@type": "City", "name": "Fort Lauderdale" },
    { "@type": "City", "name": "Boca Raton" },
    { "@type": "City", "name": "Palm Beach" },
    { "@type": "City", "name": "West Palm Beach" },
    { "@type": "AdministrativeArea", "name": "Miami-Dade County" },
    { "@type": "AdministrativeArea", "name": "Broward County" },
    { "@type": "AdministrativeArea", "name": "Palm Beach County" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday",
        "Friday", "Saturday", "Sunday"
      ],
      "opens": "08:00",
      "closes": "23:00"
    }
  ],
  "paymentAccepted": "Credit Card, Cash, Venmo, Zelle",
  "currenciesAccepted": "USD",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Massage Therapy Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Swedish Massage",
          "description": "Relaxing full-body massage with long, flowing strokes to reduce stress and improve circulation. Available in 60, 90, and 120-minute sessions."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Deep Tissue Massage",
          "description": "Targeted therapy for chronic muscle tension and recovery using advanced techniques that reach deep muscle layers."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Couples Massage",
          "description": "Shared relaxation experience for two people. Consecutive sessions in the comfort of your home or hotel suite."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Prenatal Massage",
          "description": "Safe, nurturing massage therapy designed for expectant mothers in their 2nd and 3rd trimester."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Lymphatic Drainage Massage",
          "description": "Gentle, rhythmic technique to stimulate the lymphatic system and support detoxification and post-surgical recovery."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Post-Surgical Massage",
          "description": "Specialized therapeutic massage to support healing after surgical procedures, reduce swelling, and minimize scar tissue."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Reflexology",
          "description": "Pressure point therapy focused on the feet, based on the principle that specific zones correspond to different body systems."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-white focus:rounded-sm focus:shadow-lg"
        >
          Skip to main content
        </a>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
