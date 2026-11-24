import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PropertyCard } from '../../properties/components/PropertyCard';
import { mockProperties } from '../../../data/mock/mockProperties';

export const RecentlyListed: React.FC = () => {
  const recent = [...mockProperties]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E7E6DF] gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#737970] block">
            Latest Additions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#183D30] font-normal mt-1 tracking-tight">
            Recently Listed
          </h2>
        </div>
        <Link
          to="/properties?sort=recent"
          className="text-xs font-mono uppercase tracking-wider text-[#183D30] hover:text-[#315B49] flex items-center gap-1.5 transition-colors group"
        >
          <span>View All Recent Additions</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {recent.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
};
