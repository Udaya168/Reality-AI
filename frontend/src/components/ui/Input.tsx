import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-[#354B60] pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              'w-full bg-white border border-[#D9E0E6] text-[#102B46] text-sm px-3.5 py-2.5 rounded-2xl placeholder:text-[#7896B2] transition-colors focus:outline-none focus:border-[#183653] focus:ring-1 focus:ring-[#183653] disabled:bg-[#EDF2F6] disabled:opacity-60',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-[#354B60] pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error ? (
          <p className="text-[11px] text-red-700 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-[#354B60]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
