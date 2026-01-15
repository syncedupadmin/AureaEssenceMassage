import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import StickyMobileCTA from "@/components/StickyMobileCTA";

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
  themeColor: '#B07D6B',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aureaessencemassage.vercel.app'),
  title: "Aurea Essence Massage | Premium Mobile Massage Therapy",
  description: "Experience the golden standard in mobile massage therapy. Certified therapists bring luxury spa treatments to your home, hotel, or office. Book your personalized wellness journey today.",
  keywords: "mobile massage, luxury massage, in-home massage, massage therapy, spa at home, wellness, relaxation, Aurea Essence",
  openGraph: {
    title: "Aurea Essence Massage | Premium Mobile Massage Therapy",
    description: "Experience the golden standard in mobile massage therapy. Certified therapists bring luxury spa treatments to your home, hotel, or office.",
    type: "website",
    images: [
      {
        url: "/images/aurea-essence-logo.png",
        width: 1200,
        height: 630,
        alt: "Aurea Essence Massage Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurea Essence Massage | Premium Mobile Massage Therapy",
    description: "Experience the golden standard in mobile massage therapy. Luxury spa treatments delivered to you.",
    images: ["/images/aurea-essence-logo.png"],
  },
  icons: {
    icon: "/images/aurea-essence-logo.png",
    apple: "/images/aurea-essence-logo.png",
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aurea Essence Massage",
  "image": "https://aureaessencemassage.vercel.app/images/aurea-essence-logo.png",
  "@id": "https://aureaessencemassage.vercel.app/#organization",
  "url": "https://aureaessencemassage.vercel.app",
  "telephone": "+1-555-123-4567",
  "email": "info@aureaessencemassage.com",
  "priceRange": "$$-$$$",
  "paymentAccepted": "Cash, Credit Card, Venmo, Zelle, Apple Pay",
  "currenciesAccepted": "USD",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Mobile Service - We Come To You",
    "addressLocality": "Your City",
    "addressRegion": "State",
    "postalCode": "00000",
    "addressCountry": "US"
  },
  "areaServed": [
    {"@type": "City", "name": "Service Area"}
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "21:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Massage Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Swedish Massage",
          "description": "Gentle, flowing strokes to release tension and restore balance."
        },
        "price": "120-240",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Deep Tissue Massage",
          "description": "Targeted therapy for chronic pain relief and muscle recovery."
        },
        "price": "140-280",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Couples Massage",
          "description": "Share a relaxing experience with your partner."
        },
        "price": "280-480",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hot Stone Massage",
          "description": "Heated stones melt away stress and deeply relax muscles."
        },
        "price": "160-300",
        "priceCurrency": "USD"
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "bestRating": "5",
    "ratingCount": "100"
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
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rose-500 focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <BackToTop />
        <StickyMobileCTA />
        <Analytics />
      </body>
    </html>
  );
}
