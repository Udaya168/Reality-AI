import React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'subtle' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  padding = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'border border-[#E7E6DF] rounded-3xl transition-all duration-200';

  const variants = {
    default: 'bg-white',
    surface: 'bg-[#F7F6F2]',
    subtle: 'bg-[#F0EFE9]/50',
    interactive: 'bg-white hover:border-[#183D30] hover:shadow-[0_2px_8px_rgba(24,61,48,0.05)] cursor-pointer',
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
