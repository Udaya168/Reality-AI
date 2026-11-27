import React from 'react';
import { cn } from '../../lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'narrow' | 'default' | 'wide' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  className,
  size = 'default',
  children,
  ...props
}) => {
  const maxSizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-[1600px]',
    wide: 'max-w-[1720px]',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8 2xl:px-12',
        maxSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
