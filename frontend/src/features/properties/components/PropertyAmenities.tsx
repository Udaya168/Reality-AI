import React from 'react';
import { Check } from 'lucide-react';

export interface PropertyAmenitiesProps {
  amenities: string[];
}

export const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {amenities.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 p-3 bg-white border border-[#D9E0E6] text-xs text-[#102B46] rounded-2xl"
        >
          <div className="w-4 h-4 rounded-full bg-[#183653]/10 flex items-center justify-center text-[#183653] shrink-0">
            <Check className="w-2.5 h-2.5" />
          </div>
          <span className="font-medium">{item}</span>
        </div>
      ))}
    </div>
  );
};
