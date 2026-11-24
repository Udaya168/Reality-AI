import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export const SellCTA: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-[#183653] text-[#F8F7F3] p-8 sm:p-14 lg:p-16 border border-[#315D82]/40 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#7896B2]">
            For Discerning Owners &amp; Architects
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white tracking-tight">
            Your architectural property deserves the right patron.
          </h2>
          <p className="text-[#7896B2] text-sm sm:text-base leading-relaxed font-light">
            List your villa, penthouse, or land parcel with Reality AI. We present your space with architectural integrity and connect you directly with qualified purchasers.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/sell"
              className="inline-flex items-center justify-center gap-2 bg-[#F8F7F3] text-[#183653] px-8 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-all rounded-full shadow-md active:scale-95"
            >
              <span>List your property</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 text-xs font-light text-[#7896B2] px-2">
              <ShieldCheck className="w-4 h-4 text-[#7896B2]" />
              <span>Zero brokerage fees for direct owners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
