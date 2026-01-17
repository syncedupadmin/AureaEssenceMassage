import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Aurea Essence Massage',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-champagne-50">
      {children}
    </div>
  );
}
