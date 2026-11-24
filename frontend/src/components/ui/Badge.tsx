import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle2 } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'verified' | 'category' | 'outline' | 'subtle';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-mono uppercase tracking-wider rounded-full transition-colors select-none';

  const variants = {
    default: 'bg-[#183D30] text-white',
    verified: 'bg-white text-[#183D30] border border-[#A7B9A5] gap-1',
    category: 'bg-[#183D30]/90 text-[#F7F6F2] backdrop-blur-sm',
    outline: 'border border-[#E7E6DF] text-[#737970] bg-white',
    subtle: 'bg-[#E8EDE7] text-[#183D30]',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-2.5 py-1',
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {variant === 'verified' && <CheckCircle2 className="w-3 h-3 text-[#315B49]" />}
      <span>{children}</span>
    </span>
  );
};
