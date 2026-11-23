import React from 'react';
import { Property } from '../../properties/types/property.types';
import { PropertyCard } from '../../properties/components/PropertyCard';

export const SavedPropertyGrid: React.FC<{
  properties: Property[];
}> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
};
