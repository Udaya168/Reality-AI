import React from 'react';
import { AdminPropertyItem } from '../../../types/admin';
import { Eye, Check, Ban } from 'lucide-react';
import { formatINR } from '../../../lib/formatCurrency';

export const PropertyModerationTable: React.FC<{
  properties: AdminPropertyItem[];
  onSelect: (p: AdminPropertyItem) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}> = ({ properties, onSelect, onApprove, onReject }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="p-3.5 pl-5">Property</th>
              <th className="p-3.5">Seller</th>
              <th className="p-3.5">Price</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right pr-5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {properties.map((item) => (
              <tr key={item.id} className="hover:bg-slate-800/40">
                <td className="p-3.5 pl-5">
                  <div className="font-medium text-slate-200">{item.title}</div>
                  <div className="text-[11px] text-slate-400">{item.locality}, {item.city}</div>
                </td>
                <td className="p-3.5 text-slate-300">{item.sellerName} ({item.sellerType})</td>
                <td className="p-3.5 font-serif font-semibold text-emerald-400">{formatINR(item.price)}</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                    {item.status}
                  </span>
                </td>
                <td className="p-3.5 text-right pr-5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onSelect(item)}
                      className="p-1.5 bg-slate-800 text-slate-200 rounded hover:bg-slate-700"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      onClick={() => onApprove(item.id)}
                      className="p-1.5 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded hover:bg-emerald-900"
                    >
                      <Check size={13} />
                    </button>
                    <button
                      onClick={() => onReject(item.id)}
                      className="p-1.5 bg-rose-950 text-rose-300 border border-rose-800 rounded hover:bg-rose-900"
                    >
                      <Ban size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
