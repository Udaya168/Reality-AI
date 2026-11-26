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
            className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={cn(
            'w-full bg-white/90 backdrop-blur-sm border border-[#D9E0E6] text-[#102B46] text-sm p-3.5 rounded-xl placeholder:text-[#7896B2] transition-all duration-200 focus:outline-none focus:border-[#315D82] focus:ring-2 focus:ring-[#315D82]/15 disabled:bg-[#EDF2F6] disabled:opacity-60 leading-relaxed',
            error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-[11px] text-red-700 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] text-[#354B60]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
