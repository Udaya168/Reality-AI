import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Terminal, Shield, Sparkles, ExternalLink } from 'lucide-react';

interface DeveloperHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
}

export const DeveloperHeader: React.FC<DeveloperHeaderProps> = ({
  title,
  subtitle,
  onOpenMobileMenu,
}) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#183653]/90 px-4 py-4 shadow-[0_8px_24px_rgba(16,43,70,0.12)] backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 text-slate-400 hover:text-white lg:hidden rounded-lg hover:bg-slate-800 cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page Title & Breadcrumbs */}
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-0.5">
            <Link to="/developer" className="hover:text-teal-400 transition-colors">
              Developer Portal
            </Link>
            <span>/</span>
            <span className="text-teal-400">{title}</span>
          </div>
          <h1 className="font-serif text-xl font-normal tracking-tight text-white leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Controls: Gateway Indicator & Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Simulated Gateway Status Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span>Gateway: Simulated 200 OK</span>
        </div>

        {/* Quick Launch Playground */}
        <Link
          to="/developer/playground"
          className="inline-flex items-center gap-1.5 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/30 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Playground</span>
        </Link>
      </div>
    </header>
  );
};
