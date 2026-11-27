import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Heart, Building2, PlusCircle } from 'lucide-react';
import { useSavedProperties } from '../../context/SavedPropertiesContext';

export const MobileNavigation: React.FC = () => {
  const { wishlistCount } = useSavedProperties();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D9E0E6] py-2 px-4 flex items-center justify-around text-[10px] font-mono uppercase tracking-wider text-[#354B60]">
      <Link to="/" className="flex flex-col items-center gap-1 hover:text-[#183653]">
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      <Link to="/properties" className="flex flex-col items-center gap-1 hover:text-[#183653]">
        <Compass className="w-4 h-4" />
        <span>Explore</span>
      </Link>
      <Link to="/sell" className="flex flex-col items-center gap-1 text-[#183653] font-bold">
        <PlusCircle className="w-5 h-5" />
        <span>List</span>
      </Link>
      <Link to="/wishlist" className="relative flex flex-col items-center gap-1 hover:text-[#183653]">
        <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#E85D75] fill-[#E85D75]' : ''}`} />
        <span>Wishlist</span>
        {wishlistCount > 0 && (
          <span className="absolute -top-1 right-1.5 w-3.5 h-3.5 rounded-full bg-[#E85D75] text-white text-[8px] flex items-center justify-center font-bold">
            {wishlistCount}
          </span>
        )}
      </Link>
      <Link to="/my-properties" className="flex flex-col items-center gap-1 hover:text-[#183653]">
        <Building2 className="w-4 h-4" />
        <span>Mine</span>
      </Link>
    </nav>
  );
};
