import React from 'react';
import {
  Menu,
  Search,
  RotateCcw,
  Bell,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../../../context/AdminContext';
import { useAuth } from '../../../context/AuthContext';

interface AdminHeaderProps {
  onOpenMobileSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenMobileSidebar }) => {
  const { searchQuery, setSearchQuery, stats, resetToDefault } = useAdmin();
  const { user } = useAuth();

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Global Search inside Admin */}
        <div className="relative w-56 sm:w-80 md:w-96">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search listings, sellers, localities or IDs..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Reset System Records button */}
        <button
          onClick={() => {
            if (window.confirm('Reset moderation and user data records back to system defaults?')) {
              resetToDefault();
            }
          }}
          title="Restore Records"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700 text-xs transition-colors cursor-pointer"
        >
          <RotateCcw size={13} />
          <span className="font-mono text-[11px]">Reset Records</span>
        </button>

        {/* Pending Approval Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <Sparkles size={13} className="text-amber-400" />
          <span className="font-medium text-[11px]">{stats.pendingApprovals} Pending Review</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
          </button>
          {stats.reportedListings > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          )}
        </div>

        {/* Admin Badge */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-emerald-400">
            {user ? user.name.charAt(0) : 'RA'}
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-medium text-slate-200">
              {user ? user.name : 'Reality Internal'}
            </div>
            <div className="text-[10px] font-mono text-emerald-400">
              {user ? `${user.email} (${user.role})` : 'admin@realityai.in'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
