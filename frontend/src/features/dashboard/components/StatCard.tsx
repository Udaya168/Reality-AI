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
      className={`p-6 border transition-all rounded-2xl ${
        accent
          ? 'bg-[#183653] text-white border-[#183653]'
          : 'bg-white border-[#D9E0E6] text-[#102B46] hover:border-[#183653]'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-[10px] font-mono uppercase tracking-widest ${
            accent ? 'text-[#7896B2]' : 'text-[#354B60]'
          }`}
        >
          {label}
        </span>
        <div
          className={`w-8 h-8 rounded-2xl flex items-center justify-center ${
            accent ? 'bg-white/10 text-white' : 'bg-[#EDF2F6] text-[#183653]'
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
              accent ? 'text-white/80' : 'text-[#354B60]'
            }`}
          >
            {subtext}
          </div>
        )}
      </div>

      {trend && (
        <div
          className={`mt-3 pt-3 border-t text-[11px] font-mono uppercase tracking-wider flex items-center gap-1 ${
            accent ? 'border-white/10 text-[#7896B2]' : 'border-[#D9E0E6] text-[#315D82]'
          }`}
        >
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};
