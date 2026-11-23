import React from 'react';
import { cn } from '../../lib/utils';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  kicker?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  containerSize?: 'narrow' | 'default' | 'wide' | 'full';
  bordered?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  className,
  kicker,
  title,
  description,
  action,
  spacing = 'md',
  containerSize = 'default',
  bordered = false,
  children,
  ...props
}) => {
  const spacingStyles = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-20',
    lg: 'py-20 sm:py-28',
  };

  return (
    <section
      className={cn(
        spacingStyles[spacing],
        bordered && 'border-b border-[#E7E6DF]',
        className
      )}
      {...props}
    >
      <Container size={containerSize}>
        {(kicker || title || action) && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E6DF] gap-4">
            <div>
              {kicker && (
                <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
                  {kicker}
                </span>
              )}
              {title && (
                <h2 className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal mt-1 tracking-tight">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-[#737970] mt-1.5 max-w-2xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
};
