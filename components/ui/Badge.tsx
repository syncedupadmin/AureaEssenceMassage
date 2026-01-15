interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'dark' | 'outline';
  className?: string;
}

const variantStyles = {
  default: 'bg-rose-100 text-rose-600 border-l-2 border-rose-500',
  dark: 'bg-charcoal text-champagne',
  outline: 'border border-rose-500 text-rose-500',
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
