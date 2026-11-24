import React from 'react';

export const RequestLatencyChart: React.FC = () => {
  // Simulated hourly request metrics for today
  const hours = [
    { hour: '00:00', requests: 42, latency: 98 },
    { hour: '02:00', requests: 18, latency: 85 },
    { hour: '04:00', requests: 12, latency: 76 },
    { hour: '06:00', requests: 28, latency: 88 },
    { hour: '08:00', requests: 95, latency: 120 },
    { hour: '10:00', requests: 210, latency: 145 },
    { hour: '12:00', requests: 285, latency: 160 },
    { hour: '14:00', requests: 310, latency: 172 },
    { hour: '16:00', requests: 270, latency: 150 },
    { hour: '18:00', requests: 195, latency: 134 },
    { hour: '20:00', requests: 140, latency: 110 },
    { hour: '22:00', requests: 88, latency: 95 },
  ];

  const maxRequests = 350;

  return (
    <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Request Volume &amp; Latency Over Time
          </h4>
          <span className="text-[11px] text-slate-400 font-mono">
            Simulated 24-Hour Sandbox Activity
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-teal-400"></span>
            <span className="text-slate-300 text-[11px]">Requests (Count)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></span>
            <span className="text-slate-300 text-[11px]">Avg Latency (ms)</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-2">
        <div className="h-44 flex items-end gap-2 sm:gap-3 border-b border-slate-800 pb-2">
          {hours.map((item) => {
            const heightPercent = Math.round((item.requests / maxRequests) * 100);
            return (
              <div
                key={item.hour}
                className="flex-1 flex flex-col items-center justify-end h-full group relative"
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-12 bg-slate-900 border border-slate-700 text-white font-mono text-[10px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                  <div>{item.hour}</div>
                  <div className="text-teal-400 font-semibold">{item.requests} reqs</div>
                  <div className="text-cyan-400">{item.latency} ms</div>
                </div>

                {/* Bar */}
                <div
                  className="w-full bg-gradient-to-t from-teal-500/40 to-teal-400 rounded-t-sm group-hover:from-teal-400 group-hover:to-teal-300 transition-all duration-300"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between pt-2 text-[10px] font-mono text-slate-400">
          {hours.filter((_, idx) => idx % 2 === 0).map((item) => (
            <span key={item.hour}>{item.hour}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
