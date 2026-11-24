import React from 'react';

export interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
}) => {
  const variantClass = variant === 'circle' ? 'rounded-full' : 'rounded-2xl';
  return (
    <div
      className={`animate-pulse bg-[#E7E6DF]/70 ${variantClass} ${className}`}
      aria-hidden="true"
    />
  );
};
