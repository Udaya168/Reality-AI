import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { useSavedProperties } from '../../../context/SavedPropertiesContext';
import { SavedPropertyGrid } from '../components/SavedPropertyGrid';

export const SavedPropertiesPage: React.FC = () => {
  const { savedProperties, wishlistCount } = useSavedProperties();

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8 sm:py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#D9E0E6]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#183653]/[0.06] text-[#183653] text-[10px] font-mono uppercase tracking-[0.16em] rounded-full mb-2">
          <Sparkles className="w-3 h-3 text-[#315D82]" />
          <span>Curated Selection &bull; Private Collection</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#183653] font-normal mt-1 tracking-tight">
          Your Wishlist
        </h1>
        <p className="text-sm font-['DM_Sans',system-ui,sans-serif] text-[#354B60] mt-2 max-w-2xl leading-relaxed">
          {wishlistCount === 1
            ? '1 architectural residence saved to your private account collection.'
            : `${wishlistCount} architectural residences saved to your private account collection.`}
        </p>
      </div>

      {savedProperties.length > 0 ? (
        <SavedPropertyGrid properties={savedProperties} />
      ) : (
        <div className="text-center py-20 bg-[#FAF8F5] border border-[#E9E4DC] rounded-3xl p-8 max-w-lg mx-auto space-y-5 shadow-sm">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#183653]/10 text-[#183653] flex items-center justify-center">
            <Heart className="w-7 h-7 text-[#7896B2]" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#183653]">Your wishlist is empty</h2>
            <p className="text-xs font-['DM_Sans',system-ui,sans-serif] text-[#52687D] leading-relaxed max-w-md mx-auto mt-2">
              Explore our verified Karnataka villas, penthouses, and architectural estates. Tap the heart icon on any residence to save it to your wishlist.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 bg-[#183653] text-white px-7 py-3 text-xs font-mono uppercase tracking-wider font-semibold rounded-full hover:bg-[#102B46] shadow-md transition-all active:scale-[0.98]"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
