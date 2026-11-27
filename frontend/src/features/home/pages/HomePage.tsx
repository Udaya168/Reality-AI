import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { PopularLocations } from '../components/PopularLocations';
import { RecentlyListed } from '../components/RecentlyListed';
import { SellCTA } from '../components/SellCTA';
import { PrivateCollectionGate } from '../components/PrivateCollectionGate';
import { useAuth } from '../../../context/AuthContext';
import { ShieldCheck, ArrowRight, Terminal, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page-atmosphere space-y-16 sm:space-y-24 pb-20">
      {/* 1. Hero Presentation & Search */}
      <HeroSection />

      {/* 2. Gated vs Unlocked Portfolio Access */}
      {!isAuthenticated ? (
        // When not logged in: Do NOT show what properties are there for selling; prompt to login
        <PrivateCollectionGate />
      ) : (
        // When logged in: Show the verified portfolio
        <>
          {/* Verified Patron Banner */}
          <div id="unlocked-portfolio" className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 scroll-mt-28">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#183653] to-[#315D82] text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-xl sm:text-2xl font-light">
                      Active Patron Clearance: {user?.name}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {user?.role} Unlocked
                    </span>
                  </div>
                  <p className="text-xs text-[#7896B2] font-light mt-0.5">
                    Unrestricted access active. Architectural appraisals, direct seller WhatsApp contacts, and verified Karnataka titles are now unlocked.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                {user?.role === 'Developer' && (
                  <Link
                    to="/developer"
                    className="inline-flex items-center gap-2 bg-teal-500 text-slate-950 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold hover:bg-teal-400 transition-colors shadow-sm cursor-pointer"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Developer Portal</span>
                  </Link>
                )}
                {user?.role === 'Admin' && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold hover:bg-emerald-400 transition-colors shadow-sm cursor-pointer"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Admin Console</span>
                  </Link>
                )}
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-2 bg-white text-[#183653] px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#F8F7F3] transition-colors shadow-sm cursor-pointer"
                >
                  <span>Browse Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Properties (Unlocked for authenticated patrons) */}
          <FeaturedProperties />
        </>
      )}

      {/* 3. Geographic Enclaves & Curated Regions */}
      <PopularLocations />

      {/* 4. Recently Listed (Only displayed to authenticated users) */}
      {isAuthenticated && <RecentlyListed />}

      {/* 5. Concierge Seller Invitation */}
      <SellCTA />
    </div>
  );
};
