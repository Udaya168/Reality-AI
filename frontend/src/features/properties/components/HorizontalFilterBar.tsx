import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown, Search, X, Check, RotateCcw,
  Building2, Home, Landmark, TreePine, ShieldCheck,
  SlidersHorizontal, CheckCircle2, DollarSign, Bed, Maximize2, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FilterValues {
  category: string;
  location: string;
  priceTier: string;
  minPrice: number | null;
  maxPrice: number | null;
  bhk: string;
  areaTier: string;
  minArea: number | null;
  maxArea: number | null;
  verifiedOnly: boolean;
  bathrooms: string;
  furnishing: string;
  sellerType: string;
  status: string;
}

interface HorizontalFilterBarProps {
  filters: FilterValues;
  onFilterChange: <K extends keyof FilterValues>(key: K, value: FilterValues[K]) => void;
  onClearAll: () => void;
  locationsList: string[];
  totalResults: number;
}

export const HorizontalFilterBar: React.FC<HorizontalFilterBarProps> = ({
  filters,
  onFilterChange,
  onClearAll,
  locationsList,
  totalResults,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [locationSearch, setLocationSearch] = useState('');
  const barRef = useRef<HTMLDivElement>(null);

  // Custom inputs temporary state for Budget
  const [tempMinPriceCr, setTempMinPriceCr] = useState<string>(
    filters.minPrice ? (filters.minPrice / 10000000).toString() : ''
  );
  const [tempMaxPriceCr, setTempMaxPriceCr] = useState<string>(
    filters.maxPrice ? (filters.maxPrice / 10000000).toString() : ''
  );

  // Custom inputs temporary state for Area
  const [tempMinArea, setTempMinArea] = useState<string>(
    filters.minArea ? filters.minArea.toString() : ''
  );
  const [tempMaxArea, setTempMaxArea] = useState<string>(
    filters.maxArea ? filters.maxArea.toString() : ''
  );

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  // Typology options
  const typologyOptions = [
    { label: 'All Typologies', value: 'all' },
    { label: 'Apartment', value: 'apartment', icon: Building2 },
    { label: 'Villa', value: 'villa', icon: Home },
    { label: 'Independent House', value: 'independent-house', icon: Landmark },
    { label: 'Plot', value: 'plot', icon: TreePine },
    { label: 'Agricultural Land', value: 'agricultural', icon: TreePine },
    { label: 'Commercial', value: 'commercial', icon: Building2 },
  ];

  // Budget presets
  const budgetPresets = [
    { label: 'Any Price', value: 'all', min: null, max: null },
    { label: 'Under ₹5 Cr', value: 'under-5cr', min: null, max: 50000000 },
    { label: '₹5 Cr – ₹10 Cr', value: '5cr-10cr', min: 50000000, max: 100000000 },
    { label: '₹10 Cr – ₹20 Cr', value: '10cr-20cr', min: 100000000, max: 200000000 },
    { label: 'Above ₹20 Cr', value: 'above-20cr', min: 200000000, max: null },
  ];

  // Bedroom options
  const bedroomOptions = [
    { label: 'Any Bedrooms', value: 'all' },
    { label: '1 BHK', value: '1' },
    { label: '2 BHK', value: '2' },
    { label: '3 BHK', value: '3' },
    { label: '4 BHK', value: '4' },
    { label: '5+ BHK', value: '5' },
  ];

  // Area presets
  const areaPresets = [
    { label: 'Any Area', value: 'all', min: null, max: null },
    { label: 'Under 2,500 sq.ft', value: 'under-2500', min: null, max: 2500 },
    { label: '2,500 – 5,000 sq.ft', value: '2500-5000', min: 2500, max: 5000 },
    { label: '5,000 – 10,000 sq.ft', value: '5000-10000', min: 5000, max: 10000 },
    { label: 'Above 10,000 sq.ft', value: 'above-10000', min: 10000, max: null },
  ];

  // Filtered locations
  const filteredLocations = locationsList.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase().trim())
  );

  // Active state labels & counts
  const isTypologyActive = filters.category !== 'all';
  const isLocationActive = filters.location !== 'all';
  const isBudgetActive = filters.priceTier !== 'all' || filters.minPrice !== null || filters.maxPrice !== null;
  const isBedroomsActive = filters.bhk !== 'all';
  const isAreaActive = filters.areaTier !== 'all' || filters.minArea !== null || filters.maxArea !== null;
  const isVerifiedActive = filters.verifiedOnly;

  // More Filters Active Count
  const moreFiltersActiveCount =
    (filters.bathrooms !== 'all' ? 1 : 0) +
    (filters.furnishing !== 'all' ? 1 : 0) +
    (filters.sellerType !== 'all' ? 1 : 0) +
    (filters.status !== 'all' ? 1 : 0);
  const isMoreFiltersActive = moreFiltersActiveCount > 0;

  // Apply custom budget range
  const handleApplyCustomBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const min = tempMinPriceCr ? parseFloat(tempMinPriceCr) * 10000000 : null;
    const max = tempMaxPriceCr ? parseFloat(tempMaxPriceCr) * 10000000 : null;
    onFilterChange('minPrice', min);
    onFilterChange('maxPrice', max);
    onFilterChange('priceTier', 'custom');
    setActiveDropdown(null);
  };

  // Apply custom area range
  const handleApplyCustomArea = (e: React.FormEvent) => {
    e.preventDefault();
    const min = tempMinArea ? parseFloat(tempMinArea) : null;
    const max = tempMaxArea ? parseFloat(tempMaxArea) : null;
    onFilterChange('minArea', min);
    onFilterChange('maxArea', max);
    onFilterChange('areaTier', 'custom');
    setActiveDropdown(null);
  };

  // Label resolvers
  const getTypologyLabel = () => {
    if (!isTypologyActive) return 'Typology';
    const opt = typologyOptions.find((o) => o.value === filters.category);
    return opt ? opt.label : 'Typology';
  };

  const getLocationLabel = () => {
    if (!isLocationActive) return 'Location';
    return filters.location;
  };

  const getBudgetLabel = () => {
    if (filters.priceTier === 'custom') {
      if (filters.minPrice && filters.maxPrice) {
        return `₹${filters.minPrice / 10000000}Cr – ₹${filters.maxPrice / 10000000}Cr`;
      }
      if (filters.minPrice) return `> ₹${filters.minPrice / 10000000}Cr`;
      if (filters.maxPrice) return `< ₹${filters.maxPrice / 10000000}Cr`;
    }
    const preset = budgetPresets.find((p) => p.value === filters.priceTier);
    if (preset && preset.value !== 'all') return preset.label;
    return 'Budget';
  };

  const getBedroomsLabel = () => {
    if (!isBedroomsActive) return 'Bedrooms';
    return filters.bhk === '5' ? '5+ BHK' : `${filters.bhk} BHK`;
  };

  const getAreaLabel = () => {
    if (filters.areaTier === 'custom') {
      if (filters.minArea && filters.maxArea) {
        return `${filters.minArea}–${filters.maxArea} sq.ft`;
      }
      if (filters.minArea) return `> ${filters.minArea} sq.ft`;
      if (filters.maxArea) return `< ${filters.maxArea} sq.ft`;
    }
    const preset = areaPresets.find((p) => p.value === filters.areaTier);
    if (preset && preset.value !== 'all') return preset.label;
    return 'Area';
  };

  return (
    <div ref={barRef} className="relative z-30 mb-6">
      {/* Horizontal Pill Bar Container with Horizontal Scroll on Small Screens */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">

        {/* 1. TYPOLOGY PILL */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => toggleDropdown('typology')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer select-none active:scale-95 ${
              isTypologyActive
                ? 'bg-[#183653] text-white border-[#183653] shadow-xs'
                : 'bg-white hover:bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6]'
            }`}
          >
            <span>{getTypologyLabel()}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'typology' ? 'rotate-180' : ''}`} />
          </button>

          {/* Typology Dropdown */}
          <AnimatePresence>
            {activeDropdown === 'typology' && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-[#D9E0E6] rounded-2xl shadow-[0_16px_36px_rgba(24,54,83,0.12)] p-2 z-40"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] px-3 py-1.5 border-b border-[#D9E0E6]/70 mb-1">
                  Select Typology
                </div>
                <div className="space-y-0.5 max-h-64 overflow-y-auto">
                  {typologyOptions.map((opt) => {
                    const isSelected = filters.category === opt.value;
                    const Icon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          onFilterChange('category', opt.value);
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#183653] text-white font-medium'
                            : 'text-[#102B46] hover:bg-[#F8F7F3]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#354B60]'}`} />}
                          <span>{opt.label}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. LOCATION PILL */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => toggleDropdown('location')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer select-none active:scale-95 ${
              isLocationActive
                ? 'bg-[#183653] text-white border-[#183653] shadow-xs'
                : 'bg-white hover:bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6]'
            }`}
          >
            <span>{getLocationLabel()}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'location' ? 'rotate-180' : ''}`} />
          </button>

          {/* Location Dropdown */}
          <AnimatePresence>
            {activeDropdown === 'location' && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl border border-[#D9E0E6] rounded-2xl shadow-[0_16px_36px_rgba(24,54,83,0.12)] p-2 z-40"
              >
                {/* Search input inside location dropdown */}
                <div className="p-1 pb-2 border-b border-[#D9E0E6]">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#354B60] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search Karnataka locality..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F8F7F3] border border-[#D9E0E6] rounded-xl focus:outline-none focus:border-[#183653] placeholder:text-[#7896B2]"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Localities List */}
                <div className="space-y-0.5 max-h-56 overflow-y-auto pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange('location', 'all');
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                      filters.location === 'all'
                        ? 'bg-[#183653] text-white font-medium'
                        : 'text-[#102B46] hover:bg-[#F8F7F3]'
                    }`}
                  >
                    <span>All Karnataka Localities</span>
                    {filters.location === 'all' && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>

                  {filteredLocations.map((loc) => {
                    const isSelected = filters.location === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          onFilterChange('location', loc);
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#183653] text-white font-medium'
                            : 'text-[#102B46] hover:bg-[#F8F7F3]'
                        }`}
                      >
                        <span>{loc}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}

                  {filteredLocations.length === 0 && (
                    <div className="p-3 text-center text-xs text-[#354B60] font-light">
                      No localities match "{locationSearch}"
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. BUDGET PILL */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => toggleDropdown('budget')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer select-none active:scale-95 ${
              isBudgetActive
                ? 'bg-[#183653] text-white border-[#183653] shadow-xs'
                : 'bg-white hover:bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6]'
            }`}
          >
            <span>{getBudgetLabel()}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'budget' ? 'rotate-180' : ''}`} />
          </button>

          {/* Budget Dropdown */}
          <AnimatePresence>
            {activeDropdown === 'budget' && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl border border-[#D9E0E6] rounded-2xl shadow-[0_16px_36px_rgba(24,54,83,0.12)] p-3 z-40"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] pb-2 border-b border-[#D9E0E6]">
                  Budget Tier
                </div>

                <div className="space-y-0.5 py-2">
                  {budgetPresets.map((preset) => {
                    const isSelected = filters.priceTier === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => {
                          onFilterChange('priceTier', preset.value);
                          onFilterChange('minPrice', preset.min);
                          onFilterChange('maxPrice', preset.max);
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#183653] text-white font-medium'
                            : 'text-[#102B46] hover:bg-[#F8F7F3]'
                        }`}
                      >
                        <span>{preset.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Min / Max Price Inputs */}
                <form onSubmit={handleApplyCustomBudget} className="pt-2 border-t border-[#D9E0E6] space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#354B60]">
                    Custom Range (in ₹ Crores)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="Min Cr (e.g. 5)"
                        value={tempMinPriceCr}
                        onChange={(e) => setTempMinPriceCr(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#F8F7F3] border border-[#D9E0E6] rounded-xl focus:outline-none focus:border-[#183653]"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        step="0.5"
                        placeholder="Max Cr (e.g. 20)"
                        value={tempMaxPriceCr}
                        onChange={(e) => setTempMaxPriceCr(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#F8F7F3] border border-[#D9E0E6] rounded-xl focus:outline-none focus:border-[#183653]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-[#183653] hover:bg-[#315D82] text-white text-[11px] font-mono uppercase tracking-wider rounded-xl transition-colors cursor-pointer font-semibold"
                  >
                    Apply Range
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. BEDROOMS PILL */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => toggleDropdown('bedrooms')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer select-none active:scale-95 ${
              isBedroomsActive
                ? 'bg-[#183653] text-white border-[#183653] shadow-xs'
                : 'bg-white hover:bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6]'
            }`}
          >
            <span>{getBedroomsLabel()}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'bedrooms' ? 'rotate-180' : ''}`} />
          </button>

          {/* Bedrooms Dropdown */}
          <AnimatePresence>
            {activeDropdown === 'bedrooms' && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-[#D9E0E6] rounded-2xl shadow-[0_16px_36px_rgba(24,54,83,0.12)] p-2 z-40"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] px-3 py-1.5 border-b border-[#D9E0E6]/70 mb-1">
                  Bedrooms Typology
                </div>
                <div className="space-y-0.5">
                  {bedroomOptions.map((opt) => {
                    const isSelected = filters.bhk === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          onFilterChange('bhk', opt.value);
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#183653] text-white font-medium'
                            : 'text-[#102B46] hover:bg-[#F8F7F3]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 5. AREA PILL */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => toggleDropdown('area')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer select-none active:scale-95 ${
              isAreaActive
                ? 'bg-[#183653] text-white border-[#183653] shadow-xs'
                : 'bg-white hover:bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6]'
            }`}
          >
            <span>{getAreaLabel()}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'area' ? 'rotate-180' : ''}`} />
          </button>

          {/* Area Dropdown */}
          <AnimatePresence>
            {activeDropdown === 'area' && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-72 bg-white/95 backdrop-blur-xl border border-[#D9E0E6] rounded-2xl shadow-[0_16px_36px_rgba(24,54,83,0.12)] p-3 z-40"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] pb-2 border-b border-[#D9E0E6]">
                  Built-up / Plot Area
                </div>
                <div className="space-y-0.5 py-2">
                  {areaPresets.map((preset) => {
                    const isSelected = filters.areaTier === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => {
                          onFilterChange('areaTier', preset.value);
                          onFilterChange('minArea', preset.min);
                          onFilterChange('maxArea', preset.max);
                          setActiveDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#183653] text-white font-medium'
                            : 'text-[#102B46] hover:bg-[#F8F7F3]'
                        }`}
                      >
                        <span>{preset.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Min / Max Area */}
                <form onSubmit={handleApplyCustomArea} className="pt-2 border-t border-[#D9E0E6] space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#354B60]">
                    Custom Area (in sq. ft.)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="number"
                        placeholder="Min sq.ft"
                        value={tempMinArea}
                        onChange={(e) => setTempMinArea(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#F8F7F3] border border-[#D9E0E6] rounded-xl focus:outline-none focus:border-[#183653]"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Max sq.ft"
                        value={tempMaxArea}
                        onChange={(e) => setTempMaxArea(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#F8F7F3] border border-[#D9E0E6] rounded-xl focus:outline-none focus:border-[#183653]"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-[#183653] hover:bg-[#315D82] text-white text-[11px] font-mono uppercase tracking-wider rounded-xl transition-colors cursor-pointer font-semibold"
                  >
                    Apply Area
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 6. VERIFIED PILL */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => toggleDropdown('verified')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer select-none active:scale-95 ${
              isVerifiedActive
                ? 'bg-emerald-900 text-emerald-100 border-emerald-700 shadow-xs'
                : 'bg-white hover:bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6]'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isVerifiedActive ? 'text-emerald-300' : 'text-[#315D82]'}`} />
            <span>{isVerifiedActive ? 'Verified Only' : 'Verification'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'verified' ? 'rotate-180' : ''}`} />
          </button>

          {/* Verified Dropdown */}
          <AnimatePresence>
            {activeDropdown === 'verified' && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl border border-[#D9E0E6] rounded-2xl shadow-[0_16px_36px_rgba(24,54,83,0.12)] p-2 z-40"
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] px-3 py-1.5 border-b border-[#D9E0E6]/70 mb-1">
                  Title &amp; Deed Verification
                </div>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange('verifiedOnly', false);
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                      !filters.verifiedOnly
                        ? 'bg-[#183653] text-white font-medium'
                        : 'text-[#102B46] hover:bg-[#F8F7F3]'
                    }`}
                  >
                    <span>All Properties</span>
                    {!filters.verifiedOnly && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange('verifiedOnly', true);
                      setActiveDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-colors cursor-pointer ${
                      filters.verifiedOnly
                        ? 'bg-emerald-900 text-emerald-100 font-medium'
                        : 'text-[#102B46] hover:bg-[#F8F7F3]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Verified Properties Only</span>
                    </div>
                    {filters.verifiedOnly && <Check className="w-3.5 h-3.5 text-emerald-200" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 7. MORE FILTERS PILL */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => toggleDropdown('more')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all border cursor-pointer select-none active:scale-95 ${
              isMoreFiltersActive
                ? 'bg-[#183653] text-white border-[#183653] shadow-xs'
                : 'bg-white hover:bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>More Filters</span>
            {moreFiltersActiveCount > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-emerald-500 text-white font-mono text-[9px] flex items-center justify-center font-bold">
                {moreFiltersActiveCount}
              </span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180' : ''}`} />
          </button>

          {/* More Filters Dropdown (Right-aligned to avoid screen clipping) */}
          <AnimatePresence>
            {activeDropdown === 'more' && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl border border-[#D9E0E6] rounded-2xl shadow-[0_16px_36px_rgba(24,54,83,0.14)] p-4 z-40 space-y-4 max-h-[75vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#D9E0E6]">
                  <span className="font-serif text-sm font-semibold text-[#183653]">
                    Detailed Specifications
                  </span>
                  {isMoreFiltersActive && (
                    <button
                      type="button"
                      onClick={() => {
                        onFilterChange('bathrooms', 'all');
                        onFilterChange('furnishing', 'all');
                        onFilterChange('sellerType', 'all');
                        onFilterChange('status', 'all');
                      }}
                      className="text-[10px] font-mono uppercase text-[#354B60] hover:text-[#183653] underline"
                    >
                      Reset More
                    </button>
                  )}
                </div>

                {/* A. Bathrooms */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] block">
                    Bathrooms
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[
                      { label: 'Any', val: 'all' },
                      { label: '2+', val: '2' },
                      { label: '3+', val: '3' },
                      { label: '4+', val: '4' },
                      { label: '5+', val: '5' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => onFilterChange('bathrooms', opt.val)}
                        className={`py-1.5 text-xs font-mono text-center rounded-xl border transition-colors cursor-pointer ${
                          filters.bathrooms === opt.val
                            ? 'bg-[#183653] text-white border-[#183653] font-bold'
                            : 'bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6] hover:border-[#183653]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* B. Furnishing Status */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] block">
                    Furnishing
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: 'Any', val: 'all' },
                      { label: 'Semi-Furnished', val: 'Semi-Furnished' },
                      { label: 'Fully Furnished', val: 'Fully Furnished' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => onFilterChange('furnishing', opt.val)}
                        className={`py-1.5 px-2 text-[11px] font-mono text-center rounded-xl border transition-colors truncate cursor-pointer ${
                          filters.furnishing === opt.val
                            ? 'bg-[#183653] text-white border-[#183653] font-bold'
                            : 'bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6] hover:border-[#183653]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* C. Ownership / Seller Representation */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] block">
                    Ownership Type / Seller
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { label: 'Any Seller', val: 'all' },
                      { label: 'Direct Owner', val: 'Owner' },
                      { label: 'Verified Agent', val: 'Agent' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => onFilterChange('sellerType', opt.val)}
                        className={`py-1.5 px-2 text-[11px] font-mono text-center rounded-xl border transition-colors truncate cursor-pointer ${
                          filters.sellerType === opt.val
                            ? 'bg-[#183653] text-white border-[#183653] font-bold'
                            : 'bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6] hover:border-[#183653]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* D. Property Availability */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#354B60] block">
                    Property Availability
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: 'All Listings', val: 'all' },
                      { label: 'Active Residences Only', val: 'active' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => onFilterChange('status', opt.val)}
                        className={`py-1.5 px-2 text-[11px] font-mono text-center rounded-xl border transition-colors truncate cursor-pointer ${
                          filters.status === opt.val
                            ? 'bg-[#183653] text-white border-[#183653] font-bold'
                            : 'bg-[#F8F7F3] text-[#102B46] border-[#D9E0E6] hover:border-[#183653]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D9E0E6]">
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(null)}
                    className="w-full py-2 bg-[#183653] text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#315D82] transition-colors cursor-pointer"
                  >
                    View Results ({totalResults})
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reset All Quick Action */}
        {(isTypologyActive || isLocationActive || isBudgetActive || isBedroomsActive || isAreaActive || isVerifiedActive || isMoreFiltersActive) && (
          <button
            type="button"
            onClick={onClearAll}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono uppercase tracking-wider text-[#354B60] hover:text-rose-700 hover:bg-rose-50 transition-colors border border-transparent hover:border-rose-200 cursor-pointer"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
};
