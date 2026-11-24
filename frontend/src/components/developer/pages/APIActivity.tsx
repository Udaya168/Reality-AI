import React, { useState } from 'react';
import {
  Activity,
  Search,
  Filter,
  Eye,
  Trash2,
  RotateCcw,
  Clock,
  ArrowUpDown,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { useDeveloper } from '../hooks/useDeveloper';
import { APIActivityItem, HTTPMethod } from '../types/developer.types';
import { ActivityDetailModal } from '../components/ActivityDetailModal';

export const APIActivity: React.FC = () => {
  const { activityLogs, clearActivity, resetActivity } = useDeveloper();

  const [searchQuery, setSearchQuery] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'time' | 'latency'>('time');

  const [inspectItem, setInspectItem] = useState<APIActivityItem | null>(null);

  // Filter & sort
  const filteredLogs = activityLogs
    .filter((item) => {
      const matchesSearch = item.endpoint.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMethod = methodFilter === 'ALL' || item.method === methodFilter;
      const matchesStatus =
        statusFilter === 'ALL'
          ? true
          : statusFilter === '2xx'
          ? item.statusCode >= 200 && item.statusCode < 300
          : statusFilter === '4xx'
          ? item.statusCode >= 400 && item.statusCode < 500
          : item.statusCode >= 500;

      return matchesSearch && matchesMethod && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'latency') return b.latencyMs - a.latencyMs;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-teal-400" />
            <span>Sandbox Request Activity</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Inspect transaction history, execution latency, and simulated status codes.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={resetActivity}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
          <button
            type="button"
            onClick={clearActivity}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Logs</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by endpoint path..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            <option value="ALL">Method: ALL</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            <option value="ALL">Status: ALL</option>
            <option value="2xx">2xx Success</option>
            <option value="4xx">4xx Client Error</option>
            <option value="5xx">5xx Server Error</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'time' | 'latency')}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            <option value="time">Sort: Latest First</option>
            <option value="latency">Sort: Highest Latency</option>
          </select>
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase bg-slate-900/60">
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Endpoint</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Origin</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-mono">
                    No activity logs recorded. Send requests in the API Playground to populate this log.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-900/40 transition-colors cursor-pointer"
                    onClick={() => setInspectItem(item)}
                  >
                    <td className="py-3.5 px-4 font-bold text-teal-400">{item.method}</td>
                    <td className="py-3.5 px-4 text-slate-200 font-medium truncate max-w-[260px]">
                      {item.endpoint}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.statusCode === 200
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : item.statusCode === 404
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {item.statusCode}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{item.latencyMs} ms</td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] truncate max-w-[140px]">
                      {item.ipAddress}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(item.timestamp).toLocaleString([], {
                        dateStyle: 'short',
                        timeStyle: 'medium',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setInspectItem(item);
                        }}
                        className="px-2.5 py-1 rounded-lg text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 text-[11px] flex items-center gap-1 ml-auto cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <ActivityDetailModal
        activity={inspectItem}
        onClose={() => setInspectItem(null)}
      />
    </div>
  );
};
