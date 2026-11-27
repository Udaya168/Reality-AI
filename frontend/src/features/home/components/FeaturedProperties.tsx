import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PropertyCard } from '../../properties/components/PropertyCard';
import { mockProperties } from '../../../data/mock/mockProperties';

export const FeaturedProperties: React.FC = () => {
  const featured = mockProperties.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#D9E0E6] gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#354B60] block">
            Editor's Selection
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#183653] font-normal mt-1 tracking-tight">
            Featured Residences
          </h2>
        </div>
        <Link
          to="/properties"
          className="text-xs font-mono uppercase tracking-wider text-[#183653] hover:text-[#315D82] flex items-center gap-1.5 transition-colors group shrink-0"
        >
          <span>View All Curated Properties</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {featured.map((property, idx) => (
          <PropertyCard key={property.id} property={property} priority={idx < 2} />
        ))}
      </div>
    </section>
  );
};
