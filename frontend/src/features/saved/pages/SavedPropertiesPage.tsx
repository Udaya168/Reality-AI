import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useProperties } from '../../../hooks/useProperties';
import { SavedPropertyGrid } from '../components/SavedPropertyGrid';

export const SavedPropertiesPage: React.FC = () => {
  const { getSavedProperties } = useProperties();
  const savedListings = getSavedProperties();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[#737970]">
          Personal Collection
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#183D30] font-normal mt-1">
          Saved Properties
        </h1>
        <p className="text-sm text-[#737970] mt-1">
          {savedListings.length} properties saved to your browser session
        </p>
      </div>

      {savedListings.length > 0 ? (
        <SavedPropertyGrid properties={savedListings} />
      ) : (
        <div className="text-center py-20 bg-white border border-[#E7E6DF]/80 rounded-3xl p-8 max-w-lg mx-auto space-y-4 shadow-sm">
          <Bookmark className="w-8 h-8 text-[#737970] mx-auto opacity-50" />
          <h2 className="font-serif text-2xl text-[#183D30]">No saved properties yet</h2>
          <p className="text-sm text-[#737970] leading-relaxed">
            Click the bookmark icon on any property card or detail view to save residences for quick comparison later.
          </p>
          <div className="pt-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 bg-[#183D30] text-white px-7 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-full hover:bg-[#315B49] shadow-sm"
            >
              <span>Explore listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
