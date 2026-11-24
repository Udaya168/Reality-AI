import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Key,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Activity,
  Copy,
  Check,
  Zap,
  Server,
  Layers,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useDeveloper } from '../hooks/useDeveloper';
import { MetricCard } from '../components/MetricCard';
import { RequestLatencyChart } from '../components/RequestLatencyChart';
import { CreateKeyModal } from '../components/CreateKeyModal';
import { DEVELOPER_PORTAL_UUID, MOCK_API_HEALTH } from '../data/mockDeveloperData';

export const DeveloperOverview: React.FC = () => {
  const { user } = useAuth();
  const { keys, activityLogs, createKey } = useDeveloper();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [copiedUUID, setCopiedUUID] = useState(false);

  const handleCopyUUID = () => {
    navigator.clipboard.writeText(DEVELOPER_PORTAL_UUID);
    setCopiedUUID(true);
    setTimeout(() => setCopiedUUID(false), 2000);
  };

  const activeKeysCount = keys.filter((k) => k.status === 'active').length;
  const recentActivity = activityLogs.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* 1. TOP HERO: Personalized Welcome & Platform Identifier */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#111C38] to-[#0F172A] border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-teal-500/15 text-teal-400 border border-teal-500/30">
              API Environment: SANDBOX
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700">
              Status: Local Simulation
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
            Welcome, {user?.name || 'Developer'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Build and test integrations against the Reality AI architectural property graph. Explore sample endpoints, prototype search queries, and manage sandbox authentication credentials.
          </p>

          {/* Fixed Portal Identification Chip */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs font-mono">
              <span className="text-slate-400 text-[10px] uppercase tracking-wider">Developer Portal UUID:</span>
              <code className="text-teal-300 font-semibold">{DEVELOPER_PORTAL_UUID}</code>
              <button
                type="button"
                onClick={handleCopyUUID}
                className="p-1 hover:text-white text-slate-400 transition-colors cursor-pointer"
                title="Copy Developer Portal UUID"
              >
                {copiedUUID ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copiedUUID && (
              <span className="text-xs text-teal-400 font-mono">UUID copied to clipboard!</span>
            )}
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. QUICK ACTIONS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setCreateModalOpen(true)}
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all text-left flex items-center justify-between group cursor-pointer shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white block">Generate Test Key</span>
              <span className="text-[11px] text-slate-400 block">Create credentials for local prototyping</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-400 transition-colors" />
        </button>

        <Link
          to="/developer/playground"
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all text-left flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white block">Launch Playground</span>
              <span className="text-[11px] text-slate-400 block">Test live simulated requests &amp; responses</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
        </Link>

        <Link
          to="/developer/docs"
          className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/40 transition-all text-left flex items-center justify-between group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-white block">API Documentation</span>
              <span className="text-[11px] text-slate-400 block">Review parameter tables &amp; code samples</span>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
        </Link>
      </div>

      {/* 3. SIMULATED API METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Sandbox Requests"
          value="1,842"
          subtext="Simulated Volume"
          trend="up"
          trendValue="+14% today"
          icon={<Zap className="w-4 h-4" />}
          badge="Sandbox"
        />
        <MetricCard
          label="Successful (2xx)"
          value="1,812"
          subtext="98.4% success rate"
          trend="up"
          trendValue="Healthy"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          label="Failed Requests (4xx/5xx)"
          value="30"
          subtext="1.6% client validation"
          trend="neutral"
          trendValue="Nominal"
          icon={<Clock className="w-4 h-4 text-amber-400" />}
        />
        <MetricCard
          label="Average Latency"
          value="118 ms"
          subtext="Local Mock Response"
          trend="down"
          trendValue="-8ms"
          icon={<Activity className="w-4 h-4 text-teal-400" />}
        />
      </div>

      {/* 4. USAGE CHART & HEALTH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Latency and Volume Chart (Span 8) */}
        <div className="lg:col-span-8">
          <RequestLatencyChart />
        </div>

        {/* Right Column: Service Health (Span 4) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Simulated Service Health
              </h4>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                100% MOCK
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Microservice health telemetry for local gateway simulation.
            </p>
          </div>

          <div className="space-y-3">
            {MOCK_API_HEALTH.map((svc) => (
              <div
                key={svc.service}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-white font-medium">{svc.service}</span>
                </div>
                <div className="text-right">
                  <span className="text-teal-400 font-semibold block">{svc.latencyMs} ms</span>
                  <span className="text-[10px] text-slate-400 block">{svc.uptimePercentage}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-2">
            <Server className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>All mock services responding normally</span>
          </div>
        </div>
      </div>

      {/* 5. RECENT ACTIVITY & GETTING STARTED SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Activity Table (Span 7) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-mono font-bold text-white">
                Recent Simulated Requests
              </h4>
              <span className="text-xs text-slate-400">
                Latest transactions processed through the local sandbox
              </span>
            </div>
            <Link
              to="/developer/activity"
              className="text-xs font-mono text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase">
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Endpoint</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Latency</th>
                  <th className="py-2.5 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentActivity.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-teal-400">{act.method}</td>
                    <td className="py-2.5 px-3 text-slate-200 truncate max-w-[200px]">
                      {act.endpoint}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          act.statusCode === 200
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : act.statusCode === 404
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {act.statusCode}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{act.latencyMs} ms</td>
                    <td className="py-2.5 px-3 text-slate-400 text-[10px]">
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4-Step Getting Started Guide (Span 5) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <h4 className="text-sm font-mono font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Developer Quick Start</span>
          </h4>

          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                1
              </span>
              <div className="space-y-1">
                <span className="font-semibold text-white block">Generate Sandbox Key</span>
                <p className="text-[11px] text-slate-400">
                  Create a demo key prefixed with <code>rai_test_</code> to authenticate simulated API calls.
                </p>
                <Link to="/developer/api-keys" className="text-[11px] text-teal-400 hover:underline block pt-0.5">
                  Manage keys &rarr;
                </Link>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                2
              </span>
              <div className="space-y-1">
                <span className="font-semibold text-white block">Explore Documentation</span>
                <p className="text-[11px] text-slate-400">
                  Read parameter tables, JSON response schemas, and copyable cURL / JS / Python snippets.
                </p>
                <Link to="/developer/docs" className="text-[11px] text-teal-400 hover:underline block pt-0.5">
                  Read docs &rarr;
                </Link>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 flex gap-3">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                3
              </span>
              <div className="space-y-1">
                <span className="font-semibold text-white block">Execute Live Queries</span>
                <p className="text-[11px] text-slate-400">
                  Use the API Playground to dispatch requests and inspect headers, latency, and status codes.
                </p>
                <Link to="/developer/playground" className="text-[11px] text-teal-400 hover:underline block pt-0.5">
                  Open Playground &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Key Modal */}
      <CreateKeyModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateKey={createKey}
      />
    </div>
  );
};
