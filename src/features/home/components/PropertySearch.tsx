import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { propertyCategories } from '../../../data/constants/property-categories';

export const PropertySearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchBudget, setSearchBudget] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation.trim()) params.set('location', searchLocation.trim());
    if (searchCategory !== 'all') params.set('category', searchCategory);
    if (searchBudget !== 'all') params.set('budget', searchBudget);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white border border-[#E7E6DF] p-3 sm:p-4 shadow-[0_4px_20px_rgba(24,61,48,0.06)] grid grid-cols-1 sm:grid-cols-12 gap-3"
    >
      {/* Location */}
      <div className="sm:col-span-4 border-b sm:border-b-0 sm:border-r border-[#E7E6DF] pb-2 sm:pb-0 sm:pr-3">
        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
          Location
        </label>
        <input
          type="text"
          placeholder="e.g. Sadashivanagar, Whitefield"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="w-full text-sm font-medium text-[#202520] placeholder:text-[#A7B9A5] focus:outline-none bg-transparent"
        />
      </div>

      {/* Category */}
      <div className="sm:col-span-3 border-b sm:border-b-0 sm:border-r border-[#E7E6DF] pb-2 sm:pb-0 sm:pr-3">
        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
          Category
        </label>
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="w-full text-sm font-medium text-[#202520] focus:outline-none bg-transparent cursor-pointer"
        >
          <option value="all">All Typologies</option>
          {propertyCategories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Budget */}
      <div className="sm:col-span-3 border-b sm:border-b-0 sm:border-r border-[#E7E6DF] pb-2 sm:pb-0 sm:pr-3">
        <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
          Budget Tier
        </label>
        <select
          value={searchBudget}
          onChange={(e) => setSearchBudget(e.target.value)}
          className="w-full text-sm font-medium text-[#202520] focus:outline-none bg-transparent cursor-pointer"
        >
          <option value="all">Any Price</option>
          <option value="under-5cr">Under ₹5 Cr</option>
          <option value="5cr-10cr">₹5 Cr – ₹10 Cr</option>
          <option value="10cr-20cr">₹10 Cr – ₹20 Cr</option>
          <option value="above-20cr">Above ₹20 Cr</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2 flex items-center">
        <button
          type="submit"
          className="w-full h-full min-h-[44px] bg-[#183D30] text-[#F7F6F2] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#315B49] transition-colors rounded-[1px] cursor-pointer"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};
