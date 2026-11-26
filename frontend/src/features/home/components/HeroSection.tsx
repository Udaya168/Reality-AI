import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, Lock, ArrowRight, KeyRound, CheckCircle2, PhoneCall, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PropertySearch } from './PropertySearch';
import { useAuth } from '../../../context/AuthContext';
import { usePropertyContext } from '../../../context/PropertyContext';
import { useSavedProperties } from '../../../context/SavedPropertiesContext';
import { formatINR } from '../../../lib/formatCurrency';
import {
  getPropertyCategoryLabel,
  isResidentialPropertyCategory,
  PropertyCardImage,
} from '../../properties/components/PropertyCard';

export const HeroSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { featuredProperties, properties } = usePropertyContext();
  const { isSaved, toggleSaveProperty } = useSavedProperties();
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState(0);
  const spotlightProperties = (featuredProperties.length ? featuredProperties : properties).slice(0, 3);
  const activeSpotlight = spotlightProperties[activeSpotlightIdx] ?? spotlightProperties[0];
  const spotlightImage =
    activeSpotlight?.images?.[activeSpotlight.coverImageIndex] || activeSpotlight?.images?.[0];
  const spotlightSpecs = activeSpotlight
    ? [
        activeSpotlight.features.areaSqFt > 0
          ? `${activeSpotlight.features.areaSqFt.toLocaleString('en-IN')} sq.ft`
          : undefined,
        isResidentialPropertyCategory(activeSpotlight.category) && activeSpotlight.features.bedrooms
          ? `${activeSpotlight.features.bedrooms} BHK`
          : undefined,
        isResidentialPropertyCategory(activeSpotlight.category) && activeSpotlight.features.bathrooms
          ? `${activeSpotlight.features.bathrooms} baths`
          : undefined,
      ].filter(Boolean).join(' • ')
    : '';

  return (
    <section className="home-hero relative isolate pt-8 sm:pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="home-hero-backdrop" aria-hidden="true">
        {spotlightImage && <img src={spotlightImage} alt="" loading="lazy" />}
      </div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-16 items-center">
        {/* Left Column: Headline & Curated Search */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-7 z-10"
        >
          <div className="space-y-4">
            {/* Status Clearance Badge */}
            {isAuthenticated ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-900/10 text-emerald-800 border border-emerald-500/20 text-xs font-mono uppercase tracking-widest rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Verified Patron Clearance &bull; {user?.role || 'Patron'} Portal</span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#183653]/[0.06] text-[#183653] border border-[#183653]/10 text-xs font-mono uppercase tracking-[0.16em] rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-curated homes &bull; Karnataka</span>
              </div>
            )}

            {/* Headline */}
            {isAuthenticated ? (
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.03] text-[#183653] font-normal tracking-[-0.045em]">
                Welcome, <br />
                <span className="italic font-light text-[#315D82]">{user?.name}.</span>
              </h1>
            ) : (
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.03] text-[#183653] font-normal tracking-[-0.045em]">
                Find a home <br />
                with <span className="italic font-light text-[#315D82]">architectural soul.</span>
              </h1>
            )}

            {/* Subtitle */}
            {isAuthenticated ? (
              <p className="text-[#315D82] text-base sm:text-lg max-w-xl leading-relaxed font-light">
                Your private portfolio is unlocked. Direct owner lines, verified architectural valuations, and title audits are active across all 48 Karnataka residences.
              </p>
            ) : (
              <p className="text-[#354B60] text-base sm:text-lg max-w-xl leading-relaxed font-light">
                Discover distinctive properties with AI-guided insights, verified ownership, and architectural value—thoughtfully curated across Bengaluru and Karnataka.
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
              <div className="home-trust-chip flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full border border-[#D9E0E6]/70">
                <ShieldCheck className="w-3.5 h-3.5 text-[#315D82]" />
                <span>Bhoomi &amp; Kaveri 2.0 Audited</span>
              </div>
              <div className="home-trust-chip flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full border border-[#D9E0E6]/70">
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
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#D9E0E6]/80 bg-[#EDF2F6] shadow-[0_28px_70px_rgba(24,54,83,0.16)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpotlight?.id || 'empty-spotlight'}
                initial={{ opacity: 0.7, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7 }}
                transition={{ duration: 0.4 }}
                className="group absolute inset-0"
              >
                <PropertyCardImage
                  imageSrc={spotlightImage}
                  title={activeSpotlight?.title || 'Featured property'}
                  category={activeSpotlight?.category}
                  isVerified={activeSpotlight?.isVerified === true}
                  showPrice={false}
                  showWishlist={Boolean(isAuthenticated && activeSpotlight)}
                  isSaved={activeSpotlight ? isSaved(activeSpotlight.id) : false}
                  onToggleSaved={activeSpotlight ? () => toggleSaveProperty(activeSpotlight.id) : undefined}
                  priority
                  containerClassName="h-full w-full rounded-none"
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating Card: Unlocked Estate Showcase vs Locked Teaser */}
            {isAuthenticated ? (
              activeSpotlight ? (
              <div className="absolute bottom-5 left-5 right-5 space-y-3.5 rounded-2xl border border-white/25 bg-black/50 p-5 text-white shadow-2xl backdrop-blur-xl">
                {/* Header row with Unlocked badge and price */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono uppercase tracking-widest bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 rounded-full">
                    <Sparkles className="w-3 h-3 text-emerald-300" />
                    <span>Unlocked Estate</span>
                  </span>
                  <span className="font-serif text-xl font-semibold text-white tracking-wide">
                    {activeSpotlight.priceDisplay?.trim() || (
                      Number.isFinite(activeSpotlight.price) && activeSpotlight.price > 0
                        ? formatINR(activeSpotlight.price)
                        : 'Price on request'
                    )}
                  </span>
                </div>

                {/* Title & Specs */}
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug">
                    {activeSpotlight.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-white/80 font-mono mt-1">
                    <span>{spotlightSpecs || getPropertyCategoryLabel(activeSpotlight.category)}</span>
                    <span className="text-emerald-300 font-sans text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {activeSpotlight.seller.type === 'Owner' ? 'Direct Owner' : activeSpotlight.seller.type}
                    </span>
                  </div>
                </div>

                {/* Switcher Tabs between estates */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  {spotlightProperties.map((estate, idx) => (
                    <button
                      key={estate.id}
                      type="button"
                      onClick={() => setActiveSpotlightIdx(idx)}
                      aria-pressed={idx === activeSpotlightIdx}
                      className={`min-h-8 rounded-full px-2.5 py-1 text-[10px] font-mono uppercase transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#183653] ${
                        idx === activeSpotlightIdx
                          ? 'bg-white text-[#183653] font-bold shadow'
                          : 'bg-white/15 text-white/70 hover:bg-white/25'
                      }`}
                    >
                      {estate.location.locality || getPropertyCategoryLabel(estate.category)}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    to={`/property/${activeSpotlight.id}`}
                    className="flex-1 min-h-11 py-2.5 px-4 bg-white text-[#183653] hover:bg-[#F8F7F3] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#183653] font-mono text-xs uppercase tracking-wider font-semibold rounded-full flex items-center justify-center gap-2 transition-all shadow-md group"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
              ) : (
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/25 bg-black/50 p-5 text-white shadow-2xl backdrop-blur-xl">
                  <p className="font-serif text-xl">A considered collection awaits.</p>
                  <Link to="/properties" className="mt-3 inline-flex min-h-10 items-center rounded-full bg-white px-4 text-xs font-mono uppercase text-[#183653]">
                    View Properties
                  </Link>
                </div>
              )
            ) : (
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest bg-white/20 text-white rounded-full">
                    <Lock className="w-3 h-3 text-[#7896B2]" />
                    <span>Private Archive</span>
                  </span>
                  {activeSpotlight && (
                    <span className="text-[10px] font-mono text-[#7896B2] uppercase">
                      {[activeSpotlight.location.locality, activeSpotlight.location.city].filter(Boolean).join(' • ')}
                    </span>
                  )}
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
                    className="inline-flex min-h-11 items-center gap-2 text-xs font-mono uppercase tracking-wider text-white bg-white/20 hover:bg-white/90 hover:text-[#183653] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#183653] px-4 py-2 rounded-full transition-all"
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
