import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PropertySearch } from './PropertySearch';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-6 sm:pt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headline & Search */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 space-y-8 z-10"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#183D30]/10 text-[#183D30] text-xs font-mono uppercase tracking-widest rounded-[1px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Real Estate &bull; Karnataka</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-7xl lg:text-[5rem] leading-[1.04] text-[#183D30] font-normal tracking-tight">
              Find a place that <br />
              <span className="italic font-light">feels like yours.</span>
            </h1>

            <p className="text-[#737970] text-base sm:text-lg max-w-xl leading-relaxed font-light">
              Discover exceptional homes, private villas, agricultural estates, and land parcels across Bengaluru and Karnataka. Connect directly with verified sellers without intermediary friction.
            </p>
          </div>

          {/* Architectural Search Module */}
          <PropertySearch />
        </motion.div>

        {/* Right Column: Hero Architectural Photography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-4/5 overflow-hidden border border-[#E7E6DF] bg-[#F0EFE9] shadow-[0_20px_50px_rgba(24,61,48,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Architectural Villa in Sadashivanagar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5]">
                Curator's Choice &bull; Bengaluru
              </span>
              <div className="font-serif text-xl sm:text-2xl font-light">
                The Courtyard Villa at Sadashivanagar
              </div>
              <div className="text-xs font-mono text-[#F7F6F2]/80">
                ₹18.5 Cr &bull; Tropical Modernism
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
