import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building, CircleDollarSign, ArrowRight } from 'lucide-react';
import { propertyCategories } from '../../../data/constants/property-categories';
import { useAuth } from '../../../context/AuthContext';

export const PropertySearch: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchBudget, setSearchBudget] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      // If user is not authenticated, prompt to login to see properties
      navigate('/login?redirect=properties');
      return;
    }
    const params = new URLSearchParams();
    if (searchLocation.trim()) params.set('location', searchLocation.trim());
    if (searchCategory !== 'all') params.set('category', searchCategory);
    if (searchBudget !== 'all') params.set('budget', searchBudget);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-md border border-[#D9E0E6] p-2.5 sm:p-3 rounded-3xl sm:rounded-full shadow-[0_12px_40px_rgba(24,54,83,0.08)] grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-1 items-center"
    >
      {/* Location */}
      <div className="sm:col-span-4 px-4 py-2 border-b sm:border-b-0 sm:border-r border-[#D9E0E6]/80">
        <label className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] flex items-center gap-1 mb-0.5">
          <MapPin className="w-3 h-3 text-[#315D82]" />
          <span>Location</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Sadashivanagar, Whitefield"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="w-full text-xs sm:text-sm font-medium text-[#102B46] placeholder:text-[#7896B2] focus:outline-none bg-transparent"
        />
      </div>

      {/* Category */}
      <div className="sm:col-span-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-[#D9E0E6]/80">
        <label className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] flex items-center gap-1 mb-0.5">
          <Building className="w-3 h-3 text-[#315D82]" />
          <span>Typology</span>
        </label>
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="w-full text-xs sm:text-sm font-medium text-[#102B46] focus:outline-none bg-transparent cursor-pointer"
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
      <div className="sm:col-span-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-[#D9E0E6]/80">
        <label className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] flex items-center gap-1 mb-0.5">
          <CircleDollarSign className="w-3 h-3 text-[#315D82]" />
          <span>Budget Tier</span>
        </label>
        <select
          value={searchBudget}
          onChange={(e) => setSearchBudget(e.target.value)}
          className="w-full text-xs sm:text-sm font-medium text-[#102B46] focus:outline-none bg-transparent cursor-pointer"
        >
          <option value="all">Any Price</option>
          <option value="under-5cr">Under ₹5 Cr</option>
          <option value="5cr-10cr">₹5 Cr – ₹10 Cr</option>
          <option value="10cr-20cr">₹10 Cr – ₹20 Cr</option>
          <option value="above-20cr">Above ₹20 Cr</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="sm:col-span-2 p-1">
        <button
          type="submit"
          className="w-full py-3 px-5 bg-[#183653] text-[#F8F7F3] text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#315D82] transition-all rounded-full shadow-sm hover:shadow cursor-pointer active:scale-95"
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isAuthenticated ? 'Explore (48)' : 'Search'}</span>
        </button>
      </div>
    </form>
  );
};
