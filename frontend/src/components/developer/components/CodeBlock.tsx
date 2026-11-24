import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'bash',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  return (
    <div
      className={`relative rounded-xl border border-slate-700/70 bg-[#0B132B] font-mono text-xs overflow-hidden shadow-inner group ${className}`}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/80 border-b border-slate-800 text-[11px] text-slate-400">
        <span className="uppercase tracking-widest text-[10px] text-teal-400 font-semibold">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-[10px] text-teal-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-slate-200 leading-relaxed font-mono whitespace-pre">
        <code>{code}</code>
      </div>
    </div>
  );
};
