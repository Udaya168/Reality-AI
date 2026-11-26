import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, ArrowUpRight, Building2,
  ShieldAlert, LogOut, ChevronDown, Terminal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserListings } from '../../context/UserListingsContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { myListingsCount } = useUserListings();

  // Track scroll position for dynamic iOS frosted glass specular effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/properties' },
    { label: 'Villas', href: '/properties?category=villa' },
    { label: 'Land', href: '/properties?category=plot' },
    { label: 'Commercial', href: '/properties?category=commercial' },
  ];

  const handleLogout = async () => {
    await logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-3 sm:top-5 z-50 px-4 sm:px-6 w-full max-w-6xl mx-auto pointer-events-none transition-all duration-300">
      {/* iOS 27 Style Floating Capsule Navigation Bar */}
      <div
        className={`pointer-events-auto rounded-full flex items-center justify-between px-3 sm:px-5 h-15 sm:h-16 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-2xl border border-white/70 shadow-[0_14px_40px_rgba(24,54,83,0.12),0_1px_1px_rgba(255,255,255,0.9)_inset]'
            : 'bg-white/65 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgba(24,54,83,0.06),0_1px_1px_rgba(255,255,255,0.8)_inset]'
        }`}
      >
        {/* Brand Logo Capsule */}
        <Link to="/" className="flex items-center gap-2.5 group pl-1">
          <div className="w-9 h-9 rounded-full bg-[#183653] text-[#F8F7F3] flex items-center justify-center font-serif text-base font-bold shadow-sm group-hover:scale-105 transition-transform duration-200 border border-white/20">
            R
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-tight font-semibold text-[#183653] leading-none">
              REALITY
            </span>
            <span className="text-[8px] uppercase tracking-widest text-[#354B60] font-mono mt-0.5">
              ARCHITECTURAL
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — Apple Style Pill Capsules */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-[#354B60] p-1 bg-black/[0.03] rounded-full border border-black/[0.03]">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? location.pathname === '/'
                : location.pathname + location.search === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[#183653] text-white shadow-xs font-semibold'
                    : 'text-[#102B46]/80 hover:text-[#183653] hover:bg-black/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* My Properties Link */}
          <Link
            to="/my-properties"
            className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-200 ${
              location.pathname === '/my-properties'
                ? 'bg-[#183653] text-white shadow-xs font-semibold'
                : 'text-[#102B46]/80 hover:text-[#183653] hover:bg-black/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>My Properties</span>
            {myListingsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-white/20 text-current">
                {myListingsCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Right CTA Actions: Dynamic Auth State */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2.5">
              {/* Portal-specific quick badges */}
              {user.role === 'Admin' && (
                <Link
                  to="/admin"
                  className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider bg-slate-900 text-emerald-400 hover:bg-slate-800 rounded-full flex items-center gap-1.5 border border-slate-700 shadow-xs"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </Link>
              )}

              {user.role === 'Developer' && (
                <Link
                  to="/developer"
                  className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider bg-[#0B1221] text-teal-400 hover:bg-slate-900 rounded-full flex items-center gap-1.5 border border-teal-500/40 shadow-xs"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Developer</span>
                </Link>
              )}

              {/* User Identity Pill with Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white/80 hover:bg-white border border-white/60 hover:border-[#183653]/30 transition-all rounded-full text-xs cursor-pointer shadow-xs active:scale-95"
                >
                  <div className="w-6 h-6 rounded-full bg-[#183653] text-white flex items-center justify-center font-serif text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-[#102B46] block leading-none truncate max-w-[90px]">
                      {user.name.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-[#354B60]" />
                </button>

                {/* iOS Frosted Glass Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2.5 w-60 bg-white/85 backdrop-blur-2xl border border-white/70 shadow-[0_20px_50px_rgba(24,54,83,0.15)] rounded-3xl p-3 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-2.5 border-b border-[#D9E0E6]/70 mb-1.5">
                      <div className="font-serif font-semibold text-[#102B46] text-sm">{user.name}</div>
                      <div className="text-[10px] text-[#354B60] font-mono truncate">{user.email}</div>
                      <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#DCE7F0] text-[#183653] font-semibold">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/my-properties"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-3.5 py-2 text-[#102B46] hover:bg-black/5 rounded-2xl flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-[#354B60]" />
                        <span>My Properties</span>
                      </span>
                      <span className="font-mono text-[10px] text-[#354B60]">{myListingsCount}</span>
                    </Link>

                    {user.role === 'Admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-3.5 py-2 text-[#102B46] hover:bg-black/5 rounded-2xl flex items-center gap-2 transition-colors"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    {user.role === 'Developer' && (
                      <Link
                        to="/developer"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-3.5 py-2 text-[#102B46] hover:bg-black/5 rounded-2xl flex items-center gap-2 transition-colors font-mono text-[11px]"
                      >
                        <Terminal className="w-3.5 h-3.5 text-teal-600" />
                        <span>Developer Portal</span>
                      </Link>
                    )}

                    <div className="border-t border-[#D9E0E6]/70 mt-1.5 pt-1.5">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-3.5 py-2 text-rose-700 hover:bg-rose-50 rounded-2xl flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* List Property CTA */}
              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 bg-[#183653] text-[#F8F7F3] px-4.5 py-2 text-xs uppercase font-mono tracking-wider hover:bg-[#102B46] transition-all rounded-full shadow-xs active:scale-95"
              >
                <span>List</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-mono uppercase tracking-wider text-[#102B46]/80 hover:text-[#183653] transition-colors px-3 py-2 rounded-full hover:bg-black/5"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="text-xs font-mono uppercase tracking-wider text-[#183653] border border-[#183653]/25 bg-white/80 hover:bg-white transition-colors px-3.5 py-2 rounded-full"
              >
                Sign Up
              </Link>

              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 bg-[#183653] text-[#F8F7F3] px-4.5 py-2 text-xs uppercase font-mono tracking-wider hover:bg-[#102B46] transition-all rounded-full shadow-sm hover:shadow active:scale-95"
              >
                <span>List</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-[#102B46] hover:text-[#183653] transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Floating Frosted Glass Drawer */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2.5 rounded-3xl bg-white/85 backdrop-blur-2xl border border-white/70 shadow-[0_20px_50px_rgba(24,54,83,0.15)] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {isAuthenticated && user && (
            <div className="p-3.5 bg-white/90 border border-white/60 rounded-2xl flex items-center justify-between text-xs shadow-xs">
              <div>
                <div className="font-serif font-bold text-[#183653]">{user.name}</div>
                <div className="text-[10px] font-mono text-[#354B60]">{user.email} &bull; {user.role}</div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-rose-700 underline"
              >
                Logout
              </button>
            </div>
          )}

          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#102B46] hover:text-[#183653] py-2 px-3 rounded-2xl hover:bg-black/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/my-properties"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#102B46] hover:text-[#183653] py-2 px-3 rounded-2xl hover:bg-black/5 transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#315D82]" />
                <span>My Properties</span>
              </span>
              {myListingsCount > 0 && (
                <span className="font-mono text-xs text-[#183653] bg-[#DCE7F0] px-2.5 py-0.5 rounded-full">
                  {myListingsCount}
                </span>
              )}
            </Link>

            {isAuthenticated && user?.role === 'Developer' && (
              <Link
                to="/developer"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-teal-800 hover:text-teal-950 py-2 px-3 rounded-2xl hover:bg-black/5 transition-colors font-mono"
              >
                Developer Portal
              </Link>
            )}

            {isAuthenticated && user?.role === 'Admin' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-emerald-800 hover:text-emerald-950 py-2 px-3 rounded-2xl hover:bg-black/5 transition-colors font-mono"
              >
                Admin Panel
              </Link>
            )}
          </nav>

          <div className="pt-3 border-t border-[#D9E0E6]/70 flex flex-col gap-2.5">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 text-xs font-mono uppercase tracking-wider text-[#102B46] border border-[#D9E0E6] bg-white/90 hover:bg-white rounded-full shadow-xs"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 text-xs font-mono uppercase tracking-wider text-[#183653] border border-[#183653]/30 bg-[#EDF2F6] hover:bg-[#DCE7F0] rounded-full shadow-xs font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="text-center py-2.5 text-xs font-mono uppercase tracking-wider text-rose-700 border border-rose-200 bg-rose-50/80 rounded-full"
              >
                Sign Out
              </button>
            )}

            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-3 text-xs uppercase font-mono tracking-wider bg-[#183653] text-white hover:bg-[#102B46] rounded-full shadow-md active:scale-98 transition-all"
            >
              List Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
