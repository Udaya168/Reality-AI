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
    default: 'bg-[#183653] text-white',
    verified: 'bg-white text-[#183653] border border-[#7896B2] gap-1',
    category: 'bg-[#183653]/90 text-[#F8F7F3] backdrop-blur-sm',
    outline: 'border border-[#D9E0E6] text-[#354B60] bg-white',
    subtle: 'bg-[#DCE7F0] text-[#183653]',
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
      {variant === 'verified' && <CheckCircle2 className="w-3 h-3 text-[#315D82]" />}
      <span>{children}</span>
    </span>
  );
};
