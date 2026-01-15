interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'champagne' | 'ivory' | 'dark' | 'rose';
  spacing?: 'default' | 'small' | 'large' | 'hero';
  id?: string;
}

const bgVariants = {
  default: 'bg-champagne',
  champagne: 'bg-champagne-200',
  ivory: 'bg-champagne-50',
  dark: 'bg-charcoal text-champagne',
  rose: 'bg-rose-500 text-white',
};

const spacingVariants = {
  default: 'py-16 sm:py-20 md:py-24',
  small: 'py-12 sm:py-16',
  large: 'py-20 sm:py-28 md:py-32',
  hero: 'pt-32 sm:pt-40 pb-16 sm:pb-24',
};

export default function Section({
  children,
  className = '',
  variant = 'default',
  spacing = 'default',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${bgVariants[variant]} ${spacingVariants[spacing]} ${className}`}
    >
      {children}
    </section>
  );
}
