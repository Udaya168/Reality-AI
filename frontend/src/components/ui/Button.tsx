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
      'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#183D30] disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-full select-none';

    const variants = {
      primary:
        'bg-[#183D30] text-[#F7F6F2] hover:bg-[#122D24] active:bg-[#0D2019] shadow-none border border-[#183D30]',
      secondary:
        'bg-[#315B49] text-white hover:bg-[#254637] border border-[#315B49]',
      outline:
        'bg-white text-[#202520] border border-[#E7E6DF] hover:border-[#183D30] hover:text-[#183D30] active:bg-[#F7F6F2]',
      ghost:
        'bg-transparent text-[#202520] hover:bg-[#E8EDE7]/50 hover:text-[#183D30]',
      editorial:
        'bg-transparent text-[#183D30] p-0 font-serif underline underline-offset-4 decoration-1 decoration-[#A7B9A5] hover:decoration-[#183D30] hover:text-[#122D24]',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-xs sm:text-sm px-5 py-2.5 gap-2',
      lg: 'text-sm sm:text-base px-7 py-3.5 gap-2.5',
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
