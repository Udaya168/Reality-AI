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
    <div className="surface-glass p-5 sm:p-6 space-y-5 rounded-[1.5rem] shadow-[0_8px_24px_rgba(16,43,70,0.06)]">
      <div className="relative">
        <Search className="w-4 h-4 text-[#354B60] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by neighborhood, city, title..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full min-h-11 pl-9 pr-3 py-2.5 text-xs border border-[#D9E0E6] rounded-full bg-white/85 focus:outline-none focus:border-[#315D82] focus:ring-2 focus:ring-[#315D82]/15"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-mono uppercase text-[#354B60] block">
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
                  ? 'bg-[#183653] text-white font-medium'
                  : 'bg-[#F8F7F3] text-[#354B60] hover:text-[#102B46]'
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
        className="w-full py-1.5 text-xs text-[#354B60] hover:text-[#183653] flex items-center justify-center gap-1.5 border border-[#D9E0E6] rounded-full cursor-pointer"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
};
