import React from 'react';

export const ListingStepDetails: React.FC<{
  title: string;
  setTitle: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  area: string;
  setArea: (v: string) => void;
}> = ({ title, setTitle, price, setPrice, area, setArea }) => {
  return (
    <div className="space-y-4 text-xs">
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Modern Minimalist Courtyard Residence"
          className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px] focus:outline-none focus:border-[#183D30]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono uppercase text-[#737970] mb-1">Price (INR) *</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="18500000"
            className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px] focus:outline-none focus:border-[#183D30]"
          />
        </div>
        <div>
          <label className="block font-mono uppercase text-[#737970] mb-1">Area (sq.ft) *</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="6200"
            className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px] focus:outline-none focus:border-[#183D30]"
          />
        </div>
      </div>
    </div>
  );
};
