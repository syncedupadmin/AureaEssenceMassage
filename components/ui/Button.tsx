import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-rose-500 text-white hover:bg-rose-600 shadow-soft hover:shadow-elegant',
  secondary: 'bg-charcoal text-champagne hover:bg-charcoal-400',
  outline: 'border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white bg-transparent',
  white: 'bg-white text-rose-500 hover:bg-champagne shadow-soft hover:shadow-elegant',
  ghost: 'text-rose-500 hover:bg-rose-50',
};

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  fullWidth = false,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    px-8 py-3.5
    font-medium tracking-wide text-sm
    rounded-sm
    transition-all duration-300
    focus-visible:outline-2 focus-visible:outline-rose-500 focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${variantStyles[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseStyles}
    >
      {children}
    </button>
  );
}
