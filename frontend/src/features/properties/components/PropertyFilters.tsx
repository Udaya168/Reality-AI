import React from 'react';
import { Search, RotateCcw } from 'lucide-react';

export interface PropertyFiltersProps {
  query: string;
  onQueryChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (c: string) => void;
  onClear: () => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  query,
  onQueryChange,
  selectedCategory,
  onCategoryChange,
  onClear,
}) => {
  const categories = [
    { label: 'All Typologies', value: 'all' },
    { label: 'Villas & Estates', value: 'villa' },
    { label: 'Apartments', value: 'apartment' },
    { label: 'Land & Plots', value: 'plot' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Agricultural', value: 'agricultural' },
  ];

  return (
    <div className="bg-white border border-[#E7E6DF]/80 p-5 space-y-4 rounded-3xl shadow-xs">
      <div className="relative">
        <Search className="w-4 h-4 text-[#737970] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by neighborhood, city, title..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 text-xs border border-[#E7E6DF] rounded-full rounded-full focus:outline-none focus:border-[#183D30]"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-mono uppercase text-[#737970] block">
          Typology
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => onCategoryChange(c.value)}
              className={`px-2.5 py-1 text-xs rounded-full transition-colors cursor-pointer ${
                selectedCategory === c.value
                  ? 'bg-[#183D30] text-white font-medium'
                  : 'bg-[#F7F6F2] text-[#737970] hover:text-[#202520]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="w-full py-1.5 text-xs text-[#737970] hover:text-[#183D30] flex items-center justify-center gap-1.5 border border-[#E7E6DF] rounded-full cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};
