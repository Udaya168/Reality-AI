import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export interface PropertySortProps {
  value: string;
  onChange: (sort: string) => void;
}

export const PropertySort: React.FC<PropertySortProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 text-xs">
      <ArrowUpDown className="w-3.5 h-3.5 text-[#354B60]" />
      <span className="text-[#354B60] font-mono uppercase text-[11px]">Sort By:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white border border-[#D9E0E6] px-2.5 py-1.5 text-xs text-[#102B46] focus:outline-none focus:border-[#183653] rounded-full cursor-pointer"
      >
        <option value="recent">Recently Added</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="area-desc">Area: Largest First</option>
      </select>
    </div>
  );
};
