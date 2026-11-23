import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  trend?: string;
  accent?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon,
  trend,
  accent = false,
}) => {
  return (
    <div
      className={`p-6 border transition-all rounded-[1px] ${
        accent
          ? 'bg-[#183D30] text-white border-[#183D30]'
          : 'bg-white border-[#E7E6DF] text-[#202520] hover:border-[#183D30]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[10px] font-mono uppercase tracking-widest ${
            accent ? 'text-[#A7B9A5]' : 'text-[#737970]'
          }`}
        >
          {label}
        </span>
        <div
          className={`w-8 h-8 rounded-[1px] flex items-center justify-center ${
            accent ? 'bg-white/10 text-white' : 'bg-[#F0EFE9] text-[#183D30]'
          }`}
        >
          {icon}
        </div>
      </div>

      <div className="space-y-1">
        <div className="font-serif text-3xl font-semibold tracking-tight">
          {value}
        </div>
        {subtext && (
          <div
            className={`text-xs font-light leading-relaxed ${
              accent ? 'text-white/80' : 'text-[#737970]'
            }`}
          >
            {subtext}
          </div>
        )}
      </div>

      {trend && (
        <div
          className={`mt-3 pt-3 border-t text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 ${
            accent ? 'border-white/10 text-[#A7B9A5]' : 'border-[#E7E6DF] text-[#315B49]'
          }`}
        >
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};
