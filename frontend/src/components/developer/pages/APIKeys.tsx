import React, { useState } from 'react';
import {
  Key,
  Plus,
  Search,
  Copy,
  Check,
  Trash2,
  Edit2,
  ShieldAlert,
  AlertTriangle,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { useDeveloper } from '../hooks/useDeveloper';
import { APIKey } from '../types/developer.types';
import { CreateKeyModal } from '../components/CreateKeyModal';
import { RevokeKeyModal } from '../components/RevokeKeyModal';

export const APIKeys: React.FC = () => {
  const { keys, createKey, revokeKey, renameKey } = useDeveloper();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'revoked'>('all');

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [keyToRevoke, setKeyToRevoke] = useState<APIKey | null>(null);

  // Rename state
  const [renamingKeyId, setRenamingKeyId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');

  // Copy feedback tracking
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  const handleCopy = async (keyItem: APIKey) => {
    try {
      await navigator.clipboard.writeText(keyItem.key);
      setCopiedKeyId(keyItem.id);
      setTimeout(() => setCopiedKeyId(null), 2000);
    } catch (e) {
      console.warn('Clipboard copy failed', e);
    }
  };

  const handleStartRename = (k: APIKey) => {
    setRenamingKeyId(k.id);
    setNewName(k.name);
  };

  const handleSaveRename = (kId: string) => {
    if (newName.trim()) {
      renameKey(kId, newName.trim());
    }
    setRenamingKeyId(null);
  };

  // Filter keys
  const filteredKeys = keys.filter((k) => {
    const matchesSearch =
      k.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.maskedKey.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ? true : k.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Sandbox Test Credentials
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              All credentials generated here are designated as <code className="text-teal-300">rai_test_</code> sandbox tokens for local prototype integration. Never use real secrets or Supabase service-role keys in this console.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Key</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keys by label or masked token..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px] uppercase">Filter:</span>
          <div className="flex p-0.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({keys.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'active'
                  ? 'bg-emerald-500/15 text-emerald-400 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Active ({keys.filter((k) => k.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('revoked')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                statusFilter === 'revoked'
                  ? 'bg-rose-500/15 text-rose-400 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Revoked ({keys.filter((k) => k.status === 'revoked').length})
            </button>
          </div>
        </div>
      </div>

      {/* Keys Table */}
      <div className="rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase bg-slate-900/60">
                <th className="py-3 px-4">Key Name</th>
                <th className="py-3 px-4">Credential Token</th>
                <th className="py-3 px-4">Environment</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredKeys.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-mono">
                    No API keys found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredKeys.map((k) => {
                  const isRevoked = k.status === 'revoked';
                  const isRenaming = renamingKeyId === k.id;

                  return (
                    <tr
                      key={k.id}
                      className={`hover:bg-slate-900/40 transition-colors ${
                        isRevoked ? 'opacity-60 bg-slate-950/20' : ''
                      }`}
                    >
                      {/* Name / Rename Input */}
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {isRenaming ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={newName}
                              onChange={(e) => setNewName(e.target.value)}
                              className="px-2 py-1 rounded bg-slate-900 border border-teal-500 text-xs text-white"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveRename(k.id)}
                              className="p-1 rounded bg-teal-500 text-slate-950 text-[10px] font-bold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{k.name}</span>
                            {!isRevoked && (
                              <button
                                onClick={() => handleStartRename(k)}
                                className="text-slate-500 hover:text-slate-300 transition-colors"
                                title="Rename key"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Token Mask */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <code className="text-teal-300 font-bold bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                            {k.maskedKey}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopy(k)}
                            className="p-1 text-slate-400 hover:text-teal-400 transition-colors rounded cursor-pointer"
                            title="Copy masked token string"
                          >
                            {copiedKeyId === k.id ? (
                              <Check className="w-3.5 h-3.5 text-teal-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      {/* Environment */}
                      <td className="py-3.5 px-4 text-slate-300">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700">
                          {k.environment}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {new Date(k.createdAt).toLocaleDateString()}
                      </td>

                      {/* Last used */}
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {k.lastUsedAt
                          ? new Date(k.lastUsedAt).toLocaleString([], {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })
                          : 'Never used'}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            k.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {k.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        {!isRevoked ? (
                          <button
                            onClick={() => setKeyToRevoke(k)}
                            className="px-2.5 py-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-[11px] font-semibold flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Revoke</span>
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">
                            Revoked
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CreateKeyModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateKey={createKey}
      />

      <RevokeKeyModal
        keyToRevoke={keyToRevoke}
        onClose={() => setKeyToRevoke(null)}
        onConfirm={revokeKey}
      />
    </div>
  );
};
