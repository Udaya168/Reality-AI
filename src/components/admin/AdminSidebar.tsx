import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useAuth } from '../../context/AuthContext';

interface AdminSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpenMobile,
  onCloseMobile,
}) => {
  const { activeTab, setActiveTab, stats } = useAdmin();
  const { user } = useAuth();

  const navigation = [
    {
      id: 'overview' as const,
      name: 'Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'queue' as const,
      name: 'Verification Queue',
      icon: ShieldCheck,
      badge: stats.pendingApprovals > 0 ? stats.pendingApprovals : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      id: 'properties' as const,
      name: 'Property Management',
      icon: Building2,
      badge: stats.totalListings,
      badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700',
    },
    {
      id: 'users' as const,
      name: 'User Management',
      icon: Users,
      badge: stats.totalUsers,
      badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700',
    },
    {
      id: 'reports' as const,
      name: 'Reported Listings',
      icon: AlertTriangle,
      badge: stats.reportedListings > 0 ? stats.reportedListings : null,
      badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    },
  ];

  const content = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950 font-serif font-bold text-lg">
            R
          </div>
          <div>
            <div className="font-serif tracking-wide text-white text-base font-semibold leading-tight flex items-center gap-1.5">
              REALITY <span className="text-emerald-400 font-sans font-medium text-xs tracking-widest uppercase">Admin</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">
              Curation & Moderation Console
            </div>
          </div>
        </div>
      </div>

      {/* Security notice indicator */}
      <div className="mx-4 mt-4 px-3 py-2 bg-slate-900/80 rounded-md border border-slate-800/80 flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[11px] font-mono text-slate-400 tracking-wide">
          INTERNAL ROLE: SUPER_CURATOR
        </span>
      </div>

      {/* Main Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
          Management Modules
        </div>
        {navigation.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-medium rounded-lg transition-all duration-150 cursor-pointer ${isActive
                  ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 shadow-inner'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={17}
                  className={isActive ? 'text-emerald-400' : 'text-slate-500'}
                />
                <span className="tracking-wide">{item.name}</span>
              </div>
              {item.badge !== null && (
                <span
                  className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-full ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions & Profile */}
      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/70">
        <Link
          to="/"
          className="flex items-center justify-between px-3.5 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors border border-slate-800/60"
        >
          <span className="flex items-center gap-2">
            <ArrowUpRight size={14} className="text-emerald-400" />
            <span>Public Marketplace</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Live</span>
        </Link>

        <div className="pt-2 flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-mono text-xs font-bold text-slate-300">
            {user ? user.name.charAt(0) : 'SA'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-200 truncate">
              {user ? user.name : 'Siddharth Rao'}
            </div>
            <div className="text-[11px] text-slate-400 truncate">
              {user ? `${user.role} Demo Account` : 'Chief Architect & Curator'}
            </div>
          </div>
          <ShieldAlert size={14} className="text-emerald-400" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative w-80 max-w-[85vw] h-full shadow-2xl z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
