import React from 'react';
import { AdminStats as StatsType } from '../../../types/admin';
import { Building2, Clock, CheckCircle2, XCircle, Users, AlertTriangle } from 'lucide-react';

export const AdminStats: React.FC<{ stats: StatsType }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="text-[11px] font-mono text-slate-400 uppercase">Total Listings</div>
        <div className="text-2xl font-serif font-bold text-white mt-1">{stats.totalListings}</div>
      </div>
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
        <div className="text-[11px] font-mono text-amber-300 uppercase">Pending Review</div>
        <div className="text-2xl font-serif font-bold text-amber-300 mt-1">{stats.pendingApprovals}</div>
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="text-[11px] font-mono text-slate-400 uppercase">Approved</div>
        <div className="text-2xl font-serif font-bold text-emerald-400 mt-1">{stats.approvedListings}</div>
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="text-[11px] font-mono text-slate-400 uppercase">Rejected</div>
        <div className="text-2xl font-serif font-bold text-rose-400 mt-1">{stats.rejectedListings}</div>
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <div className="text-[11px] font-mono text-slate-400 uppercase">Total Users</div>
        <div className="text-2xl font-serif font-bold text-white mt-1">{stats.totalUsers}</div>
      </div>
      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
        <div className="text-[11px] font-mono text-rose-300 uppercase">Reported</div>
        <div className="text-2xl font-serif font-bold text-rose-400 mt-1">{stats.reportedListings}</div>
      </div>
    </div>
  );
};
