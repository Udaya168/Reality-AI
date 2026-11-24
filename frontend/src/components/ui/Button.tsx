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
      'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#183653] disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-full select-none';

    const variants = {
      primary:
        'bg-[#183653] text-[#F8F7F3] hover:bg-[#102B46] active:bg-[#102B46] shadow-none border border-[#183653]',
      secondary:
        'bg-[#315D82] text-white hover:bg-[#315D82] border border-[#315D82]',
      outline:
        'bg-white text-[#102B46] border border-[#D9E0E6] hover:border-[#183653] hover:text-[#183653] active:bg-[#F8F7F3]',
      ghost:
        'bg-transparent text-[#102B46] hover:bg-[#DCE7F0]/50 hover:text-[#183653]',
      editorial:
        'bg-transparent text-[#183653] p-0 font-serif underline underline-offset-4 decoration-1 decoration-[#7896B2] hover:decoration-[#183653] hover:text-[#102B46]',
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
