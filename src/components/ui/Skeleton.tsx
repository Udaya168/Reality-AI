import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
}) => {
  const variantClass = variant === 'circle' ? 'rounded-full' : 'rounded-[1px]';
  return (
    <div
      className={`animate-pulse bg-[#E7E6DF]/70 ${variantClass} ${className}`}
      aria-hidden="true"
    />
  );
};
