import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  className?: string;
}

export default function CTAButton({
  href,
  children,
  variant = 'primary',
  className = ''
}: CTAButtonProps) {
  const baseStyles = 'inline-block px-8 py-3.5 sm:px-10 sm:py-4 font-medium transition-all duration-300 text-center tracking-wide rounded-sm text-sm sm:text-base';

  const variants = {
    primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-soft hover:shadow-elegant',
    secondary: 'bg-charcoal text-cream border border-charcoal hover:bg-charcoal-light',
    outline: 'border-2 border-rose-500 text-rose-500 hover:bg-rose-500/10',
    white: 'bg-white text-rose-500 hover:bg-cream shadow-soft hover:shadow-elegant',
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
