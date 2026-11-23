import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { featuredLocations } from '../../../data/constants/locations';

export const PopularLocations: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E6DF] gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
            Geographic Curation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal mt-1 tracking-tight">
            Discover by Location
          </h2>
        </div>
        <Link
          to="/properties"
          className="text-xs font-mono uppercase tracking-wider text-[#183D30] hover:text-[#315B49] flex items-center gap-1.5 transition-colors group"
        >
          <span>All Karnataka Enclaves</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {featuredLocations.map((loc) => (
          <Link
            key={loc.id}
            to={`/properties?location=${encodeURIComponent(loc.name.split(' ')[0])}`}
            className="group relative h-72 overflow-hidden border border-[#E7E6DF] bg-white flex flex-col justify-end p-5"
          >
            <img
              src={loc.image}
              alt={loc.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A7B9A5] flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{loc.city}</span>
              </span>
              <h3 className="font-serif text-xl font-medium text-white group-hover:underline underline-offset-4">
                {loc.name}
              </h3>
              <p className="text-[11px] text-white/70 line-clamp-1 font-light">
                {loc.listingCount} Exclusive Listings
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
