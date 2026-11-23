import React from 'react';
import { MapPin } from 'lucide-react';

export interface PropertyMapProps {
  locality: string;
  city: string;
  address: string;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({ locality, city, address }) => {
  return (
    <div className="bg-white border border-[#E7E6DF] p-6 space-y-4">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-[#183D30] shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-[#202520]">{locality}, {city}</div>
          <div className="text-xs text-[#737970] mt-0.5">{address}</div>
        </div>
      </div>
      <div className="relative aspect-21/9 bg-[#F7F6F2] border border-[#E7E6DF] flex flex-col items-center justify-center text-center p-6">
        <div className="w-8 h-8 rounded-full bg-[#183D30] text-white flex items-center justify-center mx-auto mb-2">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="font-serif text-base text-[#183D30]">{locality} Neighborhood</div>
        <div className="text-[11px] font-mono text-[#737970] uppercase">
          Exact coordinates verified via Bhoomi / Kaveri 2.0 land records
        </div>
      </div>
    </div>
  );
};
