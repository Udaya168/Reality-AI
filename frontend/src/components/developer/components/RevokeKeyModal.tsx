import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { APIKey } from '../types/developer.types';

interface RevokeKeyModalProps {
  keyToRevoke: APIKey | null;
  onClose: () => void;
  onConfirm: (keyId: string) => void;
}

export const RevokeKeyModal: React.FC<RevokeKeyModalProps> = ({
  keyToRevoke,
  onClose,
  onConfirm,
}) => {
  if (!keyToRevoke) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-[#0F172A] border border-rose-500/30 rounded-2xl shadow-2xl p-6 text-slate-200 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-rose-400 font-mono font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Revoke API Key</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-4 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Are you sure you want to revoke the key{' '}
            <strong className="text-white font-mono">{keyToRevoke.name}</strong> (
            <code className="text-rose-300">{keyToRevoke.maskedKey}</code>)?
          </p>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] leading-relaxed">
            Any sandbox scripts or playground queries using this key will immediately receive <strong>401 Unauthorized</strong> errors. This action cannot be undone.
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm(keyToRevoke.id);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              Revoke Immediately
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
