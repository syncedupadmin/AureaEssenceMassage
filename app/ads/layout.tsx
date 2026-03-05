import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Luxury Mobile Massage in South Florida | Áurea Essence',
  description: 'Licensed mobile massage therapy delivered to your home, hotel, or office. Swedish, Deep Tissue, Couples & more. Same-day available. South Florida.',
  robots: 'noindex', // keep ads landing page out of organic search
  openGraph: {
    title: 'Luxury Massage, Delivered to You | Áurea Essence',
    description: 'Book a professional mobile massage anywhere in South Florida. Licensed & insured. Same-day available.',
    type: 'website',
    siteName: 'Áurea Essence Massage',
  },
};

export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
