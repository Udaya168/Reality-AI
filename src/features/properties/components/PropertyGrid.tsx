import React from 'react';
import { Property } from '../types/property.types';
import { PropertyCard } from './PropertyCard';

export interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-[#E7E6DF] p-8">
        <h3 className="font-serif text-2xl text-[#183D30]">No matching properties found</h3>
        <p className="text-xs text-[#737970] mt-1">Try adjusting your filters or search keywords.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
