import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Key,
  BookOpen,
  Terminal,
  Activity,
  ArrowLeft,
  LogOut,
  ShieldCheck,
  Cpu,
  Copy,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { DEVELOPER_PORTAL_UUID } from '../types/developer.types';

interface DeveloperSidebarProps {
  onCloseMobile?: () => void;
}

export const DeveloperSidebar: React.FC<DeveloperSidebarProps> = ({ onCloseMobile }) => {
  const { user, logout } = useAuth();
  const [copiedUUID, setCopiedUUID] = React.useState(false);

  const handleCopyUUID = () => {
    navigator.clipboard.writeText(DEVELOPER_PORTAL_UUID);
    setCopiedUUID(true);
    setTimeout(() => setCopiedUUID(false), 2000);
  };

  const navLinks = [
    { label: 'Overview', href: '/developer', icon: LayoutDashboard, end: true },
    { label: 'API Keys', href: '/developer/api-keys', icon: Key },
    { label: 'Documentation', href: '/developer/docs', icon: BookOpen },
    { label: 'API Playground', href: '/developer/playground', icon: Terminal },
    { label: 'Activity & Logs', href: '/developer/activity', icon: Activity },
  ];

  return (
    <aside className="w-64 bg-[#090D16] border-r border-slate-800/80 flex flex-col justify-between h-full select-none text-slate-300">
      <div className="p-5 space-y-6">
        
        {/* Portal Monogram & Brand Header */}
        <div className="space-y-3">
          <Link to="/developer" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white flex items-center justify-center font-mono text-base font-bold shadow-md shadow-teal-500/10">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight font-semibold text-white leading-none">
                REALITY AI
              </span>
              <span className="text-[9px] uppercase tracking-widest text-teal-400 font-mono mt-1 font-semibold">
                DEVELOPER CONSOLE
              </span>
            </div>
          </Link>

          {/* Portal UUID Chip */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleCopyUUID}
              title="Click to copy Developer Portal UUID"
              className="w-full text-left p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 text-[10px] font-mono text-slate-400 hover:text-slate-200 flex items-center justify-between transition-colors group cursor-pointer"
            >
              <div className="truncate pr-1">
                <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Portal UUID</span>
                <span className="text-teal-400/90 truncate block">{DEVELOPER_PORTAL_UUID.slice(0, 16)}…</span>
              </div>
              <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-400 shrink-0" />
            </button>
            {copiedUUID && (
              <span className="text-[9px] text-teal-400 font-mono block text-right mt-1">UUID Copied!</span>
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block px-3 mb-2">
            Technical Platform
          </span>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.label}
                to={link.href}
                end={link.end}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-xs font-mono rounded-xl transition-all ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-400 font-semibold border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Integration Sandbox Status */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-slate-400">Environment</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-teal-500/10 text-teal-400 border border-teal-500/20">
              SANDBOX
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Local simulation mode. API keys are strictly for sandbox development.
          </p>
        </div>
      </div>

      {/* Footer Area: User Profile & Back to Main Marketplace */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-[#070A12]">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-teal-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-900"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Marketplace</span>
        </Link>

        {user && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 px-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="truncate">
                <span className="text-xs font-medium text-white block truncate leading-tight">
                  {user.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block truncate">
                  {user.email}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors rounded-md hover:bg-slate-800 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
