import React from 'react';
import { Badge } from '../ui/Badge';

export interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  action,
}) => {
  return (
    <div className="border-b border-[#E7E6DF] pb-6 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div className="space-y-2">
        {badge && (
          <Badge variant="subtle" size="sm">
            {badge}
          </Badge>
        )}
        <h1 className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-[#737970] max-w-2xl font-light">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
