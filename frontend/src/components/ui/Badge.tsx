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
    'inline-flex items-center font-mono uppercase tracking-[0.1em] rounded-full border transition-colors duration-200 select-none';

  const variants = {
    default: 'bg-[#183653] text-white border-[#183653]',
    verified: 'bg-white/90 text-[#183653] border-[#B9C9D6] gap-1 backdrop-blur-sm',
    category: 'bg-[#102B46]/85 text-[#F8F7F3] border-white/20 backdrop-blur-sm',
    outline: 'border-[#D9E0E6] text-[#354B60] bg-white/80',
    subtle: 'bg-[#DCE7F0]/80 text-[#183653] border-[#D9E0E6]/70',
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
