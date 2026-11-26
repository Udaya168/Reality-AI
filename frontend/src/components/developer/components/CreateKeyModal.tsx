import React, { useState } from 'react';
import { X, Copy, Check, AlertTriangle, Key, ShieldAlert } from 'lucide-react';
import { APIKey, APIKeyEnvironment } from '../types/developer.types';

interface CreateKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateKey: (name: string, environment: APIKeyEnvironment) => APIKey;
}

export const CreateKeyModal: React.FC<CreateKeyModalProps> = ({
  isOpen,
  onClose,
  onCreateKey,
}) => {
  const [keyName, setKeyName] = useState('');
  const [environment, setEnvironment] = useState<APIKeyEnvironment>('Test');
  const [generatedKey, setGeneratedKey] = useState<APIKey | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) return;
    const newKey = onCreateKey(keyName, environment);
    setGeneratedKey(newKey);
  };

  const handleCopy = async () => {
    if (!generatedKey) return;
    try {
      await navigator.clipboard.writeText(generatedKey.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard copy failed', e);
    }
  };

  const handleClose = () => {
    setKeyName('');
    setGeneratedKey(null);
    setCopied(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#0F172A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-7 text-slate-200 z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-white leading-tight">
                {generatedKey ? 'API Key Generated' : 'Generate New Test Key'}
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Reality AI Sandbox Credentials
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {generatedKey ? (
          <div className="pt-5 space-y-5">
            {/* Warning Banner */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div className="space-y-1">
                <span className="font-semibold block text-amber-200">
                  Save your key securely now
                </span>
                <p className="text-[11px] text-amber-300/90 leading-relaxed">
                  For security, this complete credential will only be displayed once. After closing this dialog, only masked characters will be visible in the console.
                </p>
              </div>
            </div>

            {/* Generated Key Box */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Sandbox API Key ({generatedKey.name})
              </label>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#102B46]/85 border border-white/10 font-mono text-xs text-teal-300 break-all select-all">
                <span className="flex-1 font-semibold">{generatedKey.key}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-teal-400 shrink-0" />
              <span>DEMO CREDENTIAL — NOT VALID FOR PRODUCTION API ACCESS</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="pt-5 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Key Label / Description *
              </label>
              <input
                type="text"
                required
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g. Mobile App Prototype or CLI Tool"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                Target Environment
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setEnvironment('Test')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    environment === 'Test'
                      ? 'border-teal-500 bg-teal-500/10 text-teal-300 ring-1 ring-teal-500'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-mono text-xs font-bold block">Sandbox Test</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    120 requests/min quota
                  </span>
                </button>

                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-400 opacity-60 cursor-not-allowed">
                  <span className="font-mono text-xs font-bold block">Production Live</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Requires partner approval
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-mono">
              Keys are prefixed with <code className="text-teal-400">rai_test_</code> and execute against simulated endpoints in this prototype environment.
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-xs font-bold transition-colors cursor-pointer shadow-md shadow-teal-500/10"
              >
                Create Key
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
