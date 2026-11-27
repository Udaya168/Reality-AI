import React from 'react';
import { Property } from '../../../types/property';
import { PropertyCard } from '../../properties/components/PropertyCard';

export const SavedPropertyGrid: React.FC<{
  properties: Property[];
}> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
};
