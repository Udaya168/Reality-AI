import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Plus, User, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  onOpenMobileMenu,
}) => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white border-b border-[#E7E6DF] px-6 sm:px-8 py-5 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 text-[#202520] hover:text-[#183D30] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#183D30] font-normal tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-[#737970] font-light mt-0.5 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F7F6F2] border border-[#E7E6DF] rounded-full text-xs">
            <User className="w-3.5 h-3.5 text-[#315B49]" />
            <span className="font-semibold text-[#202520]">{user.name}</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[#183D30] text-white">
              {user.role}
            </span>
          </div>
        )}

        {/* Quick Add Property CTA */}
        <Link
          to="/sell"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#183D30] text-white text-xs font-mono uppercase tracking-wider rounded-full hover:bg-[#315B49] transition-colors shadow-xs active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Property</span>
        </Link>
      </div>
    </header>
  );
};
