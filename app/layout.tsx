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
  themeColor: '#B76E79',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aureaessencemassage.vercel.app'),
  title: "Áurea Essence Massage | Premium Mobile Massage Therapy",
  description: "Premium mobile massage therapy delivered to your location. Experience the luxury of spa-quality treatments in the comfort of your home, hotel, or office.",
  keywords: "mobile massage, luxury massage, in-home massage, massage therapy, spa at home, wellness, relaxation, Áurea Essence",
  openGraph: {
    title: "Áurea Essence Massage | Premium Mobile Massage",
    description: "Premium mobile massage therapy. We bring the spa experience to your location.",
    type: "website",
    images: [
      {
        url: "/images/aurea-essence-logo.png",
        width: 1200,
        height: 630,
        alt: "Áurea Essence Massage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Áurea Essence Massage | Premium Mobile Massage",
    description: "Premium mobile massage therapy delivered to you.",
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
  "name": "Áurea Essence Massage",
  "image": "https://aureaessencemassage.vercel.app/images/aurea-essence-logo.png",
  "@id": "https://aureaessencemassage.vercel.app/#organization",
  "url": "https://aureaessencemassage.vercel.app",
  "priceRange": "$$-$$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "South Florida",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "areaServed": [
    {"@type": "State", "name": "Florida"}
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
          "description": "Relaxing full-body massage with flowing strokes."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Deep Tissue Massage",
          "description": "Targeted therapy for muscle tension and recovery."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Couples Massage",
          "description": "Shared relaxation experience for partners."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hot Stone Massage",
          "description": "Heated stones for deep muscle relaxation."
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
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-rose-500 focus:text-white focus:rounded-sm focus:shadow-lg"
        >
          Skip to main content
        </a>
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}
