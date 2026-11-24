import React from 'react';
import { BedDouble, Bath, Maximize2, Compass, Calendar, Car } from 'lucide-react';
import { PropertyFeatures } from '../types/property.types';

export interface PropertyOverviewProps {
  features: PropertyFeatures;
}

export const PropertyOverview: React.FC<PropertyOverviewProps> = ({ features }) => {
  const specs = [
    { label: 'Built Area', value: `${features.areaSqFt.toLocaleString('en-IN')} sq.ft`, icon: Maximize2 },
    { label: 'Bedrooms', value: features.bedrooms ? `${features.bedrooms} BHK` : 'N/A', icon: BedDouble },
    { label: 'Bathrooms', value: features.bathrooms ? `${features.bathrooms} Baths` : 'N/A', icon: Bath },
    { label: 'Facing', value: features.facing || 'East', icon: Compass },
    { label: 'Age', value: `${features.ageOfPropertyYears} Years`, icon: Calendar },
    { label: 'Parking', value: `${features.carParking} Covered`, icon: Car },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {specs.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="p-4 bg-white border border-[#D9E0E6] rounded-2xl">
            <div className="flex items-center gap-2 text-xs text-[#354B60] mb-1">
              <Icon className="w-3.5 h-3.5 text-[#315D82]" />
              <span className="font-mono uppercase text-[10px]">{item.label}</span>
            </div>
            <div className="font-serif text-lg font-semibold text-[#102B46]">{item.value}</div>
          </div>
        );
      })}
    </div>
  );
};
