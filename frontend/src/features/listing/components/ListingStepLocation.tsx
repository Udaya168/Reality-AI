import React from 'react';

export const ListingStepLocation: React.FC<{
  city: string;
  setCity: (v: string) => void;
  locality: string;
  setLocality: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
}> = ({ city, setCity, locality, setLocality, address, setAddress }) => {
  return (
    <div className="space-y-4 text-xs">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono uppercase text-[#737970] mb-1">City *</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2.5 border border-[#E7E6DF] rounded-2xl"
          />
        </div>
        <div>
          <label className="block font-mono uppercase text-[#737970] mb-1">Locality *</label>
          <input
            type="text"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="e.g. Sadashivanagar"
            className="w-full p-2.5 border border-[#E7E6DF] rounded-2xl"
          />
        </div>
      </div>
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Address *</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Plot 42, 5th Cross"
          className="w-full p-2.5 border border-[#E7E6DF] rounded-2xl"
        />
      </div>
    </div>
  );
};
