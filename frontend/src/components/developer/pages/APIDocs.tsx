import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Key,
  Terminal,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Hash,
} from 'lucide-react';
import { MOCK_API_DOCS } from '../data/mockDeveloperData';
import { CodeBlock } from '../components/CodeBlock';
import { APIDocSection } from '../types/developer.types';

export const APIDocs: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const [codeLanguage, setCodeLanguage] = useState<'curl' | 'javascript' | 'python'>('curl');

  // Filter sections by search query
  const filteredDocs = MOCK_API_DOCS.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.endpoint?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDoc: APIDocSection =
    MOCK_API_DOCS.find((d) => d.id === activeSectionId) || MOCK_API_DOCS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-400"></span>
          <span>API Specification: Reality AI Architectural Discovery Protocol v1 (Sandbox Draft)</span>
        </div>
        <span className="text-[11px] text-teal-400">Base URL: https://api.realityai.example/v1</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Docs Navigation (Span 4) */}
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search endpoints, parameters..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>

          {/* Section List */}
          <div className="p-3 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredDocs.map((doc) => {
              const isActive = doc.id === activeSectionId;
              return (
                <button
                  key={doc.id}
                  onClick={() => setActiveSectionId(doc.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between text-xs font-mono cursor-pointer ${
                    isActive
                      ? 'bg-teal-500/15 text-teal-400 font-bold border border-teal-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {doc.method ? (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-teal-300 border border-slate-700 shrink-0">
                        {doc.method}
                      </span>
                    ) : (
                      <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span className="truncate">{doc.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isActive ? 'text-teal-400 translate-x-0.5' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Documentation Content (Span 8) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-8">
          
          {/* Header */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {activeDoc.category}
              </span>
              {activeDoc.method && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30">
                  {activeDoc.method}
                </span>
              )}
            </div>

            <h2 className="text-2xl font-mono font-bold text-white tracking-tight">
              {activeDoc.title}
            </h2>

            {activeDoc.endpoint && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-teal-300">
                <span className="text-slate-400">Endpoint:</span>
                <code>{activeDoc.endpoint}</code>
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed font-sans pt-1">
              {activeDoc.description}
            </p>
          </div>

          {/* Parameters Table (if endpoint) */}
          {activeDoc.parameters && activeDoc.parameters.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Query &amp; Path Parameters
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase bg-slate-900">
                      <th className="py-2.5 px-3">Parameter</th>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Location</th>
                      <th className="py-2.5 px-3">Required</th>
                      <th className="py-2.5 px-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {activeDoc.parameters.map((param) => (
                      <tr key={param.name} className="hover:bg-slate-900/80">
                        <td className="py-2.5 px-3 font-bold text-teal-400">{param.name}</td>
                        <td className="py-2.5 px-3 text-slate-300">{param.type}</td>
                        <td className="py-2.5 px-3 text-slate-400">{param.in}</td>
                        <td className="py-2.5 px-3">
                          {param.required ? (
                            <span className="text-rose-400 font-bold">Yes</span>
                          ) : (
                            <span className="text-slate-400">Optional</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-300 font-sans text-xs">
                          {param.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Multi-Language Code Snippets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Code Snippets &amp; Request
              </h3>

              {/* Language Selector */}
              <div className="flex p-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono">
                <button
                  onClick={() => setCodeLanguage('curl')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    codeLanguage === 'curl'
                      ? 'bg-teal-500/20 text-teal-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setCodeLanguage('javascript')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    codeLanguage === 'javascript'
                      ? 'bg-teal-500/20 text-teal-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setCodeLanguage('python')}
                  className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                    codeLanguage === 'python'
                      ? 'bg-teal-500/20 text-teal-300 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Python
                </button>
              </div>
            </div>

            <CodeBlock
              language={codeLanguage}
              code={activeDoc.codeExamples[codeLanguage]}
            />
          </div>

          {/* Response Schema Examples */}
          {activeDoc.responseExamples.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Sample JSON Responses
              </h3>
              {activeDoc.responseExamples.map((resp) => (
                <div key={resp.title} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        resp.status === 200
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {resp.status}
                    </span>
                    <span className="text-xs font-mono text-slate-300">{resp.title}</span>
                  </div>
                  <CodeBlock
                    language="json"
                    code={JSON.stringify(resp.body, null, 2)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Sandbox Disclaimer Box */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div className="space-y-1 font-sans">
              <span className="font-semibold text-slate-300 block font-mono text-[11px]">
                Illustrative Prototype Sandbox
              </span>
              <p className="text-[11px] leading-relaxed">
                All endpoints, query responses, and rate limits listed here are illustrative prototypes for the Reality AI architectural data model. Use the interactive <strong>API Playground</strong> to test and execute live simulated responses.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
