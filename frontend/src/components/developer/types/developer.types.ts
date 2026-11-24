/**
 * Reality AI Developer Portal Types
 * Dedicated to technical platform integration and simulated API services.
 */

export const DEVELOPER_PORTAL_UUID = '357f7440-b983-443a-9a67-a81b92980e09';

export type APIKeyEnvironment = 'Test' | 'Sandbox';

export type APIKeyStatus = 'active' | 'revoked';

export interface APIKey {
  id: string;
  name: string;
  key: string; // Full key (only revealed once at creation)
  maskedKey: string; // e.g. rai_test_••••••••••••e1c4
  prefix: string; // e.g. rai_test_
  createdAt: string;
  lastUsedAt: string | null;
  status: APIKeyStatus;
  environment: APIKeyEnvironment;
  rateLimit: string; // e.g. "60 req/min"
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface APIActivityItem {
  id: string;
  timestamp: string;
  method: HTTPMethod;
  endpoint: string;
  statusCode: number;
  latencyMs: number;
  responseSizeBytes: number;
  ipAddress: string;
  apiKeyPrefix: string;
  requestHeaders?: Record<string, string>;
  queryParams?: Record<string, string>;
  requestBody?: string | null;
  responseBody?: unknown;
}

export interface DeveloperMetric {
  id: string;
  label: string;
  value: string | number;
  subtext: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export interface APIServiceHealth {
  service: string;
  status: 'Operational' | 'Degraded' | 'Maintenance';
  latencyMs: number;
  uptimePercentage: number;
  simulated: true;
}

export interface APIDocParameter {
  name: string;
  in: 'path' | 'query' | 'header' | 'body';
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

export interface APIDocSection {
  id: string;
  title: string;
  category: 'Overview' | 'Endpoints' | 'Guides' | 'Reference';
  method?: HTTPMethod;
  endpoint?: string;
  summary: string;
  description: string;
  parameters?: APIDocParameter[];
  headers?: Record<string, string>;
  requestBodyExample?: string;
  responseExamples: {
    status: number;
    title: string;
    body: unknown;
  }[];
  codeExamples: {
    curl: string;
    javascript: string;
    python: string;
  };
}

export interface PlaygroundRequestState {
  method: HTTPMethod;
  endpoint: string;
  selectedKeyId: string;
  queryParams: Array<{ id: string; key: string; value: string; enabled: boolean }>;
  headers: Array<{ id: string; key: string; value: string; enabled: boolean }>;
  body: string;
  isLoading: boolean;
  response: PlaygroundResponse | null;
}

export interface PlaygroundResponse {
  status: number;
  statusText: string;
  timeMs: number;
  sizeBytes: number;
  headers: Record<string, string>;
  data: unknown;
  timestamp: string;
}
