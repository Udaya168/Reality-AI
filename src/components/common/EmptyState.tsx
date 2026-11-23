import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from '../ui/Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="text-center py-16 px-6 bg-white border border-[#E7E6DF] max-w-md mx-auto space-y-4 rounded-[1px]">
      <div className="w-12 h-12 bg-[#F7F6F2] text-[#183D30] mx-auto flex items-center justify-center rounded-full border border-[#E7E6DF]">
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-serif text-xl font-semibold text-[#183D30]">{title}</h3>
        <p className="text-xs text-[#737970] leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
