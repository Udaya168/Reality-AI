import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-[11px] font-mono uppercase tracking-wider text-[#737970]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full bg-white border border-[#E7E6DF] text-[#202520] text-sm p-3.5 rounded-[1px] placeholder:text-[#A7B9A5] transition-colors focus:outline-none focus:border-[#183D30] focus:ring-1 focus:ring-[#183D30] disabled:bg-[#F0EFE9] disabled:opacity-60 leading-relaxed',
            error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-red-700 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-[#737970]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
