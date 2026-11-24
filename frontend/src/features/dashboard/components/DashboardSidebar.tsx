import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard, Building, PlusCircle, Settings,
  ArrowLeft, ExternalLink, ShieldCheck, User, Bookmark
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface DashboardSidebarProps {
  onCloseMobile?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onCloseMobile }) => {
  const { user } = useAuth();
  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, end: true },
    { label: 'My Listings', href: '/dashboard/listings', icon: Building },
    { label: 'Saved Properties', href: '/saved', icon: Bookmark },
    { label: 'Add Property', href: '/sell', icon: PlusCircle },
    { label: 'Profile Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#D9E0E6] flex flex-col justify-between h-full select-none">
      <div className="p-6 space-y-8">

        {/* Brand Monogram & Portal Header */}
        <div>
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-2xl border border-[#183653] flex items-center justify-center font-serif text-lg font-bold text-[#183653] group-hover:bg-[#183653] group-hover:text-white transition-colors">
              R
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight font-semibold text-[#183653]">
                REALITY
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#354B60] -mt-1 font-mono">
                SELLER DASHBOARD
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#354B60] block px-3 mb-2">
            Main Management
          </span>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-2xl transition-all ${isActive
                    ? 'bg-[#183653] text-white font-bold shadow-xs'
                    : 'text-[#354B60] hover:text-[#183653] hover:bg-[#F8F7F3]'
                  }`
                }
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Marketplace Return */}
      <div className="p-6 border-t border-[#D9E0E6] space-y-4 bg-[#F8F7F3]/50">
        {/* Seller Info Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#183653] text-white flex items-center justify-center font-serif text-base font-semibold">
            {user ? user.name.charAt(0) : 'R'}
          </div>
          <div className="space-y-0.5 overflow-hidden">
            <div className="font-serif text-sm font-semibold text-[#102B46] truncate">
              {user ? user.name : 'Rohan Kothari'}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#315D82] flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#315D82]" />
              <span>{user ? `${user.role} Verified` : 'Verified Owner'}</span>
            </div>
          </div>
        </div>

        {/* Public Marketplace Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#354B60] hover:text-[#183653] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </Link>
      </div>
    </aside>
  );
};
