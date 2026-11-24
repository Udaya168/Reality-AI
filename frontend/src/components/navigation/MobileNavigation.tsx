import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Bookmark, LayoutDashboard, PlusCircle } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
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
      <Link to="/saved" className="flex flex-col items-center gap-1 hover:text-[#183653]">
        <Bookmark className="w-4 h-4" />
        <span>Saved</span>
      </Link>
      <Link to="/dashboard" className="flex flex-col items-center gap-1 hover:text-[#183653]">
        <LayoutDashboard className="w-4 h-4" />
        <span>Dashboard</span>
      </Link>
    </nav>
  );
};
