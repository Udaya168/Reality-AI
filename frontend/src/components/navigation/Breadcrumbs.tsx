import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-xs font-mono text-[#354B60] py-2">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:text-[#183653] transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center space-x-2">
              <ChevronRight className="w-3 h-3 text-[#7896B2]" />
              {isLast || !item.href ? (
                <span className="text-[#102B46] font-medium truncate max-w-xs">{item.label}</span>
              ) : (
                <Link to={item.href} className="hover:text-[#183653] transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
