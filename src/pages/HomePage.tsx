import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search, ArrowRight, ArrowUpRight, CheckCircle2,
  MapPin, SlidersHorizontal, Shield, Sparkles, Building,
  Compass, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockProperties, formatINR } from '../data/mockProperties';
import { propertyCategories } from '../data/categories';
import { featuredLocations } from '../data/locations';
import { PropertyCard } from '../components/property/PropertyCard';
import { Container, Section, Badge, Button } from '../components/ui';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Hero search state
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchBudget, setSearchBudget] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchLocation.trim()) params.set('location', searchLocation.trim());
    if (searchCategory !== 'all') params.set('category', searchCategory);
    if (searchBudget !== 'all') params.set('budget', searchBudget);
    navigate(`/explore?${params.toString()}`);
  };

  // Featured properties (first 4 curated)
  const featured = mockProperties.filter((p) => p.isFeatured).slice(0, 4);

  // Recently listed (sorted by creation date)
  const recent = [...mockProperties]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      {/* ========================================================= */}
      {/* 2. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative pt-6 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Editorial Headline & Search */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-8 z-10"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#183D30]/10 text-[#183D30] text-xs font-mono uppercase tracking-widest rounded-[1px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Real Estate &bull; Karnataka</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5rem] leading-[1.04] text-[#183D30] font-normal tracking-tight">
                Find a place that <br />
                <span className="italic font-light">feels like yours.</span>
              </h1>

              <p className="text-[#737970] text-base sm:text-lg max-w-xl leading-relaxed font-light">
                Discover exceptional homes, private villas, agricultural estates, and land parcels across Bengaluru and Karnataka. Connect directly with verified sellers without intermediary friction.
              </p>
            </div>

            {/* Architectural Search Module */}
            <form
              onSubmit={handleSearch}
              className="bg-white border border-[#E7E6DF] p-3 sm:p-4 shadow-[0_4px_20px_rgba(24,61,48,0.06)] grid grid-cols-1 sm:grid-cols-12 gap-3"
            >
              {/* Location Input */}
              <div className="sm:col-span-4 border-b sm:border-b-0 sm:border-r border-[#E7E6DF] pb-2 sm:pb-0 sm:pr-3">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Sadashivanagar, Whitefield"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full text-sm font-medium text-[#202520] placeholder:text-[#A7B9A5] focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Category Select */}
              <div className="sm:col-span-3 border-b sm:border-b-0 sm:border-r border-[#E7E6DF] pb-2 sm:pb-0 sm:pr-3">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                  Category
                </label>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full text-sm font-medium text-[#202520] focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="apartment">Apartments</option>
                  <option value="villa">Villas & Estates</option>
                  <option value="land">Land & Plots</option>
                  <option value="commercial">Commercial</option>
                  <option value="agricultural">Agricultural Land</option>
                </select>
              </div>

              {/* Budget Select */}
              <div className="sm:col-span-3 border-b sm:border-b-0 sm:border-r border-[#E7E6DF] pb-2 sm:pb-0 sm:pr-3">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#737970] mb-1">
                  Budget
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(e.target.value)}
                  className="w-full text-sm font-medium text-[#202520] focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">Any Price</option>
                  <option value="under-5cr">Under ₹5 Cr</option>
                  <option value="5cr-10cr">₹5 Cr – ₹10 Cr</option>
                  <option value="above-10cr">Above ₹10 Cr</option>
                </select>
              </div>

              {/* Search Action */}
              <div className="sm:col-span-2 flex items-stretch">
                <button
                  type="submit"
                  className="w-full bg-[#183D30] hover:bg-[#315B49] text-white flex items-center justify-center gap-1.5 py-3 px-4 font-mono text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer rounded-[1px] active:scale-[0.98]"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Subtle Market Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#737970] font-mono uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#315B49]" />
                Direct Verified Owners
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#315B49]" />
                Zero Buyer Brokerage
              </span>
            </div>
          </motion.div>

          {/* Right Column: Architectural Photography Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-[#E7E6DF] bg-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Architectural Villa at Sadashivanagar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183D30]/75 via-transparent to-transparent pointer-events-none" />

              {/* Highlight Card Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md border border-[#E7E6DF] text-[#202520] space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#737970]">
                  <span>Featured Residence</span>
                  <span className="text-[#183D30] font-bold">₹18.5 Cr</span>
                </div>
                <div className="font-serif text-lg font-semibold text-[#183D30]">
                  The Courtyard Villa
                </div>
                <div className="text-xs text-[#737970] flex items-center justify-between pt-1 border-t border-[#E7E6DF]">
                  <span>Sadashivanagar, Bengaluru</span>
                  <Link
                    to="/property/prop-1"
                    className="text-[#183D30] font-medium hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>View</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Architectural Grid Accent Lines */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l border-b border-[#315B49]/40 pointer-events-none -z-10" />
            <div className="absolute -top-4 -right-4 w-24 h-24 border-r border-t border-[#315B49]/40 pointer-events-none -z-10" />
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PROPERTY CATEGORIES (Image-Based Discovery)            */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E6DF] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
              Architectural Typologies
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal mt-1 tracking-tight">
              Property Categories
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-mono uppercase tracking-wider text-[#183D30] hover:text-[#315B49] flex items-center gap-1.5 transition-colors group"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 5 Distinct Categories in Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Category 1: Apartments & Penthouses (Span 7) */}
          <Link
            to={`/explore?category=${propertyCategories[0].slug}`}
            className="md:col-span-7 group relative h-80 overflow-hidden border border-[#E7E6DF] bg-white flex flex-col justify-end p-8"
          >
            <img
              src={propertyCategories[0].image}
              alt={propertyCategories[0].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5]">
                {propertyCategories[0].count} Available Listings
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white group-hover:underline underline-offset-8 decoration-1 decoration-[#A7B9A5]">
                {propertyCategories[0].name}
              </h3>
              <p className="text-xs text-white/80 line-clamp-1 font-light max-w-lg">
                {propertyCategories[0].description}
              </p>
            </div>
          </Link>

          {/* Category 2: Villas & Private Estates (Span 5) */}
          <Link
            to={`/explore?category=${propertyCategories[1].slug}`}
            className="md:col-span-5 group relative h-80 overflow-hidden border border-[#E7E6DF] bg-white flex flex-col justify-end p-8"
          >
            <img
              src={propertyCategories[1].image}
              alt={propertyCategories[1].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5]">
                {propertyCategories[1].count} Available Listings
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white group-hover:underline underline-offset-8 decoration-1 decoration-[#A7B9A5]">
                {propertyCategories[1].name}
              </h3>
              <p className="text-xs text-white/80 line-clamp-1 font-light">
                {propertyCategories[1].description}
              </p>
            </div>
          </Link>

          {/* Category 3: Land & Plots (Span 4) */}
          <Link
            to={`/explore?category=${propertyCategories[2].slug}`}
            className="md:col-span-4 group relative h-72 overflow-hidden border border-[#E7E6DF] bg-white flex flex-col justify-end p-6"
          >
            <img
              src={propertyCategories[2].image}
              alt={propertyCategories[2].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5]">
                {propertyCategories[2].count} Parcels
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white group-hover:underline underline-offset-4">
                {propertyCategories[2].name}
              </h3>
              <p className="text-xs text-white/80 line-clamp-1 font-light">
                {propertyCategories[2].description}
              </p>
            </div>
          </Link>

          {/* Category 4: Commercial Properties (Span 4) */}
          <Link
            to={`/explore?category=${propertyCategories[3].slug}`}
            className="md:col-span-4 group relative h-72 overflow-hidden border border-[#E7E6DF] bg-white flex flex-col justify-end p-6"
          >
            <img
              src={propertyCategories[3].image}
              alt={propertyCategories[3].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5]">
                {propertyCategories[3].count} Spaces
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white group-hover:underline underline-offset-4">
                {propertyCategories[3].name}
              </h3>
              <p className="text-xs text-white/80 line-clamp-1 font-light">
                {propertyCategories[3].description}
              </p>
            </div>
          </Link>

          {/* Category 5: Agricultural Land (Span 4) */}
          <Link
            to={`/explore?category=${propertyCategories[4].slug}`}
            className="md:col-span-4 group relative h-72 overflow-hidden border border-[#E7E6DF] bg-white flex flex-col justify-end p-6"
          >
            <img
              src={propertyCategories[4].image}
              alt={propertyCategories[4].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5]">
                {propertyCategories[4].count} Estates
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-white group-hover:underline underline-offset-4">
                {propertyCategories[4].name}
              </h3>
              <p className="text-xs text-white/80 line-clamp-1 font-light">
                {propertyCategories[4].description}
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FEATURED PROPERTIES                                    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E6DF] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
              Handpicked Portfolios
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal mt-1 tracking-tight">
              Featured Properties
            </h2>
          </div>
          <Link
            to="/explore"
            className="text-xs font-mono uppercase tracking-wider text-[#183D30] hover:text-[#315B49] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All ({mockProperties.length} Listings)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 2x2 Grid of Featured Architectural Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map((prop, idx) => (
            <PropertyCard key={prop.id} property={prop} priority={idx < 2} />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. DISCOVER BY LOCATION                                   */}
      {/* ========================================================= */}
      <section id="locations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E6DF] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
              Regional Geography
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal mt-1 tracking-tight">
              Discover by Location
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#737970] uppercase tracking-wider">
            BENGALURU &bull; WHITEFIELD &bull; SARJAPUR &bull; DEVANAHALLI &bull; MYSURU
          </span>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {featuredLocations.map((loc) => (
            <Link
              key={loc.id}
              to={`/explore?location=${encodeURIComponent(loc.name)}`}
              className="group relative h-80 overflow-hidden border border-[#E7E6DF] bg-white flex flex-col justify-end p-5 transition-colors duration-300 hover:border-[#183D30]"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5] flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{loc.listingCount} Properties</span>
                </span>
                <h3 className="font-serif text-xl font-medium text-white group-hover:underline underline-offset-4">
                  {loc.name}
                </h3>
                <p className="text-[11px] text-white/80 line-clamp-2 font-light leading-relaxed">
                  {loc.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. RECENTLY LISTED PROPERTIES                             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E6DF] gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
              Market Additions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal mt-1 tracking-tight">
              Recently Listed
            </h2>
            <p className="text-xs text-[#737970] mt-1">
              Fresh additions verified by our architectural appraisal desk this week
            </p>
          </div>
          <Link
            to="/explore?sort=recent"
            className="text-xs font-mono uppercase tracking-wider text-[#183D30] hover:text-[#315B49] flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Recent Listings</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3-Column Grid for Recent Additions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recent.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. PROPERTY OWNER CTA                                     */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#183D30] text-[#F7F6F2] p-8 sm:p-14 lg:p-16 border border-[#315B49] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#A7B9A5]">
              Direct Seller Marketplace
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white tracking-tight">
              Your property deserves the right buyer.
            </h2>

            <p className="text-[#A7B9A5] text-base leading-relaxed font-light">
              List directly with Reality AI to present your villa, penthouse, or land parcel to discerning buyers. Enjoy verified buyer leads, direct WhatsApp inquiries, and zero brokerage interference.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#315B49]/70 text-xs text-[#F7F6F2] font-mono">
              <div>
                <span className="text-[#A7B9A5] block text-[10px]">VERIFICATION</span>
                <span>48-Hour Review</span>
              </div>
              <div>
                <span className="text-[#A7B9A5] block text-[10px]">COMMISSIONS</span>
                <span>0% Brokerage</span>
              </div>
              <div>
                <span className="text-[#A7B9A5] block text-[10px]">LEADS</span>
                <span>Direct to Phone</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/sell"
                className="inline-flex items-center justify-center gap-2 bg-[#F7F6F2] text-[#183D30] px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-[1px] active:scale-[0.98]"
              >
                <span>List your property</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 border border-[#A7B9A5] text-white px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-medium hover:bg-[#315B49] transition-colors rounded-[1px]"
              >
                Explore marketplace first
              </Link>
            </div>
          </div>

          {/* Architectural Geometry Blueprint Decor */}
          <div className="absolute right-0 bottom-0 top-0 w-2/5 opacity-10 pointer-events-none hidden lg:block">
            <div className="w-full h-full border-l border-white grid grid-cols-3 grid-rows-3">
              <div className="border-b border-r border-white" />
              <div className="border-b border-r border-white" />
              <div className="border-b border-white" />
              <div className="border-b border-r border-white" />
              <div className="border-b border-r border-white" />
              <div className="border-b border-white" />
              <div className="border-r border-white" />
              <div className="border-r border-white" />
              <div />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
