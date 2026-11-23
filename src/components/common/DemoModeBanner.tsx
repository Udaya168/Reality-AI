import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, User, LogOut, ChevronDown, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DemoModeBanner: React.FC = () => {
  const { user, isAuthenticated, loginAsDemo, logout, demoAccounts } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSwitchAccount = (role: 'Buyer' | 'Owner' | 'Admin') => {
    const redirectPath = loginAsDemo(role);
    setMenuOpen(false);
    navigate(redirectPath);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  if (isMinimized) {
    return (
      <aside aria-label="Demo Mode Controls" className="fixed top-2 right-2 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg border border-amber-400 hover:bg-amber-400 cursor-pointer"
          title="Click to expand Demo Mode toolbar"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
          <span>Demo Mode</span>
          {user && <span className="opacity-80">({user.role})</span>}
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Demo Mode Notification" className="relative z-50 bg-[#12231c] text-[#F7F6F2] border-b border-[#244b3c] text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Demo Indicator & Notice */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[10px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" />
            DEMO MODE
          </span>
          <span className="text-[11px] text-[#A7B9A5] hidden md:inline">
            Frontend Testing Environment &bull; No Database Connected &bull; Local State Only
          </span>
        </div>

        {/* Right: Current User & Quick Switcher */}
        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 relative">
              <span className="text-[11px] text-[#A7B9A5]">Active:</span>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#183D30] border border-[#315B49] text-white hover:border-[#A7B9A5] transition-colors cursor-pointer text-[11px]"
              >
                <User className="w-3 h-3 text-emerald-400" />
                <span className="font-semibold">{user.name}</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {user.role}
                </span>
                <ChevronDown className="w-3 h-3 text-[#A7B9A5]" />
              </button>

              {/* Account Switcher Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-64 bg-slate-900 border border-slate-700 shadow-2xl rounded-md p-2 z-50 text-slate-200 text-xs">
                  <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                    Switch Demo Account
                  </div>
                  {demoAccounts.map((acc) => {
                    const isCurrent = user.email.toLowerCase() === acc.email.toLowerCase();
                    return (
                      <button
                        key={acc.email}
                        onClick={() => handleSwitchAccount(acc.user.role as 'Buyer' | 'Owner' | 'Admin')}
                        className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer ${
                          isCurrent ? 'bg-slate-800/80 text-emerald-400 font-medium' : ''
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-xs flex items-center gap-1.5">
                            <span>{acc.user.name}</span>
                            <span className="text-[9px] font-mono text-slate-400 uppercase">
                              ({acc.user.role})
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{acc.email}</div>
                        </div>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>
                    );
                  })}
                  <div className="border-t border-slate-800 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-2.5 py-1.5 rounded text-rose-400 hover:bg-rose-950/40 flex items-center gap-1.5 cursor-pointer text-xs"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}

              {/* One-click Logout */}
              <button
                onClick={handleLogout}
                className="p-1 text-[#A7B9A5] hover:text-white transition-colors cursor-pointer"
                title="Log out of demo account"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#A7B9A5]">Quick Sign In:</span>
              <button
                onClick={() => handleSwitchAccount('Buyer')}
                className="px-2 py-0.5 rounded bg-[#183D30] hover:bg-[#315B49] text-white text-[10px] cursor-pointer"
                title="Login as Buyer (Aditya Sharma)"
              >
                Buyer
              </button>
              <button
                onClick={() => handleSwitchAccount('Owner')}
                className="px-2 py-0.5 rounded bg-[#183D30] hover:bg-[#315B49] text-white text-[10px] cursor-pointer"
                title="Login as Seller (Rohan Kothari)"
              >
                Seller
              </button>
              <button
                onClick={() => handleSwitchAccount('Admin')}
                className="px-2 py-0.5 rounded bg-[#183D30] hover:bg-[#315B49] text-white text-[10px] cursor-pointer"
                title="Login as Admin (Siddharth Rao)"
              >
                Admin
              </button>
            </div>
          )}

          {/* Minimize button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="text-[10px] text-[#A7B9A5] hover:text-white underline cursor-pointer ml-1"
            title="Minimize demo banner"
          >
            Hide
          </button>
        </div>
      </div>
    </aside>
  );
};
