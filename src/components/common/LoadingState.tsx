import React from 'react';
import { Spinner } from '../ui/Spinner';

export interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading architectural records...',
}) => {
  return (
    <div className="py-20 flex flex-col items-center justify-center space-y-3">
      <Spinner size="lg" />
      <span className="text-xs font-mono uppercase tracking-widest text-[#737970]">
        {message}
      </span>
    </div>
  );
};
