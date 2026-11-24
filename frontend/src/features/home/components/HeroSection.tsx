import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Lock, ArrowRight, KeyRound, CheckCircle2, PhoneCall, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertySearch } from './PropertySearch';
import { useAuth } from '../../../context/AuthContext';

interface UnlockedSpotlight {
  id: string;
  title: string;
  locality: string;
  city: string;
  priceDisplay: string;
  specs: string;
  image: string;
}

const SPOTLIGHT_ESTATES: UnlockedSpotlight[] = [
  {
    id: 'prop-1',
    title: 'The Courtyard Villa at Sadashivanagar',
    locality: 'Sadashivanagar',
    city: 'Bengaluru',
    priceDisplay: '₹18.50 Cr',
    specs: '6,200 sq.ft • 4 BHK • Rain Court',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prop-2',
    title: 'The Glass Sky Penthouse',
    locality: 'Lavelle Road',
    city: 'Bengaluru',
    priceDisplay: '₹14.20 Cr',
    specs: '5,400 sq.ft • 4 BHK • Skyline Pool',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'prop-3',
    title: 'Misty Valley Arabica Estate',
    locality: 'Madikeri',
    city: 'Coorg',
    priceDisplay: '₹24.00 Cr',
    specs: '24 Acres • Heritage Bungalow',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
  },
];

export const HeroSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);
  const activeSpotlight = SPOTLIGHT_ESTATES[activeSpotlightIdx];

  return (
    <section className="relative pt-6 sm:pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline & Curated Search */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 space-y-7 z-10"
        >
          <div className="space-y-4">
            {/* Status Clearance Badge */}
            {isAuthenticated ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900/10 text-emerald-800 border border-emerald-500/20 text-xs font-mono uppercase tracking-widest rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Patron Clearance &bull; {user?.role || 'Patron'} Portal</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#183653]/10 text-[#183653] text-xs font-mono uppercase tracking-widest rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Architectural Marketplace &bull; Karnataka</span>
              </div>
            )}

            {/* Headline */}
            {isAuthenticated ? (
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[4.75rem] leading-[1.05] text-[#183653] font-normal tracking-tight">
                Welcome, <br />
                <span className="italic font-light text-[#315D82]">{user?.name}.</span>
              </h1>
            ) : (
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[4.75rem] leading-[1.05] text-[#183653] font-normal tracking-tight">
                Spaces designed <br />
                <span className="italic font-light">with architectural soul.</span>
              </h1>
            )}

            {/* Subtitle */}
            {isAuthenticated ? (
              <p className="text-[#315D82] text-base sm:text-lg max-w-xl leading-relaxed font-light">
                Your private portfolio is unlocked. Direct owner lines, verified architectural valuations, and title audits are active across all 48 Karnataka residences.
              </p>
            ) : (
              <p className="text-[#354B60] text-base sm:text-lg max-w-xl leading-relaxed font-light">
                Curated private villas, tropical modern courtyards, and hill country acreages across Bengaluru and Karnataka. We preserve owner privacy by keeping listings private to verified patrons.
              </p>
            )}
          </div>

          {/* Architectural Concierge Search Module */}
          <PropertySearch />

          {/* Trust / Clearance Indicators */}
          {isAuthenticated ? (
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-[#183653]">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#DCE7F0] rounded-full border border-[#7896B2]/50">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>48 Unlocked Residences</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#DCE7F0] rounded-full border border-[#7896B2]/50">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                <span>Direct WhatsApp Concierge</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#DCE7F0] rounded-full border border-[#7896B2]/50">
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Bhoomi Title Dossiers</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs font-light text-[#354B60]">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full border border-[#D9E0E6]/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#315D82]" />
                <span>Bhoomi &amp; Kaveri 2.0 Audited</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full border border-[#D9E0E6]/70">
                <KeyRound className="w-3.5 h-3.5 text-[#315D82]" />
                <span>Direct Owner Representation</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Column: Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-[#D9E0E6]/80 bg-[#EDF2F6] shadow-[0_24px_60px_rgba(24,54,83,0.14)]">
            {/* Image (dynamic if logged in, static if logged out) */}
            <AnimatePresence mode="wait">
              <motion.img
                key={isAuthenticated ? activeSpotlight.id : 'default-hero'}
                src={isAuthenticated ? activeSpotlight.image : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
                alt={isAuthenticated ? activeSpotlight.title : 'Architectural Masterpiece in Karnataka'}
                initial={{ opacity: 0.7, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Ambient luxury gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

            {/* Floating Card: Unlocked Estate Showcase vs Locked Teaser */}
            {isAuthenticated ? (
              <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/25 text-white space-y-3.5 shadow-2xl">
                {/* Header row with Unlocked badge and price */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 rounded-full">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    <span>Unlocked Estate</span>
                  </span>
                  <span className="font-serif text-xl font-semibold text-white tracking-wide">
                    {activeSpotlight.priceDisplay}
                  </span>
                </div>

                {/* Title & Specs */}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug">
                    {activeSpotlight.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/80 font-mono mt-1">
                    <span>{activeSpotlight.specs}</span>
                    <span className="text-emerald-300 font-sans text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Direct Owner
                    </span>
                  </div>
                </div>

                {/* Switcher Tabs between estates */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  {SPOTLIGHT_ESTATES.map((estate, idx) => (
                    <button
                      key={estate.id}
                      type="button"
                      onClick={() => setActiveSpotlightIdx(idx)}
                      className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        idx === activeSpotlightIdx
                          ? 'bg-white text-[#183653] font-bold shadow'
                          : 'bg-white/15 text-white/70 hover:bg-white/25'
                      }`}
                    >
                      {estate.locality}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    to={`/properties/${activeSpotlight.id}`}
                    className="flex-1 py-2.5 px-4 bg-white text-[#183653] hover:bg-[#F8F7F3] font-mono text-xs uppercase tracking-wider font-semibold rounded-full flex items-center justify-center gap-2 transition-all shadow-md group"
                  >
                    <span>View Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/properties"
                    className="py-2.5 px-4 bg-white/20 hover:bg-white/30 text-white font-mono text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-1 border border-white/25 transition-all"
                  >
                    <span>All 48</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-white/20 text-white rounded-full">
                    <Lock className="w-3 h-3 text-[#7896B2]" />
                    <span>Private Archive</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#7896B2] uppercase">
                    Bengaluru &bull; Coorg &bull; Mysuru
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-tight">
                    Discreet Architectural Residences
                  </h3>
                  <p className="text-xs text-white/80 font-light mt-1">
                    Active listings, architectural blueprints &amp; owner contacts are reserved for verified patrons.
                  </p>
                </div>

                <div className="pt-1">
                  <Link
                    to="/login?redirect=properties"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white bg-white/20 hover:bg-white hover:text-[#183653] px-4 py-2 rounded-full transition-all"
                  >
                    <span>Sign in to Unlock Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
