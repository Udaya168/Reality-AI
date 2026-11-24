import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#183D30] text-[#F7F6F2] pt-20 pb-12 border-t border-[#315B49]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          {/* Brand & Editorial Manifesto (Span 4) */}
          <div className="md:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-2xl border border-[#A7B9A5] flex items-center justify-center font-serif text-lg font-bold text-[#F7F6F2]">
                R
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-tight font-semibold text-white">
                  REALITY
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#A7B9A5] -mt-1 font-mono">
                  ESTATES &bull; ARCHITECTURE
                </span>
              </div>
            </Link>

            <p className="text-[#A7B9A5] text-sm leading-relaxed max-w-sm font-light">
              An architectural real-estate marketplace celebrating light, materiality, and spatial clarity. Connecting discerning property owners, architects, and buyers directly across Karnataka and beyond.
            </p>

            <div className="pt-2 text-xs font-mono text-[#A7B9A5]/90 space-y-1">
              <div>BENGALURU &bull; MYSURU &bull; CHIKMAGALUR &bull; COORG</div>
              <div className="text-[10px] text-[#A7B9A5]/60">KARNATAKA, INDIA</div>
            </div>
          </div>

          {/* Quick Links Column 1: Explore Properties (Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Explore Properties
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A7B9A5] font-light">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link to="/explore?category=villa" className="hover:text-white transition-colors">
                  Villas &amp; Private Estates
                </Link>
              </li>
              <li>
                <Link to="/explore?category=apartment" className="hover:text-white transition-colors">
                  Apartments &amp; Penthouses
                </Link>
              </li>
              <li>
                <Link to="/explore?category=land" className="hover:text-white transition-colors">
                  Land &amp; Residential Plots
                </Link>
              </li>
              <li>
                <Link to="/explore?category=commercial" className="hover:text-white transition-colors">
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link to="/explore?category=agricultural" className="hover:text-white transition-colors">
                  Agricultural Plantations
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Marketplace & Seller (Span 2) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Marketplace
            </h4>
            <ul className="space-y-2.5 text-sm text-[#A7B9A5] font-light">
              <li>
                <Link to="/sell" className="hover:text-white transition-colors flex items-center gap-1 font-medium text-white">
                  <span>List Property</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Owner Portal
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-white transition-colors">
                  Saved Properties
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-white transition-colors">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link to="/design-system" className="hover:text-white transition-colors">
                  Design Tokens
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 3: Contact & Legal (Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white">
              Contact &amp; Advisory
            </h4>
            <ul className="space-y-2 text-xs text-[#A7B9A5] font-light">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A7B9A5]" />
                <span>concierge@realityai.estate</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A7B9A5]" />
                <span>+91 80 4910 8800 (Mon–Sat)</span>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#A7B9A5] shrink-0 mt-0.5" />
                <span>Lavelle Road, Bengaluru 560001</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-[#315B49] flex items-center gap-4 text-xs text-[#A7B9A5]">
              <a href="#instagram" className="hover:text-white transition-colors font-mono text-[11px]">INSTAGRAM</a>
              <a href="#linkedin" className="hover:text-white transition-colors font-mono text-[11px]">LINKEDIN</a>
              <a href="#twitter" className="hover:text-white transition-colors font-mono text-[11px]">TWITTER</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-[#315B49] flex flex-col sm:flex-row items-center justify-between text-xs text-[#A7B9A5] gap-4">
          <div>
            &copy; {new Date().getFullYear()} Reality AI Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            <a href="#verification" className="hover:text-white transition-colors">STANDARDS</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
