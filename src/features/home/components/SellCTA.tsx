import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const SellCTA: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#183D30] text-[#F7F6F2] p-8 sm:p-14 lg:p-16 border border-[#315B49] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A7B9A5] block">
            For Discerning Owners &amp; Architects
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-white tracking-tight">
            Your property deserves the right buyer.
          </h2>
          <p className="text-[#A7B9A5] text-sm sm:text-base leading-relaxed font-light">
            List your villa, penthouse, or land parcel with Reality AI. We present your space with architectural integrity and connect you directly with qualified purchasers.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to="/sell"
              className="inline-flex items-center justify-center gap-2 bg-[#F7F6F2] text-[#183D30] px-7 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold hover:bg-white transition-colors rounded-[1px]"
            >
              <span>List your property</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 text-xs font-light text-[#A7B9A5] px-2">
              <ShieldCheck className="w-4 h-4 text-[#A7B9A5]" />
              <span>Zero brokerage fees for direct owners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
