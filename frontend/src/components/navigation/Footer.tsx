import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer: React.FC = () => {
  const { user } = useAuth();
  return (
    <footer className="bg-[#102B46] text-[#F8F7F3] pt-16 sm:pt-20 pb-8 border-t border-[#315D82]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-12 mb-14 sm:mb-16">

          {/* Brand & Editorial Manifesto (Span 4) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-2xl border border-[#7896B2] flex items-center justify-center font-serif text-lg font-bold text-[#F8F7F3]">
                R
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-tight font-semibold text-white">
                  REALITY
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#7896B2] -mt-1 font-mono">
                  ESTATES &bull; ARCHITECTURE
                </span>
              </div>
            </Link>

            <p className="text-[#AABBD0] text-sm leading-7 max-w-sm font-light">
              An architectural real-estate marketplace celebrating light, materiality, and spatial clarity. Connecting discerning property owners, architects, and buyers directly across Karnataka and beyond.
            </p>
          </div>

          {/* Quick Links Column 1: Explore Properties (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Explore Properties
            </h4>
            <ul className="space-y-2.5 text-sm text-[#AABBD0] font-light">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/explore?category=villa" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  Villas &amp; Private Estates
                </Link>
              </li>
              <li>
                <Link to="/explore?category=apartment" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  Apartments &amp; Penthouses
                </Link>
              </li>
              <li>
                <Link to="/explore?category=land" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  Land &amp; Residential Plots
                </Link>
              </li>
              <li>
                <Link to="/explore?category=commercial" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link to="/explore?category=agricultural" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  Agricultural Plantations
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Marketplace & Seller (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm text-[#AABBD0] font-light">
              <li>
                <Link to="/sell" className="hover:text-white transition-colors flex items-center gap-1 font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  <span>List Property</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/my-properties" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  My Properties
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  Member Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/design-system" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  Design Tokens
                </Link>
              </li>
              {user?.role === 'Admin' && (
                <li>
                  <Link to="/admin" className="hover:text-emerald-300 transition-colors flex items-center gap-1 font-mono text-xs text-emerald-400">
                    <span>Admin Console</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              )}
              {user?.role === 'Developer' && (
                <li>
                  <Link to="/developer" className="hover:text-teal-300 transition-colors flex items-center gap-1 font-mono text-xs text-teal-400">
                    <span>Developer Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Quick Links Column 3: Contact & Legal (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Contact &amp; Advisory
            </h4>
            <ul className="space-y-3 text-sm text-[#AABBD0] font-light">
              <li>
                <a href="tel:+916361492452" aria-label="Call +91 63614 92452" className="inline-flex items-center gap-2 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  <Phone className="w-3.5 h-3.5 text-[#7896B2]" />
                  <span>+91 63614 92452</span>
                </a>
              </li>
              <li>
                <a href="mailto:official@mavrostech.in" aria-label="Email official@mavrostech.in" className="inline-flex items-center gap-2 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">
                  <Mail className="w-3.5 h-3.5 text-[#7896B2]" />
                  <span>official@mavrostech.in</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-7 border-t border-[#315D82]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#AABBD0] gap-5">
          <div className="space-y-1.5">
            <p>© 2026 Reality AI Technologies. All rights reserved.</p>
            <p className="text-[11px] text-[#7896B2]">Associated with Mavros Tech.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-[#7896B2]">
            <a href="#privacy" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">TERMS OF SERVICE</a>
            <a href="#verification" className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AABBD0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#102B46] rounded-sm">STANDARDS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
