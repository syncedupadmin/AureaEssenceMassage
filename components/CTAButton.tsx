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
  const baseStyles = `
    inline-flex items-center justify-center
    px-8 py-3.5 sm:px-10 sm:py-4
    font-medium tracking-wide text-sm sm:text-base
    rounded-sm
    transition-all duration-300
    focus-visible:outline-2 focus-visible:outline-rose-500 focus-visible:outline-offset-2
  `;

  const variants = {
    primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-soft hover:shadow-elegant',
    secondary: 'bg-charcoal text-champagne hover:bg-charcoal-400',
    outline: 'border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white bg-transparent',
    white: 'bg-white text-rose-500 hover:bg-champagne shadow-soft hover:shadow-elegant',
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
