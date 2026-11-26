import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, SlidersHorizontal, X, ArrowUpDown,
  MapPin, Check, ChevronDown, RotateCcw, Filter,
  Building2, Home, TreePine, Landmark, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockProperties } from '../../../data/mockProperties';
import { PropertyCard } from '../components/PropertyCard';
import { Container, Badge, Button } from '../../../components/ui';
import { PropertyCategory } from '../../../types/property';

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter state from URL query or defaults
  const [query, setQuery] = useState(searchParams.get('search') || searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedLocation, setSelectedLocation] = useState<string>(searchParams.get('loc') || 'all');
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>(searchParams.get('budget') || 'all');
  const [selectedAreaTier, setSelectedAreaTier] = useState<string>(searchParams.get('area') || 'all');
  const [selectedBHK, setSelectedBHK] = useState<string>(searchParams.get('bhk') || 'all');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'recent');

  // Pagination / Load More state
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter visibility: hidden by default until user opens it
  const [showFilters, setShowFilters] = useState(false);

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state with URL params when searchParams changes
  useEffect(() => {
    const locParam = searchParams.get('location');
    const catParam = searchParams.get('category');
    const budgetParam = searchParams.get('budget');
    if (locParam) setQuery(locParam);
    if (catParam) setSelectedCategory(catParam);
    if (budgetParam) setSelectedPriceTier(budgetParam);
  }, [searchParams]);

  // Unique locations from data
  const locationsList = useMemo(() => {
    const locs = Array.from(new Set(mockProperties.map((p) => p.location.locality))).sort();
    return locs;
  }, []);

  // Filter categories definition
  const categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Independent House', value: 'independent-house' },
    { label: 'Plot', value: 'plot' },
    { label: 'Agricultural Land', value: 'agricultural' },
    { label: 'Commercial', value: 'commercial' },
  ];

  const priceTiers = [
    { label: 'Any Price', value: 'all', min: 0, max: Infinity },
    { label: 'Under ₹5 Cr', value: 'under-5cr', min: 0, max: 50000000 },
    { label: '₹5 Cr – ₹10 Cr', value: '5cr-10cr', min: 50000000, max: 100000000 },
    { label: '₹10 Cr – ₹20 Cr', value: '10cr-20cr', min: 100000000, max: 200000000 },
    { label: 'Above ₹20 Cr', value: 'above-20cr', min: 200000000, max: Infinity },
  ];

  const areaTiers = [
    { label: 'Any Area', value: 'all', min: 0, max: Infinity },
    { label: 'Under 2,500 sq.ft', value: 'under-2500', min: 0, max: 2500 },
    { label: '2,500 – 5,000 sq.ft', value: '2500-5000', min: 2500, max: 5000 },
    { label: '5,000 – 10,000 sq.ft', value: '5000-10000', min: 5000, max: 10000 },
    { label: 'Above 10,000 sq.ft', value: 'above-10000', min: 10000, max: Infinity },
  ];

  const bhkOptions = [
    { label: 'Any', value: 'all' },
    { label: '2 BHK', value: '2' },
    { label: '3 BHK', value: '3' },
    { label: '4 BHK', value: '4' },
    { label: '5+ BHK', value: '5' },
  ];

  // Primary filtering computation
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      // 1. Text Search (title, tagline, locality, city, address, description)
      if (query.trim()) {
        const q = query.toLowerCase().trim();
        const matchesQuery =
          property.title.toLowerCase().includes(q) ||
          (property.tagline && property.tagline.toLowerCase().includes(q)) ||
          property.location.locality.toLowerCase().includes(q) ||
          property.location.city.toLowerCase().includes(q) ||
          property.location.address.toLowerCase().includes(q) ||
          property.description.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Category Filter (supports plot & land interchangeably)
      if (selectedCategory !== 'all') {
        const matchesCategory =
          property.category === selectedCategory ||
          (selectedCategory === 'plot' && property.category === 'land') ||
          (selectedCategory === 'land' && property.category === 'plot');
        if (!matchesCategory) return false;
      }

      // 3. Location Filter
      if (selectedLocation !== 'all') {
        if (property.location.locality !== selectedLocation) return false;
      }

      // 4. Price Tier Filter
      if (selectedPriceTier !== 'all') {
        const tier = priceTiers.find((t) => t.value === selectedPriceTier);
        if (tier) {
          if (property.price < tier.min || property.price > tier.max) return false;
        }
      }

      // 5. Area Tier Filter
      if (selectedAreaTier !== 'all') {
        const tier = areaTiers.find((t) => t.value === selectedAreaTier);
        if (tier) {
          if (property.features.areaSqFt < tier.min || property.features.areaSqFt > tier.max) return false;
        }
      }

      // 6. Bedrooms Filter
      if (selectedBHK !== 'all') {
        const targetBHK = parseInt(selectedBHK, 10);
        if (targetBHK === 5) {
          if (!property.features.bedrooms || property.features.bedrooms < 5) return false;
        } else {
          if (property.features.bedrooms !== targetBHK) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.features.areaSqFt - a.features.areaSqFt;
      // Default: recent
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [query, selectedCategory, selectedLocation, selectedPriceTier, selectedAreaTier, selectedBHK, sortBy]);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [query, selectedCategory, selectedLocation, selectedPriceTier, selectedAreaTier, selectedBHK, sortBy]);

  // Check if any filters are active
  const hasActiveFilters =
    query.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedLocation !== 'all' ||
    selectedPriceTier !== 'all' ||
    selectedAreaTier !== 'all' ||
    selectedBHK !== 'all';

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (query.trim()) count++;
    if (selectedCategory !== 'all') count++;
    if (selectedLocation !== 'all') count++;
    if (selectedPriceTier !== 'all') count++;
    if (selectedAreaTier !== 'all') count++;
    if (selectedBHK !== 'all') count++;
    return count;
  }, [query, selectedCategory, selectedLocation, selectedPriceTier, selectedAreaTier, selectedBHK]);

  const clearAllFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSelectedPriceTier('all');
    setSelectedAreaTier('all');
    setSelectedBHK('all');
    setSortBy('recent');
    setSearchParams({});
  };

  // Slice displayed items for load-more pagination
  const visibleProperties = filteredProperties.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProperties.length;

  return (
    <div className="py-8 sm:py-12 pb-24">
      <Container>
        {/* ========================================================= */}
        {/* PAGE HEADER                                               */}
        {/* ========================================================= */}
        <div className="border-b border-[#D9E0E6] pb-8 mb-8 space-y-3">
          <Badge variant="subtle" size="sm">
            Curated Discovery &bull; Karnataka
          </Badge>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#183653] font-normal tracking-tight">
                Explore Properties
              </h1>
              <p className="text-[#354B60] text-sm sm:text-base max-w-2xl leading-relaxed mt-2 font-light">
                Discover exceptional villas, penthouses, bespoke plots, and coffee estates. Direct verified seller representation with zero brokerage.
              </p>
            </div>
            <div className="text-xs font-mono text-[#354B60] uppercase tracking-wider shrink-0">
              Showing <span className="font-bold text-[#183653]">{filteredProperties.length}</span> of {mockProperties.length} properties
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SEARCH AND QUICK BAR                                      */}
        {/* ========================================================= */}
        <div className="surface-glass p-3 sm:p-4 mb-6 shadow-[0_8px_24px_rgba(16,43,70,0.06)] rounded-[1.5rem] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Keyword Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#354B60] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by neighborhood, title, or keywords (e.g. Sadashivanagar, Courtyard, Plot)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm text-[#102B46] placeholder:text-[#7896B2] focus:outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#354B60] hover:text-[#102B46]"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle Button (Desktop & Mobile) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setMobileFilterOpen(true);
                } else {
                  setShowFilters((prev) => !prev);
                }
              }}
              className={`inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                showFilters || hasActiveFilters
                  ? 'bg-[#183653] text-white shadow-xs'
                  : 'bg-[#F8F7F3] hover:bg-[#DCE7F0] text-[#183653] border border-[#D9E0E6]'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showFilters ? 'Hide Filters' : 'Filters'}</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#315D82] text-white font-mono text-[9px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Desktop Sort Dropdown */}
          <div className="hidden md:flex items-center gap-2 border-l border-[#D9E0E6] pl-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#354B60] whitespace-nowrap">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#D9E0E6] text-xs font-medium text-[#102B46] pl-3 pr-8 py-2 rounded-2xl focus:outline-none focus:border-[#183653] cursor-pointer"
              >
                <option value="recent">Recently Added</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest First</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#354B60] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ACTIVE FILTER CHIPS                                       */}
        {/* ========================================================= */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-8 p-3 sm:p-4 bg-white/75 backdrop-blur-md border border-[#D9E0E6]/70 rounded-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#354B60] mr-2">
              Active Filters:
            </span>

            {query.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#DCE7F0] text-[#183653] rounded-2xl font-mono">
                Keyword: "{query}"
                <button onClick={() => setQuery('')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#DCE7F0] text-[#183653] rounded-2xl font-mono capitalize">
                Category: {categoryOptions.find((c) => c.value === selectedCategory)?.label || selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedLocation !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#DCE7F0] text-[#183653] rounded-2xl font-mono">
                Locality: {selectedLocation}
                <button onClick={() => setSelectedLocation('all')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedPriceTier !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#DCE7F0] text-[#183653] rounded-2xl font-mono">
                Price: {priceTiers.find((t) => t.value === selectedPriceTier)?.label}
                <button onClick={() => setSelectedPriceTier('all')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedAreaTier !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#DCE7F0] text-[#183653] rounded-2xl font-mono">
                Area: {areaTiers.find((t) => t.value === selectedAreaTier)?.label}
                <button onClick={() => setSelectedAreaTier('all')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedBHK !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-[#DCE7F0] text-[#183653] rounded-2xl font-mono">
                Bedrooms: {selectedBHK === '5' ? '5+ BHK' : `${selectedBHK} BHK`}
                <button onClick={() => setSelectedBHK('all')} className="hover:text-black">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="ml-auto text-xs font-mono uppercase tracking-wider text-[#354B60] hover:text-[#183653] underline underline-offset-4 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* MAIN LAYOUT: SIDEBAR + PROPERTY GRID                      */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ------------------------------------------------------- */}
          {/* DESKTOP FILTER SIDEBAR (Span 3 when open)               */}
          {/* ------------------------------------------------------- */}
          {showFilters && (
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-6">
              <div className="surface-glass p-5 sm:p-6 shadow-[0_8px_24px_rgba(16,43,70,0.06)] space-y-6 rounded-[1.5rem]">

                {/* Sidebar Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#D9E0E6]">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#183653]" />
                    <span className="font-serif text-lg font-semibold text-[#183653]">Filters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="text-[11px] font-mono uppercase tracking-wider text-[#354B60] hover:text-[#183653] flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-1 text-[#354B60] hover:text-[#183653] rounded-full hover:bg-black/5 cursor-pointer ml-1"
                      title="Hide Filters"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              {/* 1. Category Filter */}
              <div className="space-y-3 pb-5 border-b border-[#D9E0E6]">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                  Property Typology
                </label>
                <div className="space-y-1.5">
                  {categoryOptions.map((cat) => {
                    const isSelected = selectedCategory === cat.value;
                    const count = cat.value === 'all'
                      ? mockProperties.length
                      : mockProperties.filter((p) => p.category === cat.value || (cat.value === 'plot' && p.category === 'land')).length;

                    return (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`w-full flex items-center justify-between text-xs py-1.5 px-2.5 rounded-2xl transition-colors cursor-pointer text-left ${isSelected
                          ? 'bg-[#183653] text-white font-medium'
                          : 'text-[#102B46] hover:bg-[#F8F7F3]'
                          }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`text-[10px] font-mono ${isSelected ? 'text-[#7896B2]' : 'text-[#354B60]'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Locality Filter */}
              <div className="space-y-3 pb-5 border-b border-[#D9E0E6]">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                  Neighborhood / Locality
                </label>
                <div className="relative">
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full appearance-none bg-white border border-[#D9E0E6] text-xs font-medium text-[#102B46] px-3 py-2 pr-8 rounded-2xl focus:outline-none focus:border-[#183653] cursor-pointer"
                  >
                    <option value="all">All Karnataka Localities</option>
                    {locationsList.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#354B60] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 3. Budget / Price Range */}
              <div className="space-y-3 pb-5 border-b border-[#D9E0E6]">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                  Budget (INR)
                </label>
                <div className="space-y-1.5">
                  {priceTiers.map((tier) => {
                    const isSelected = selectedPriceTier === tier.value;
                    return (
                      <label
                        key={tier.value}
                        className="flex items-center gap-2.5 text-xs text-[#102B46] cursor-pointer py-1"
                      >
                        <input
                          type="radio"
                          name="priceTier"
                          checked={isSelected}
                          onChange={() => setSelectedPriceTier(tier.value)}
                          className="accent-[#183653] cursor-pointer"
                        />
                        <span className={isSelected ? 'font-semibold text-[#183653]' : 'text-[#102B46]'}>
                          {tier.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 4. Area Range (sq.ft) */}
              <div className="space-y-3 pb-5 border-b border-[#D9E0E6]">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                  Super Area (sq.ft)
                </label>
                <div className="space-y-1.5">
                  {areaTiers.map((tier) => {
                    const isSelected = selectedAreaTier === tier.value;
                    return (
                      <label
                        key={tier.value}
                        className="flex items-center gap-2.5 text-xs text-[#102B46] cursor-pointer py-1"
                      >
                        <input
                          type="radio"
                          name="areaTier"
                          checked={isSelected}
                          onChange={() => setSelectedAreaTier(tier.value)}
                          className="accent-[#183653] cursor-pointer"
                        />
                        <span className={isSelected ? 'font-semibold text-[#183653]' : 'text-[#102B46]'}>
                          {tier.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* 5. Bedrooms Filter (BHK) */}
              <div className="space-y-3">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                  Bedrooms
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {bhkOptions.map((bhk) => {
                    const isSelected = selectedBHK === bhk.value;
                    return (
                      <button
                        key={bhk.value}
                        type="button"
                        onClick={() => setSelectedBHK(bhk.value)}
                        className={`py-2 text-xs font-mono text-center rounded-2xl border transition-colors cursor-pointer ${isSelected
                          ? 'bg-[#183653] text-white border-[#183653]'
                          : 'bg-white text-[#102B46] border-[#D9E0E6] hover:border-[#183653]'
                          }`}
                      >
                        {bhk.label}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>
          )}

          {/* ------------------------------------------------------- */}
          {/* PROPERTY GRID & RESULTS                                 */}
          {/* ------------------------------------------------------- */}
          <main className={`${showFilters ? 'lg:col-span-9' : 'lg:col-span-12'} space-y-8 transition-all duration-300`}>
            {filteredProperties.length > 0 ? (
              <>
                <div className={`grid grid-cols-1 md:grid-cols-2 ${showFilters ? '' : 'lg:grid-cols-3'} gap-8`}>
                  {visibleProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Load More Pagination Module */}
                <div className="pt-8 border-t border-[#D9E0E6] flex flex-col items-center justify-center space-y-4">
                  <div className="text-xs font-mono uppercase text-[#354B60] tracking-wider">
                    Viewing {visibleProperties.length} of {filteredProperties.length} properties
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-48 h-1 bg-[#D9E0E6] overflow-hidden rounded-full">
                    <div
                      className="h-full bg-[#183653] transition-all duration-300"
                      style={{
                        width: `${(visibleProperties.length / filteredProperties.length) * 100}%`,
                      }}
                    />
                  </div>

                  {hasMore && (
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="mt-2"
                    >
                      Load More Properties
                    </Button>
                  )}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-20 bg-white border border-[#D9E0E6] p-8 max-w-xl mx-auto space-y-4">
                <div className="w-12 h-12 bg-[#EDF2F6] text-[#183653] mx-auto flex items-center justify-center font-serif text-2xl font-bold rounded-2xl">
                  0
                </div>
                <h2 className="font-serif text-2xl text-[#183653]">No matching properties found</h2>
                <p className="text-xs text-[#354B60] leading-relaxed max-w-md mx-auto">
                  We could not find any residences matching your selected typology, budget, or locality. Try clearing active filters or modifying search keywords.
                </p>
                <div className="pt-2">
                  <Button variant="primary" size="sm" onClick={clearAllFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* ========================================================= */}
      {/* MOBILE FILTER DRAWER                                      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#F8F7F3] shadow-[0_20px_60px_rgba(16,43,70,0.2)] flex flex-col z-10 overflow-hidden sm:rounded-l-[1.5rem]"
            >
              {/* Drawer Header */}
              <div className="p-5 bg-white/90 backdrop-blur-md border-b border-[#D9E0E6]/80 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#183653]">Filter Properties</h2>
                  <div className="text-[11px] font-mono text-[#354B60] uppercase">
                    {filteredProperties.length} Results
                  </div>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-2 text-[#102B46] hover:text-[#183653]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* 1. Category */}
                <div className="space-y-3 pb-5 border-b border-[#D9E0E6]">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                    Property Typology
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryOptions.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`text-xs p-2.5 rounded-2xl border text-left transition-colors ${selectedCategory === cat.value
                          ? 'bg-[#183653] text-white border-[#183653]'
                          : 'bg-white text-[#102B46] border-[#D9E0E6]'
                          }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Neighborhood */}
                <div className="space-y-3 pb-5 border-b border-[#D9E0E6]">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                    Locality
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-white border border-[#D9E0E6] text-xs p-2.5 rounded-2xl"
                  >
                    <option value="all">All Localities</option>
                    {locationsList.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Budget */}
                <div className="space-y-3 pb-5 border-b border-[#D9E0E6]">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                    Budget (INR)
                  </label>
                  <div className="space-y-2">
                    {priceTiers.map((tier) => (
                      <label key={tier.value} className="flex items-center gap-2 text-xs">
                        <input
                          type="radio"
                          name="mobilePrice"
                          checked={selectedPriceTier === tier.value}
                          onChange={() => setSelectedPriceTier(tier.value)}
                          className="accent-[#183653]"
                        />
                        <span>{tier.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Bedrooms */}
                <div className="space-y-3 pb-5 border-b border-[#D9E0E6]">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                    Bedrooms
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {bhkOptions.map((bhk) => (
                      <button
                        key={bhk.value}
                        type="button"
                        onClick={() => setSelectedBHK(bhk.value)}
                        className={`py-2 text-xs font-mono border rounded-2xl ${selectedBHK === bhk.value
                          ? 'bg-[#183653] text-white border-[#183653]'
                          : 'bg-white text-[#102B46] border-[#D9E0E6]'
                          }`}
                      >
                        {bhk.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Sort options in mobile */}
                <div className="space-y-3">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#354B60]">
                    Sort Order
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white border border-[#D9E0E6] text-xs p-2.5 rounded-2xl"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="area-desc">Area: Largest First</option>
                  </select>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 bg-white/90 backdrop-blur-md border-t border-[#D9E0E6]/80 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={clearAllFilters}
                  className="flex-1"
                >
                  Reset
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1"
                >
                  Show Results ({filteredProperties.length})
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
