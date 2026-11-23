import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, ArrowUpRight, Bookmark, LayoutDashboard,
  ShieldAlert, User, LogOut, ChevronDown, Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProperties } from '../../hooks/useProperties';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { savedIds } = useProperties();

  const navLinks = [
    { label: 'Explore', href: '/properties' },
    { label: 'Buy', href: '/properties?category=villa' },
    { label: 'Land', href: '/properties?category=plot' },
    { label: 'Commercial', href: '/properties?category=commercial' },
  ];

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E7E6DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo / Name */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-[1px] border border-[#183D30] flex items-center justify-center font-serif text-lg font-bold text-[#183D30] group-hover:bg-[#183D30] group-hover:text-[#F7F6F2] transition-colors">
            R
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-tight font-semibold text-[#183D30]">
              REALITY
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#737970] -mt-1 font-mono">
              ARCHITECTURAL MARKETPLACE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#737970]">
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`transition-colors hover:text-[#183D30] py-1 ${isActive
                    ? 'text-[#183D30] font-semibold underline underline-offset-8 decoration-1 decoration-[#315B49]'
                    : ''
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Show Saved link for Buyers or any user */}
          <Link
            to="/saved"
            className={`transition-colors hover:text-[#183D30] py-1 flex items-center gap-1.5 ${location.pathname === '/saved'
                ? 'text-[#183D30] font-semibold underline underline-offset-8 decoration-1 decoration-[#315B49]'
                : ''
              }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#315B49]" />
            <span>Saved</span>
            {savedIds.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#183D30] text-white">
                {savedIds.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Right CTA Actions: Dynamic Auth State */}
        <div className="hidden md:flex items-center gap-5">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              {/* Role specific links */}
              {user.role === 'Admin' && (
                <Link
                  to="/admin"
                  className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-slate-900 text-emerald-400 hover:bg-slate-800 rounded-[1px] flex items-center gap-1.5 border border-slate-700"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </Link>
              )}

              {(user.role === 'Owner' || user.role === 'Admin' || user.role === 'Agent' || user.role === 'Builder') && (
                <Link
                  to="/dashboard"
                  className="text-xs font-mono uppercase tracking-wider text-[#737970] hover:text-[#183D30] flex items-center gap-1 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#315B49]" />
                  <span>Dashboard</span>
                </Link>
              )}

              {/* User Identity Pill with Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-white border border-[#E7E6DF] hover:border-[#183D30] transition-colors rounded-[1px] text-xs cursor-pointer shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-[1px] bg-[#183D30] text-white flex items-center justify-center font-serif text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-[#202520] block leading-none truncate max-w-[100px]">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className="text-[9px] font-mono uppercase text-[#315B49]">
                      {user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-[#737970]" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-[#E7E6DF] shadow-xl rounded-[1px] p-2 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-[#E7E6DF] mb-1">
                      <div className="font-serif font-semibold text-[#202520]">{user.name}</div>
                      <div className="text-[10px] text-[#737970] font-mono truncate">{user.email}</div>
                      <span className="inline-block mt-1 px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[#E8EDE7] text-[#183D30]">
                        Role: {user.role}
                      </span>
                    </div>

                    <Link
                      to="/saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-[#202520] hover:bg-[#F7F6F2] flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Bookmark className="w-3.5 h-3.5 text-[#737970]" />
                        <span>Saved Properties</span>
                      </span>
                      <span className="font-mono text-[10px] text-[#737970]">{savedIds.length}</span>
                    </Link>

                    {(user.role === 'Owner' || user.role === 'Admin') && (
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 text-[#202520] hover:bg-[#F7F6F2] flex items-center gap-2 transition-colors"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-[#737970]" />
                        <span>Seller Dashboard</span>
                      </Link>
                    )}

                    {user.role === 'Admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 text-[#202520] hover:bg-[#F7F6F2] flex items-center gap-2 transition-colors"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <div className="border-t border-[#E7E6DF] mt-1 pt-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out ({user.role})</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* List Property CTA */}
              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 bg-[#183D30] text-[#F7F6F2] px-4 py-2 text-xs uppercase font-mono tracking-wider hover:bg-[#315B49] transition-all rounded-[1px]"
              >
                <span>List Property</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                to="/login"
                className="text-xs font-mono uppercase tracking-wider text-[#737970] hover:text-[#183D30] transition-colors"
              >
                Sign In
              </Link>

              <Link
                to="/sell"
                className="inline-flex items-center gap-1.5 bg-[#183D30] text-[#F7F6F2] px-5 py-2.5 text-xs uppercase font-mono tracking-wider hover:bg-[#315B49] transition-all rounded-[1px]"
              >
                <span>List Property</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#202520] hover:text-[#183D30]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7E6DF] bg-[#F7F6F2] px-6 py-6 space-y-4">
          {isAuthenticated && user && (
            <div className="p-3 bg-white border border-[#E7E6DF] rounded-[1px] flex items-center justify-between text-xs">
              <div>
                <div className="font-serif font-bold text-[#183D30]">{user.name}</div>
                <div className="text-[10px] font-mono text-[#737970]">{user.email} &bull; {user.role}</div>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-rose-700 underline"
              >
                Logout
              </button>
            </div>
          )}

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#202520] hover:text-[#183D30] py-1 border-b border-[#E7E6DF]/50"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/saved"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#202520] hover:text-[#183D30] py-1 border-b border-[#E7E6DF]/50 flex items-center justify-between"
            >
              <span>Saved Properties</span>
              {savedIds.length > 0 && (
                <span className="font-mono text-xs text-[#183D30] bg-[#E8EDE7] px-2 py-0.5 rounded">
                  {savedIds.length}
                </span>
              )}
            </Link>

            {isAuthenticated && (user?.role === 'Owner' || user?.role === 'Admin') && (
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#202520] hover:text-[#183D30] py-1 border-b border-[#E7E6DF]/50"
              >
                Seller Dashboard
              </Link>
            )}

            {isAuthenticated && user?.role === 'Admin' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-emerald-800 hover:text-emerald-950 py-1 border-b border-[#E7E6DF]/50 font-mono"
              >
                Admin Panel
              </Link>
            )}
          </nav>

          <div className="pt-4 flex flex-col gap-3">
            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-sm font-medium text-[#202520] border border-[#E7E6DF] bg-white hover:bg-[#F7F6F2]"
              >
                Sign In (Demo Accounts)
              </Link>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="text-center py-2.5 text-sm font-medium text-rose-700 border border-rose-200 bg-rose-50"
              >
                Sign Out
              </button>
            )}

            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-3 text-xs uppercase font-mono tracking-wider bg-[#183D30] text-white hover:bg-[#315B49]"
            >
              List Property
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
