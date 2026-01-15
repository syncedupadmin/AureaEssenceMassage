interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'narrow' | 'default' | 'wide';
}

const sizeVariants = {
  narrow: 'max-w-4xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
};

export default function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeVariants[size]} ${className}`}>
      {children}
    </div>
  );
}
