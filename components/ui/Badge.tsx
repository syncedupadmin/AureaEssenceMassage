interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'outline';
  className?: string;
}

const variantStyles = {
  default: 'bg-emerald-100 text-emerald-600 border-l-2 border-emerald-500',
  dark: 'bg-charcoal text-champagne',
  outline: 'border border-emerald-500 text-emerald-500',
};

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`
        inline-block px-3 py-1
        text-xs font-medium tracking-wide
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
