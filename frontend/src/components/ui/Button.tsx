import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'editorial';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap font-medium tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315D82] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-full select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#183653] text-[#F8F7F3] border border-[#183653] shadow-[0_4px_12px_rgba(24,54,83,0.12)] hover:-translate-y-px hover:bg-[#102B46] hover:shadow-[0_8px_18px_rgba(24,54,83,0.16)]',
      secondary:
        'bg-[#315D82] text-white border border-[#315D82] hover:-translate-y-px hover:bg-[#183653]',
      outline:
        'bg-white/85 text-[#102B46] border border-[#D9E0E6] hover:-translate-y-px hover:border-[#7896B2] hover:bg-white hover:text-[#183653]',
      ghost:
        'bg-transparent text-[#102B46] hover:bg-[#DCE7F0]/55 hover:text-[#183653]',
      editorial:
        'bg-transparent text-[#183653] p-0 font-serif underline underline-offset-4 decoration-1 decoration-[#7896B2] hover:decoration-[#183653] hover:text-[#102B46]',
    };

    const sizes = {
      sm: 'min-h-9 text-xs px-4 py-2 gap-1.5',
      md: 'min-h-11 text-xs sm:text-sm px-5 py-2.5 gap-2',
      lg: 'min-h-12 text-sm sm:text-base px-7 py-3 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== 'editorial' && sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent animate-spin rounded-full" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
