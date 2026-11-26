import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'subtle' | 'glass' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  padding = 'md',
  children,
  ...props
}) => {
  const baseStyles =
    'border border-[#D9E0E6]/80 rounded-[1.5rem] transition-all duration-300 ease-out';

  const variants = {
    default: 'bg-white shadow-[0_8px_24px_rgba(16,43,70,0.05)]',
    surface: 'bg-[#F8F7F3]',
    subtle: 'bg-[#EDF2F6]/65',
    glass: 'bg-white/75 backdrop-blur-md shadow-[0_8px_24px_rgba(16,43,70,0.05)]',
    interactive: 'bg-white shadow-[0_8px_24px_rgba(16,43,70,0.05)] hover:-translate-y-0.5 hover:border-[#B9C9D6] hover:shadow-[0_18px_40px_rgba(16,43,70,0.1)] cursor-pointer',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8 sm:p-10',
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};
