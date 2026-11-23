import React from 'react';
import { propertyTypeOptions } from '../../../data/constants/property-options';

interface StepProps {
  value: string;
  onChange: (val: string) => void;
}

export const ListingStepCategory: React.FC<StepProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl text-[#183D30]">Select Typology</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {propertyTypeOptions.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={`p-4 text-center border text-xs font-mono uppercase tracking-wider rounded-[1px] transition-colors cursor-pointer ${
              value === type
                ? 'bg-[#183D30] text-white border-[#183D30] font-bold'
                : 'bg-white text-[#202520] border-[#E7E6DF] hover:border-[#183D30]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};
