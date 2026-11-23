import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this section.',
  onRetry,
}) => {
  return (
    <div className="text-center py-12 px-6 bg-rose-50/50 border border-rose-200 max-w-md mx-auto space-y-3 rounded-[1px]">
      <div className="w-10 h-10 bg-rose-100 text-rose-700 mx-auto flex items-center justify-center rounded-full">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h3 className="font-serif text-lg font-semibold text-rose-900">{title}</h3>
      <p className="text-xs text-rose-700">{message}</p>
      {onRetry && (
        <div className="pt-2">
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
};
