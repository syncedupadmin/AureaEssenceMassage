interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'default' | 'large';
  hover?: boolean;
}

const paddingVariants = {
  none: '',
  small: 'p-4 sm:p-5',
  default: 'p-5 sm:p-6 md:p-8',
  large: 'p-6 sm:p-8 md:p-10',
};

export default function Card({
  children,
  className = '',
  padding = 'default',
  hover = true,
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-sm shadow-soft overflow-hidden
        ${hover ? 'hover:shadow-elegant transition-shadow duration-300' : ''}
        ${paddingVariants[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
