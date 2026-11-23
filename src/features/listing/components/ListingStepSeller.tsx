import React from 'react';

export const ListingStepSeller: React.FC<{
  name: string;
  setName: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  type: 'Owner' | 'Agent' | 'Builder';
  setType: (v: 'Owner' | 'Agent' | 'Builder') => void;
}> = ({ name, setName, phone, setPhone, type, setType }) => {
  return (
    <div className="space-y-4 text-xs">
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Full Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px]"
        />
      </div>
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Phone Number *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2.5 border border-[#E7E6DF] rounded-[1px]"
        />
      </div>
      <div>
        <label className="block font-mono uppercase text-[#737970] mb-1">Seller Type</label>
        <div className="grid grid-cols-3 gap-2">
          {(['Owner', 'Agent', 'Builder'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`p-2.5 border text-center font-mono uppercase text-xs rounded-[1px] ${
                type === t ? 'bg-[#183D30] text-white font-bold' : 'bg-white text-[#202520] border-[#E7E6DF]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
