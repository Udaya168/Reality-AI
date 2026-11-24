import React, { useState } from 'react';
import {
  Terminal,
  Send,
  Plus,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useDeveloper } from '../hooks/useDeveloper';
import { HTTPMethod, PlaygroundResponse } from '../types/developer.types';
import { mockDeveloperService } from '../services/mockDeveloperService';
import { CodeBlock } from '../components/CodeBlock';

interface ParamRow {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

const PRESET_ENDPOINTS = [
  { label: 'List Properties', method: 'GET' as HTTPMethod, path: '/api/v1/properties', params: [{ id: 'p1', key: 'city', value: 'Bengaluru', enabled: true }, { id: 'p2', key: 'category', value: 'villa', enabled: true }] },
  { label: 'Get Property Details', method: 'GET' as HTTPMethod, path: '/api/v1/properties/prop-1', params: [] },
  { label: 'List Locations', method: 'GET' as HTTPMethod, path: '/api/v1/locations', params: [] },
  { label: 'List Property Types', method: 'GET' as HTTPMethod, path: '/api/v1/property-types', params: [] },
  { label: 'Test 404 Error (Non-existent)', method: 'GET' as HTTPMethod, path: '/api/v1/properties/unknown-id', params: [] },
  { label: 'Test 400 Bad Request', method: 'GET' as HTTPMethod, path: '/api/v1/properties', params: [{ id: 'p3', key: 'limit', value: '-1', enabled: true }] },
];

export const APIPlayground: React.FC = () => {
  const { keys } = useDeveloper();

  const [method, setMethod] = useState<HTTPMethod>('GET');
  const [endpoint, setEndpoint] = useState('/api/v1/properties');
  const [selectedKeyId, setSelectedKeyId] = useState<string>(keys[0]?.id || '');
  const [customToken, setCustomToken] = useState('');

  // Request Builders
  const [activeTab, setActiveTab] = useState<'params' | 'headers'>('params');
  const [queryParams, setQueryParams] = useState<ParamRow[]>([
    { id: '1', key: 'city', value: 'Bengaluru', enabled: true },
    { id: '2', key: 'category', value: 'villa', enabled: true },
  ]);
  const [headers, setHeaders] = useState<ParamRow[]>([
    { id: 'h1', key: 'Accept', value: 'application/json', enabled: true },
  ]);

  // Execution states
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<PlaygroundResponse | null>(null);
  const [responseTab, setResponseTab] = useState<'body' | 'headers'>('body');

  // Handle Preset selection
  const handleSelectPreset = (preset: typeof PRESET_ENDPOINTS[0]) => {
    setMethod(preset.method);
    setEndpoint(preset.path);
    setQueryParams(preset.params);
  };

  // Add / Remove Rows
  const addQueryParam = () => {
    setQueryParams([...queryParams, { id: String(Date.now()), key: '', value: '', enabled: true }]);
  };

  const removeQueryParam = (id: string) => {
    setQueryParams(queryParams.filter((p) => p.id !== id));
  };

  const toggleQueryParam = (id: string) => {
    setQueryParams(queryParams.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)));
  };

  // Execute Simulated Request
  const handleSendRequest = async () => {
    setIsLoading(true);

    // Build params object
    const paramsMap: Record<string, string> = {};
    queryParams
      .filter((p) => p.enabled && p.key.trim())
      .forEach((p) => {
        paramsMap[p.key.trim()] = p.value.trim();
      });

    // Build headers object
    const headersMap: Record<string, string> = {};
    headers
      .filter((h) => h.enabled && h.key.trim())
      .forEach((h) => {
        headersMap[h.key.trim()] = h.value.trim();
      });

    // Attach Bearer token from selected key or custom input
    const selectedKey = keys.find((k) => k.id === selectedKeyId);
    const tokenToUse = customToken.trim() || selectedKey?.key || 'rai_test_default_token';
    headersMap['Authorization'] = `Bearer ${tokenToUse}`;

    try {
      const resp = await mockDeveloperService.executePlaygroundRequest(
        method,
        endpoint,
        paramsMap,
        headersMap
      );
      setResponse(resp);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Instructions */}
      <div className="p-4 rounded-2xl bg-[#0F172A] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-mono font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-teal-400" />
            <span>Interactive API Playground</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Execute live simulated queries against the sandbox property catalog and inspect status codes, headers, and payloads.
          </p>
        </div>

        {/* Preset Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono uppercase text-slate-400">Sample Query:</span>
          <select
            onChange={(e) => {
              const match = PRESET_ENDPOINTS.find((p) => p.label === e.target.value);
              if (match) handleSelectPreset(match);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-teal-300 focus:outline-none focus:border-teal-500 cursor-pointer"
          >
            {PRESET_ENDPOINTS.map((preset) => (
              <option key={preset.label} value={preset.label}>
                {preset.label} ({preset.method} {preset.path})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Request Builder Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Method Selector */}
          <div className="w-28 shrink-0">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as HTTPMethod)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-teal-400 focus:outline-none focus:border-teal-500"
            >
              <option value="GET">GET</option>
              <option value="POST">POST (Mock)</option>
              <option value="PUT">PUT (Mock)</option>
              <option value="DELETE">DELETE (Mock)</option>
            </select>
          </div>

          {/* Endpoint Input */}
          <div className="flex-1 min-w-[240px] flex items-center rounded-xl bg-slate-900 border border-slate-700 px-3 py-1 font-mono text-xs">
            <span className="text-slate-500 select-none hidden sm:inline mr-1">
              https://api.realityai.example
            </span>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full bg-transparent py-1.5 text-teal-300 focus:outline-none font-semibold"
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSendRequest}
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-teal-500/10 disabled:opacity-50 cursor-pointer shrink-0"
          >
            {isLoading ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send</span>
              </>
            )}
          </button>
        </div>

        {/* Authentication Key Selector */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px] uppercase">Active Credential:</span>
            <select
              value={selectedKeyId}
              onChange={(e) => setSelectedKeyId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              {keys.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.name} ({k.maskedKey}) — {k.status}
                </option>
              ))}
            </select>
          </div>

          <span className="text-[11px] text-slate-400">
            Authorization: <code className="text-teal-400">Bearer rai_test_••••••••</code>
          </span>
        </div>
      </div>

      {/* Two Columns: Request Config (Left) & Live Response (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Request Tabs (Span 5) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4">
          <div className="flex border-b border-slate-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('params')}
              className={`px-4 py-2 border-b-2 font-semibold transition-colors cursor-pointer ${
                activeTab === 'params'
                  ? 'border-teal-500 text-teal-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Parameters ({queryParams.filter((p) => p.enabled && p.key).length})
            </button>
            <button
              onClick={() => setActiveTab('headers')}
              className={`px-4 py-2 border-b-2 font-semibold transition-colors cursor-pointer ${
                activeTab === 'headers'
                  ? 'border-teal-500 text-teal-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Headers ({headers.filter((h) => h.enabled && h.key).length})
            </button>
          </div>

          {/* Parameters Tab */}
          {activeTab === 'params' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Query Key-Value Pairs</span>
                <button
                  type="button"
                  onClick={addQueryParam}
                  className="flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Row</span>
                </button>
              </div>

              <div className="space-y-2">
                {queryParams.map((param) => (
                  <div key={param.id} className="flex items-center gap-2 font-mono text-xs">
                    <input
                      type="checkbox"
                      checked={param.enabled}
                      onChange={() => toggleQueryParam(param.id)}
                      className="rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500 cursor-pointer"
                    />
                    <input
                      type="text"
                      placeholder="key"
                      value={param.key}
                      onChange={(e) => {
                        const val = e.target.value;
                        setQueryParams(queryParams.map((p) => (p.id === param.id ? { ...p, key: val } : p)));
                      }}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                    />
                    <input
                      type="text"
                      placeholder="value"
                      value={param.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        setQueryParams(queryParams.map((p) => (p.id === param.id ? { ...p, value: val } : p)));
                      }}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeQueryParam(param.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Headers Tab */}
          {activeTab === 'headers' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-[11px]">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-teal-400">Authorization:</span>
                  <span className="truncate max-w-[200px]">Bearer rai_test_••••••••</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-teal-400">Accept:</span>
                  <span>application/json</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Response Viewer (Span 7) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 min-h-[460px] flex flex-col justify-between">
          <div>
            {/* Response Status Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Response
                </span>
                {response && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                      response.status === 200
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : response.status === 404
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {response.status} {response.statusText}
                  </span>
                )}
              </div>

              {response && (
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>Time: <strong className="text-teal-400">{response.timeMs}ms</strong></span>
                  <span>Size: <strong className="text-teal-400">{response.sizeBytes} B</strong></span>
                </div>
              )}
            </div>

            {/* Response Body or Placeholder */}
            <div className="pt-4">
              {response ? (
                <CodeBlock
                  language="json"
                  code={JSON.stringify(response.data, null, 2)}
                  className="max-h-[380px]"
                />
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-800 rounded-xl space-y-2 text-slate-400 font-mono">
                  <Terminal className="w-8 h-8 text-teal-500/40" />
                  <span className="text-xs text-slate-300">No request sent yet</span>
                  <p className="text-[11px] text-slate-400 max-w-sm">
                    Configure your query parameters or select a preset above, then click <strong>Send</strong> to execute the simulation.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Response Disclaimer */}
          <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>Server: RealityAI-Sandbox-Gateway</span>
            <span className="text-teal-400">Simulated Execution Active</span>
          </div>
        </div>

      </div>
    </div>
  );
};
