'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import StickyMobileCTA from '@/components/StickyMobileCTA';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    // Admin pages get no header/footer
    return <>{children}</>;
  }

  // Regular pages get the full site layout
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <BackToTop />
      <StickyMobileCTA />
    </>
  );
}
