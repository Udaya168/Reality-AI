import {
  APIKey,
  APIKeyEnvironment,
  APIActivityItem,
  HTTPMethod,
  PlaygroundResponse,
} from '../types/developer.types';
import {
  INITIAL_API_KEYS,
  INITIAL_API_ACTIVITY,
} from '../data/mockDeveloperData';
import { mockProperties } from '../../../data/mockProperties';

const KEYS_STORAGE_KEY = 'reality_ai_dev_api_keys_v1';
const ACTIVITY_STORAGE_KEY = 'reality_ai_dev_activity_logs_v1';

export const mockDeveloperService = {
  /**
   * Retrieve all API Keys from localStorage with default fallbacks
   */
  getKeys(): APIKey[] {
    try {
      const stored = localStorage.getItem(KEYS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[mockDeveloperService] Error reading API keys from storage', e);
    }
    // Initialize defaults on first load
    this.saveKeys(INITIAL_API_KEYS);
    return INITIAL_API_KEYS;
  },

  /**
   * Save API keys to storage
   */
  saveKeys(keys: APIKey[]): void {
    try {
      localStorage.setItem(KEYS_STORAGE_KEY, JSON.stringify(keys));
    } catch (e) {
      console.warn('[mockDeveloperService] Error saving API keys', e);
    }
  },

  /**
   * Create a new temporary test key
   */
  createKey(name: string, environment: APIKeyEnvironment = 'Test'): APIKey {
    // Generate secure random alphanumeric token
    const randomHex = Array.from({ length: 24 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const fullKey = `rai_test_${randomHex}`;
    const lastFour = randomHex.slice(-4);
    const maskedKey = `rai_test_••••••••••••${lastFour}`;

    const newKey: APIKey = {
      id: `key-dev-${Date.now().toString(36)}`,
      name: name.trim() || 'New Test Key',
      key: fullKey,
      maskedKey,
      prefix: 'rai_test_',
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      status: 'active',
      environment,
      rateLimit: '120 req/min',
    };

    const currentKeys = this.getKeys();
    const updated = [newKey, ...currentKeys];
    this.saveKeys(updated);

    return newKey;
  },

  /**
   * Revoke an existing API key
   */
  revokeKey(keyId: string): APIKey[] {
    const keys = this.getKeys();
    const updated = keys.map((k) =>
      k.id === keyId ? { ...k, status: 'revoked' as const } : k
    );
    this.saveKeys(updated);
    return updated;
  },

  /**
   * Rename an existing API key
   */
  renameKey(keyId: string, newName: string): APIKey[] {
    const keys = this.getKeys();
    const updated = keys.map((k) =>
      k.id === keyId ? { ...k, name: newName.trim() || k.name } : k
    );
    this.saveKeys(updated);
    return updated;
  },

  /**
   * Retrieve simulated activity log
   */
  getActivity(): APIActivityItem[] {
    try {
      const stored = localStorage.getItem(ACTIVITY_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('[mockDeveloperService] Error reading activity logs', e);
    }
    this.saveActivity(INITIAL_API_ACTIVITY);
    return INITIAL_API_ACTIVITY;
  },

  /**
   * Save activity logs to storage
   */
  saveActivity(items: APIActivityItem[]): void {
    try {
      localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('[mockDeveloperService] Error saving activity logs', e);
    }
  },

  /**
   * Record new activity entry
   */
  recordActivity(item: Omit<APIActivityItem, 'id' | 'timestamp'>): APIActivityItem {
    const current = this.getActivity();
    const newItem: APIActivityItem = {
      ...item,
      id: `act-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
    };
    const updated = [newItem, ...current.slice(0, 99)]; // Keep latest 100
    this.saveActivity(updated);
    return newItem;
  },

  /**
   * Clear all activity logs
   */
  clearActivity(): void {
    this.saveActivity([]);
  },

  /**
   * Reset activity to default sample set
   */
  resetActivityToDefault(): APIActivityItem[] {
    this.saveActivity(INITIAL_API_ACTIVITY);
    return INITIAL_API_ACTIVITY;
  },

  /**
   * Execute simulated request from Playground
   */
  async executePlaygroundRequest(
    method: HTTPMethod,
    pathOrUrl: string,
    queryParams: Record<string, string>,
    headers: Record<string, string>,
    _body?: string
  ): Promise<PlaygroundResponse> {
    const startTime = performance.now();

    // Simulated network transit delay (80ms - 240ms)
    const simulatedTransitMs = Math.floor(80 + Math.random() * 160);
    await new Promise((r) => setTimeout(r, simulatedTransitMs));

    // Normalize path
    let normalizedPath = pathOrUrl.trim();
    if (normalizedPath.startsWith('https://api.realityai.example')) {
      normalizedPath = normalizedPath.replace('https://api.realityai.example', '');
    }
    if (normalizedPath.includes('?')) {
      normalizedPath = normalizedPath.split('?')[0];
    }
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = `/${normalizedPath}`;
    }

    // Check authorization header
    const authHeader = Object.entries(headers).find(
      ([k]) => k.toLowerCase() === 'authorization'
    )?.[1];

    if (!authHeader || !authHeader.startsWith('Bearer rai_test_')) {
      const duration = Math.round(performance.now() - startTime);
      const respData = {
        error: 'Unauthorized: Missing or malformed Bearer test key.',
        code: 'INVALID_CREDENTIALS',
        status: 401,
        hint: 'Provide header: Authorization: Bearer rai_test_<your_token>',
      };

      const response: PlaygroundResponse = {
        status: 401,
        statusText: 'Unauthorized',
        timeMs: duration,
        sizeBytes: JSON.stringify(respData).length,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'x-reality-gateway': 'RealityAI-Sandbox-v1',
          'x-ratelimit-limit': '120',
          'x-ratelimit-remaining': '119',
        },
        data: respData,
        timestamp: new Date().toISOString(),
      };

      this.recordActivity({
        method,
        endpoint: normalizedPath,
        statusCode: 401,
        latencyMs: duration,
        responseSizeBytes: response.sizeBytes,
        ipAddress: '127.0.0.1 (Local Dev)',
        apiKeyPrefix: 'unauthenticated',
        queryParams,
        responseBody: respData,
      });

      return response;
    }

    // Extract prefix
    const activeKeyPrefix = authHeader.replace('Bearer ', '').slice(0, 12);

    let status = 200;
    let statusText = 'OK';
    let responseData: unknown = null;

    // 1. Endpoint: /api/v1/properties/:id
    if (normalizedPath.startsWith('/api/v1/properties/') && normalizedPath.length > 19) {
      const propId = normalizedPath.replace('/api/v1/properties/', '');
      const match = mockProperties.find((p) => p.id === propId);

      if (match) {
        status = 200;
        statusText = 'OK';
        responseData = {
          status: 'success',
          data: match,
        };
      } else {
        status = 404;
        statusText = 'Not Found';
        responseData = {
          error: `Property with identifier '${propId}' not found in registry.`,
          code: 'PROPERTY_NOT_FOUND',
          status: 404,
        };
      }
    }
    // 2. Endpoint: /api/v1/properties
    else if (normalizedPath === '/api/v1/properties') {
      let filtered = [...mockProperties];

      if (queryParams.city) {
        filtered = filtered.filter((p) =>
          p.location.city.toLowerCase().includes(queryParams.city.toLowerCase())
        );
      }
      if (queryParams.category) {
        filtered = filtered.filter((p) =>
          p.category.toLowerCase() === queryParams.category.toLowerCase()
        );
      }
      if (queryParams.minPrice) {
        const min = Number(queryParams.minPrice);
        if (!isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
      }
      if (queryParams.maxPrice) {
        const max = Number(queryParams.maxPrice);
        if (!isNaN(max)) filtered = filtered.filter((p) => p.price <= max);
      }

      // Check for intentional bad request parameter testing
      if (queryParams.limit && Number(queryParams.limit) <= 0) {
        status = 400;
        statusText = 'Bad Request';
        responseData = {
          error: 'Limit must be a positive integer greater than 0',
          code: 'INVALID_QUERY_PARAMETER',
          status: 400,
        };
      } else {
        const limit = Number(queryParams.limit) || 20;
        const page = Number(queryParams.page) || 1;
        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + limit);

        responseData = {
          status: 'success',
          total: filtered.length,
          page,
          limit,
          data: paginated,
        };
      }
    }
    // 3. Endpoint: /api/v1/locations
    else if (normalizedPath === '/api/v1/locations') {
      responseData = {
        status: 'success',
        region: 'Karnataka',
        cities: [
          { name: 'Bengaluru', activeProperties: 14, primeZones: ['Sadashivanagar', 'Indiranagar', 'Lavelle Road'] },
          { name: 'Mysuru', activeProperties: 4, primeZones: ['Yadavagiri', 'Gokulam'] },
          { name: 'Chikmagalur', activeProperties: 3, primeZones: ['Coffee Belt', 'Mullayanagiri Foothills'] },
          { name: 'Coorg', activeProperties: 3, primeZones: ['Madikeri', 'Virajpet'] },
        ],
      };
    }
    // 4. Endpoint: /api/v1/property-types
    else if (normalizedPath === '/api/v1/property-types') {
      responseData = {
        status: 'success',
        types: [
          { code: 'villa', label: 'Villa & Courtyard Residence', totalActive: 9 },
          { code: 'apartment', label: 'Apartment & Penthouse', totalActive: 5 },
          { code: 'residential', label: 'Residential Estate', totalActive: 6 },
          { code: 'plot', label: 'Residential Land', totalActive: 2 },
          { code: 'commercial', label: 'Commercial Atelier', totalActive: 2 },
        ],
      };
    }
    // Fallback unmapped route
    else {
      status = 404;
      statusText = 'Not Found';
      responseData = {
        error: `Endpoint '${normalizedPath}' does not exist on the Reality AI Sandbox Gateway.`,
        code: 'ENDPOINT_NOT_FOUND',
        status: 404,
        availableEndpoints: [
          '/api/v1/properties',
          '/api/v1/properties/:id',
          '/api/v1/locations',
          '/api/v1/property-types',
        ],
      };
    }

    const duration = Math.round(performance.now() - startTime);
    const size = JSON.stringify(responseData).length;

    const response: PlaygroundResponse = {
      status,
      statusText,
      timeMs: duration,
      sizeBytes: size,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'x-reality-gateway': 'RealityAI-Sandbox-v1',
        'x-ratelimit-limit': '120',
        'x-ratelimit-remaining': '118',
        'x-response-time': `${duration}ms`,
        server: 'RealityAI-Sandbox-Gateway',
      },
      data: responseData,
      timestamp: new Date().toISOString(),
    };

    // Auto-record to Developer Activity history
    this.recordActivity({
      method,
      endpoint: normalizedPath,
      statusCode: status,
      latencyMs: duration,
      responseSizeBytes: size,
      ipAddress: '127.0.0.1 (Playground)',
      apiKeyPrefix: activeKeyPrefix,
      queryParams,
      responseBody: responseData,
    });

    return response;
  },
};
