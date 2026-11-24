import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  trend,
  trendValue,
  icon,
  badge,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800/80 hover:border-slate-700 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] flex flex-col justify-between">
      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
          {label}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
              {badge}
            </span>
          )}
          {icon && <div className="text-teal-400">{icon}</div>}
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tight">
          {value}
        </div>
        <div className="flex items-center gap-2 text-xs">
          {trend && trendValue && (
            <span
              className={`inline-flex items-center gap-1 font-mono text-[11px] font-semibold ${
                trend === 'up'
                  ? 'text-emerald-400'
                  : trend === 'down'
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {trend === 'neutral' && <Minus className="w-3 h-3" />}
              <span>{trendValue}</span>
            </span>
          )}
          {subtext && <span className="text-slate-400 text-[11px]">{subtext}</span>}
        </div>
      </div>
    </div>
  );
};
