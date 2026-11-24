import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Clock, ShieldCheck } from 'lucide-react';
import { APIActivityItem } from '../types/developer.types';
import { CodeBlock } from './CodeBlock';

interface ActivityDetailModalProps {
  activity: APIActivityItem | null;
  onClose: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'response' | 'request'>('response');

  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-200 z-10 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                activity.statusCode === 200
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : activity.statusCode === 404
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}
            >
              {activity.statusCode}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-teal-400 text-xs">
                  {activity.method}
                </span>
                <span className="font-mono text-white text-xs font-semibold">
                  {activity.endpoint}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {new Date(activity.timestamp).toLocaleString()} &bull; Latency: {activity.latencyMs}ms
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 text-xs font-mono mt-3 shrink-0">
          <button
            onClick={() => setActiveTab('response')}
            className={`px-4 py-2 border-b-2 font-semibold transition-colors cursor-pointer ${
              activeTab === 'response'
                ? 'border-teal-500 text-teal-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            JSON Response Payload
          </button>
          <button
            onClick={() => setActiveTab('request')}
            className={`px-4 py-2 border-b-2 font-semibold transition-colors cursor-pointer ${
              activeTab === 'request'
                ? 'border-teal-500 text-teal-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Request Metadata &amp; Params
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {activeTab === 'response' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Response Body ({activity.responseSizeBytes} bytes)</span>
              </div>
              <CodeBlock
                language="json"
                code={
                  activity.responseBody
                    ? JSON.stringify(activity.responseBody, null, 2)
                    : '// No payload returned'
                }
              />
            </div>
          ) : (
            <div className="space-y-4 font-mono text-xs">
              {/* Telemetry info */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Client Origin:</span>
                  <span className="text-slate-200">{activity.ipAddress}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block">Credential Prefix:</span>
                  <span className="text-teal-400">{activity.apiKeyPrefix}••••••••</span>
                </div>
              </div>

              {/* Query Parameters */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Query Parameters
                </span>
                {activity.queryParams && Object.keys(activity.queryParams).length > 0 ? (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    {Object.entries(activity.queryParams).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-teal-400">{key}:</span>
                        <span className="text-slate-200">{val}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-[11px]">
                    No query parameters passed
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
