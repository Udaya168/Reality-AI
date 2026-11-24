import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options?: Array<{ label: string; value: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, options, children, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              'w-full appearance-none bg-white border border-[#D9E0E6] text-[#102B46] text-sm px-3.5 py-2.5 pr-9 rounded-2xl transition-colors focus:outline-none focus:border-[#183653] focus:ring-1 focus:ring-[#183653] cursor-pointer disabled:bg-[#EDF2F6] disabled:opacity-60',
              error && 'border-red-600 focus:border-red-600 focus:ring-red-600',
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <ChevronDown className="w-4 h-4 text-[#354B60] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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

Select.displayName = 'Select';
