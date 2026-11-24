import {
  APIKey,
  APIActivityItem,
  APIServiceHealth,
  APIDocSection,
  DEVELOPER_PORTAL_UUID,
} from '../types/developer.types';
import { mockProperties } from '../../../data/mockProperties';

export { DEVELOPER_PORTAL_UUID };

export const INITIAL_API_KEYS: APIKey[] = [
  {
    id: 'key-dev-01',
    name: 'Default Sandbox Key',
    key: 'rai_test_8f29e1c4a03b6845d09f7a1b',
    maskedKey: 'rai_test_••••••••••••7a1b',
    prefix: 'rai_test_',
    createdAt: '2026-11-10T09:30:00Z',
    lastUsedAt: '2026-11-24T18:14:00Z',
    status: 'active',
    environment: 'Test',
    rateLimit: '120 req/min',
  },
  {
    id: 'key-dev-02',
    name: 'Portal Test Client',
    key: 'rai_test_41c098df23a7bb91e309cc48',
    maskedKey: 'rai_test_••••••••••••cc48',
    prefix: 'rai_test_',
    createdAt: '2026-11-18T14:22:00Z',
    lastUsedAt: '2026-11-23T11:05:00Z',
    status: 'active',
    environment: 'Test',
    rateLimit: '60 req/min',
  },
  {
    id: 'key-dev-03',
    name: 'Legacy Integration Token',
    key: 'rai_test_99a4c810fb82a034d6182ef0',
    maskedKey: 'rai_test_••••••••••••2ef0',
    prefix: 'rai_test_',
    createdAt: '2026-10-01T12:00:00Z',
    lastUsedAt: '2026-11-05T08:12:00Z',
    status: 'revoked',
    environment: 'Test',
    rateLimit: '60 req/min',
  },
];

export const MOCK_API_HEALTH: APIServiceHealth[] = [
  {
    service: 'Properties API',
    status: 'Operational',
    latencyMs: 142,
    uptimePercentage: 99.98,
    simulated: true,
  },
  {
    service: 'Locations API',
    status: 'Operational',
    latencyMs: 88,
    uptimePercentage: 100.0,
    simulated: true,
  },
  {
    service: 'Property Types API',
    status: 'Operational',
    latencyMs: 76,
    uptimePercentage: 99.95,
    simulated: true,
  },
  {
    service: 'Vector Search Grid',
    status: 'Operational',
    latencyMs: 184,
    uptimePercentage: 99.91,
    simulated: true,
  },
];

export const INITIAL_API_ACTIVITY: APIActivityItem[] = [
  {
    id: 'act-101',
    timestamp: '2026-11-24T18:24:10Z',
    method: 'GET',
    endpoint: '/api/v1/properties',
    statusCode: 200,
    latencyMs: 128,
    responseSizeBytes: 4218,
    ipAddress: '106.51.240.12',
    apiKeyPrefix: 'rai_test_',
    queryParams: { limit: '6', category: 'villa' },
    responseBody: { count: 6, total: 24, status: 'success' },
  },
  {
    id: 'act-102',
    timestamp: '2026-11-24T18:20:45Z',
    method: 'GET',
    endpoint: '/api/v1/properties/prop-1',
    statusCode: 200,
    latencyMs: 94,
    responseSizeBytes: 1840,
    ipAddress: '106.51.240.12',
    apiKeyPrefix: 'rai_test_',
    queryParams: {},
    responseBody: { id: 'prop-1', title: 'The Courtyard Villa at Sadashivanagar', status: 'success' },
  },
  {
    id: 'act-103',
    timestamp: '2026-11-24T18:18:02Z',
    method: 'GET',
    endpoint: '/api/v1/locations',
    statusCode: 200,
    latencyMs: 76,
    responseSizeBytes: 980,
    ipAddress: '49.207.211.8',
    apiKeyPrefix: 'rai_test_',
    queryParams: { region: 'karnataka' },
    responseBody: { regions: ['Bengaluru', 'Mysuru', 'Chikmagalur', 'Coorg'] },
  },
  {
    id: 'act-104',
    timestamp: '2026-11-24T18:12:15Z',
    method: 'GET',
    endpoint: '/api/v1/properties/prop-999',
    statusCode: 404,
    latencyMs: 64,
    responseSizeBytes: 164,
    ipAddress: '49.207.211.8',
    apiKeyPrefix: 'rai_test_',
    queryParams: {},
    responseBody: { error: 'Property not found', code: 'PROPERTY_NOT_FOUND', status: 404 },
  },
  {
    id: 'act-105',
    timestamp: '2026-11-24T18:05:30Z',
    method: 'GET',
    endpoint: '/api/v1/property-types',
    statusCode: 200,
    latencyMs: 82,
    responseSizeBytes: 820,
    ipAddress: '106.51.240.12',
    apiKeyPrefix: 'rai_test_',
    queryParams: {},
    responseBody: { types: ['Residential', 'Villa', 'Apartment', 'Plot/Land', 'Commercial'] },
  },
  {
    id: 'act-106',
    timestamp: '2026-11-24T17:48:19Z',
    method: 'GET',
    endpoint: '/api/v1/properties',
    statusCode: 200,
    latencyMs: 145,
    responseSizeBytes: 5120,
    ipAddress: '14.143.161.22',
    apiKeyPrefix: 'rai_test_',
    queryParams: { city: 'Bengaluru' },
    responseBody: { count: 8, total: 24, status: 'success' },
  },
  {
    id: 'act-107',
    timestamp: '2026-11-24T17:35:42Z',
    method: 'GET',
    endpoint: '/api/v1/properties?limit=-1',
    statusCode: 400,
    latencyMs: 52,
    responseSizeBytes: 198,
    ipAddress: '14.143.161.22',
    apiKeyPrefix: 'rai_test_',
    queryParams: { limit: '-1' },
    responseBody: { error: 'Invalid limit parameter. Limit must be between 1 and 100.', code: 'INVALID_QUERY_PARAMETER', status: 400 },
  },
  {
    id: 'act-108',
    timestamp: '2026-11-24T17:15:00Z',
    method: 'GET',
    endpoint: '/api/v1/properties/prop-2',
    statusCode: 200,
    latencyMs: 104,
    responseSizeBytes: 1910,
    ipAddress: '106.51.240.12',
    apiKeyPrefix: 'rai_test_',
    queryParams: {},
    responseBody: { id: 'prop-2', title: 'The Glass Pavilion Penthouse', status: 'success' },
  },
];

export const MOCK_API_DOCS: APIDocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    category: 'Overview',
    summary: 'Architectural Real Estate Intelligence API overview and technical foundations.',
    description: `The Reality AI Platform provides programmatic access to curated architectural estates, location demographics, and spatial property metadata across Karnataka.
    
All requests are served over HTTPS. Responses are JSON-formatted with UTF-8 encoding. This platform is currently running in **SANDBOX MODE** for developer testing and integration prototyping.`,
    responseExamples: [],
    codeExamples: {
      curl: `# Reality AI API Base URL (Sandbox)
https://api.realityai.example/v1`,
      javascript: `// SDK Initialization example
import { RealityAI } from '@realityai/client';

const client = new RealityAI({
  apiKey: 'rai_test_your_demo_key',
  environment: 'sandbox'
});`,
      python: `# Python SDK Initialization
from realityai import RealityAI

client = RealityAI(
    api_key="rai_test_your_demo_key",
    environment="sandbox"
)`,
    },
  },
  {
    id: 'authentication',
    title: 'Authentication',
    category: 'Overview',
    summary: 'Authenticate requests using Bearer demo tokens generated in the Developer Console.',
    description: `Authenticate your API requests by including your secret API key in the standard \`Authorization\` header prefixed with \`Bearer\`.

Test credentials always use the \`rai_test_\` prefix. Keep your keys confidential. In production, never expose keys in client-side code repositories.`,
    headers: {
      Authorization: 'Bearer rai_test_your_demo_key',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    responseExamples: [
      {
        status: 401,
        title: '401 Unauthorized',
        body: {
          error: 'Missing or invalid authentication credentials',
          code: 'UNAUTHORIZED',
          status: 401,
          hint: 'Ensure header format is Authorization: Bearer rai_test_...',
        },
      },
    ],
    codeExamples: {
      curl: `curl -X GET "https://api.realityai.example/v1/properties" \\
  -H "Authorization: Bearer rai_test_your_demo_key" \\
  -H "Accept: application/json"`,
      javascript: `const response = await fetch("https://api.realityai.example/v1/properties", {
  headers: {
    "Authorization": "Bearer rai_test_your_demo_key",
    "Accept": "application/json"
  }
});
const data = await response.json();`,
      python: `import requests

headers = {
    "Authorization": "Bearer rai_test_your_demo_key",
    "Accept": "application/json"
}
response = requests.get("https://api.realityai.example/v1/properties", headers=headers)
data = response.json()`,
    },
  },
  {
    id: 'get-properties',
    title: 'List Properties',
    category: 'Endpoints',
    method: 'GET',
    endpoint: '/api/v1/properties',
    summary: 'Retrieve a paginated, filterable collection of curated architectural residences.',
    description: 'Returns an array of architectural properties matching the specified query filters such as city, category, price range, and bedroom count.',
    parameters: [
      { name: 'city', in: 'query', type: 'string', required: false, description: 'Filter by city (e.g. Bengaluru, Mysuru)' },
      { name: 'category', in: 'query', type: 'string', required: false, description: 'Typology: villa, apartment, commercial, plot' },
      { name: 'minPrice', in: 'query', type: 'number', required: false, description: 'Minimum price filter in INR' },
      { name: 'maxPrice', in: 'query', type: 'number', required: false, description: 'Maximum price filter in INR' },
      { name: 'limit', in: 'query', type: 'integer', required: false, description: 'Number of results to return (1-100, default: 20)' },
      { name: 'page', in: 'query', type: 'integer', required: false, description: 'Page index for pagination (default: 1)' },
    ],
    responseExamples: [
      {
        status: 200,
        title: '200 OK (Properties List)',
        body: {
          status: 'success',
          total: 24,
          page: 1,
          limit: 2,
          data: [
            {
              id: 'prop-1',
              title: 'The Courtyard Villa at Sadashivanagar',
              category: 'villa',
              price: 185000000,
              priceDisplay: '₹18.5 Cr',
              location: {
                locality: 'Sadashivanagar',
                city: 'Bengaluru',
                state: 'Karnataka',
                pincode: '560080',
              },
              features: {
                areaSqFt: 6200,
                bedrooms: 4,
                bathrooms: 5,
                facing: 'East',
              },
              verified: true,
            },
            {
              id: 'prop-2',
              title: 'The Glass Pavilion Penthouse',
              category: 'apartment',
              price: 122000000,
              priceDisplay: '₹12.2 Cr',
              location: {
                locality: 'Indiranagar',
                city: 'Bengaluru',
                state: 'Karnataka',
                pincode: '560038',
              },
              features: {
                areaSqFt: 4800,
                bedrooms: 4,
                bathrooms: 4,
                facing: 'North-East',
              },
              verified: true,
            },
          ],
        },
      },
    ],
    codeExamples: {
      curl: `curl -X GET "https://api.realityai.example/v1/properties?city=Bengaluru&category=villa&limit=10" \\
  -H "Authorization: Bearer rai_test_your_demo_key"`,
      javascript: `const url = new URL("https://api.realityai.example/v1/properties");
url.searchParams.set("city", "Bengaluru");
url.searchParams.set("category", "villa");

const res = await fetch(url, {
  headers: { "Authorization": "Bearer rai_test_your_demo_key" }
});
const properties = await res.json();`,
      python: `import requests

params = {"city": "Bengaluru", "category": "villa", "limit": 10}
headers = {"Authorization": "Bearer rai_test_your_demo_key"}

response = requests.get(
    "https://api.realityai.example/v1/properties",
    params=params,
    headers=headers
)
properties = response.json()`,
    },
  },
  {
    id: 'get-property-details',
    title: 'Get Property Details',
    category: 'Endpoints',
    method: 'GET',
    endpoint: '/api/v1/properties/:id',
    summary: 'Retrieve complete architectural specifications and image dossier for a single property.',
    description: 'Fetches the comprehensive dossier for a specific property including full dimension breakdowns, material palette, amenities list, and high-resolution gallery URLs.',
    parameters: [
      { name: 'id', in: 'path', type: 'string', required: true, description: 'Unique property identifier (e.g. prop-1)' },
    ],
    responseExamples: [
      {
        status: 200,
        title: '200 OK (Single Estate)',
        body: {
          status: 'success',
          data: {
            id: 'prop-1',
            title: 'The Courtyard Villa at Sadashivanagar',
            tagline: 'Modern tropical architecture with central rain courtyard',
            category: 'villa',
            price: 185000000,
            location: {
              address: 'Plot 42, 5th Cross, Sadashivanagar',
              locality: 'Sadashivanagar',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560080',
            },
            features: {
              areaSqFt: 6200,
              bedrooms: 4,
              bathrooms: 5,
              facing: 'East',
              ageOfPropertyYears: 1,
            },
            amenities: ['Private Lap Pool', 'Lutron Automation', 'Rain Courtyard', 'EV Charging'],
            images: [
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
            ],
          },
        },
      },
      {
        status: 404,
        title: '404 Not Found',
        body: {
          status: 'error',
          code: 'PROPERTY_NOT_FOUND',
          message: 'The requested property ID does not exist in the architectural registry.',
        },
      },
    ],
    codeExamples: {
      curl: `curl -X GET "https://api.realityai.example/v1/properties/prop-1" \\
  -H "Authorization: Bearer rai_test_your_demo_key"`,
      javascript: `const res = await fetch("https://api.realityai.example/v1/properties/prop-1", {
  headers: { "Authorization": "Bearer rai_test_your_demo_key" }
});
const property = await res.json();`,
      python: `import requests

response = requests.get(
    "https://api.realityai.example/v1/properties/prop-1",
    headers={"Authorization": "Bearer rai_test_your_demo_key"}
)
property = response.json()`,
    },
  },
  {
    id: 'get-locations',
    title: 'List Supported Locations',
    category: 'Endpoints',
    method: 'GET',
    endpoint: '/api/v1/locations',
    summary: 'Retrieve regions, micro-markets, and cities currently cataloged in Reality AI.',
    description: 'Returns the geographical taxonomy of regions, active urban zones, and heritage plantation areas available for exploration.',
    parameters: [
      { name: 'region', in: 'query', type: 'string', required: false, description: 'Optional state filter (e.g. karnataka)' },
    ],
    responseExamples: [
      {
        status: 200,
        title: '200 OK (Locations)',
        body: {
          status: 'success',
          state: 'Karnataka',
          regions: [
            { city: 'Bengaluru', primeLocalities: ['Sadashivanagar', 'Indiranagar', 'Lavelle Road', 'Koramangala'], propertyCount: 14 },
            { city: 'Mysuru', primeLocalities: ['Yadavagiri', 'Gokulam', 'Jayalakshmipuram'], propertyCount: 4 },
            { city: 'Chikmagalur', primeLocalities: ['Mullayanagiri Foothills', 'Kaldurga Valley'], propertyCount: 3 },
            { city: 'Coorg', primeLocalities: ['Madikeri Ridge', 'Virajpet Coffee Belt'], propertyCount: 3 },
          ],
        },
      },
    ],
    codeExamples: {
      curl: `curl -X GET "https://api.realityai.example/v1/locations" \\
  -H "Authorization: Bearer rai_test_your_demo_key"`,
      javascript: `const res = await fetch("https://api.realityai.example/v1/locations", {
  headers: { "Authorization": "Bearer rai_test_your_demo_key" }
});
const locations = await res.json();`,
      python: `import requests

response = requests.get(
    "https://api.realityai.example/v1/locations",
    headers={"Authorization": "Bearer rai_test_your_demo_key"}
)
locations = response.json()`,
    },
  },
  {
    id: 'get-property-types',
    title: 'List Property Typologies',
    category: 'Endpoints',
    method: 'GET',
    endpoint: '/api/v1/property-types',
    summary: 'Retrieve all architectural typologies and listing categories.',
    description: 'Returns active property classification types supported by the platform schema.',
    parameters: [],
    responseExamples: [
      {
        status: 200,
        title: '200 OK (Property Types)',
        body: {
          status: 'success',
          categories: [
            { code: 'residential', label: 'Residential Estate', activeCount: 6 },
            { code: 'villa', label: 'Villa & Courtyard Residence', activeCount: 9 },
            { code: 'apartment', label: 'Apartment & Penthouse', activeCount: 5 },
            { code: 'plot', label: 'Residential Land / Plot', activeCount: 2 },
            { code: 'commercial', label: 'Commercial Atelier / Studio', activeCount: 2 },
          ],
        },
      },
    ],
    codeExamples: {
      curl: `curl -X GET "https://api.realityai.example/v1/property-types" \\
  -H "Authorization: Bearer rai_test_your_demo_key"`,
      javascript: `const res = await fetch("https://api.realityai.example/v1/property-types", {
  headers: { "Authorization": "Bearer rai_test_your_demo_key" }
});
const types = await res.json();`,
      python: `import requests

response = requests.get(
    "https://api.realityai.example/v1/property-types",
    headers={"Authorization": "Bearer rai_test_your_demo_key"}
)
types = response.json()`,
    },
  },
  {
    id: 'errors',
    title: 'Errors & Status Codes',
    category: 'Reference',
    summary: 'Standard HTTP status codes and error object schemas.',
    description: `The Reality AI simulated API uses conventional HTTP status codes to indicate the outcome of an API request.
    
In general, codes in the \`2xx\` range indicate success, codes in the \`4xx\` range indicate client errors (e.g. invalid parameter or missing key), and codes in the \`5xx\` range indicate server errors.`,
    responseExamples: [
      {
        status: 400,
        title: '400 Bad Request',
        body: { error: 'Invalid query parameters provided', code: 'BAD_REQUEST', status: 400 },
      },
      {
        status: 429,
        title: '429 Rate Limit Exceeded',
        body: { error: 'Rate limit quota exceeded for key', code: 'RATE_LIMIT_EXCEEDED', status: 429, resetSeconds: 42 },
      },
    ],
    codeExamples: {
      curl: `# Error Response Structure
{
  "status": 404,
  "code": "RESOURCE_NOT_FOUND",
  "error": "Detailed error message",
  "timestamp": "2026-11-25T00:00:00Z"
}`,
      javascript: `if (!res.ok) {
  const errorData = await res.json();
  console.error(\`API Error [\${errorData.code}]: \${errorData.error}\`);
}`,
      python: `if response.status_code != 200:
    err = response.json()
    print(f"Error {err.get('code')}: {err.get('error')}")`,
    },
  },
  {
    id: 'rate-limits',
    title: 'Rate Limits',
    category: 'Reference',
    summary: 'Sandbox throttling and quota limits.',
    description: `In Sandbox mode, API keys are throttled to ensure infrastructure stability:

- **Test Keys**: 120 requests per minute per key.
- **Concurrent Requests**: Max 10 concurrent requests.
- **Burst Allowance**: 20 requests burst.

Rate limit headers are returned on every request:
- \`X-RateLimit-Limit\`: Total request allowance per window.
- \`X-RateLimit-Remaining\`: Remaining requests in current window.
- \`X-RateLimit-Reset\`: Epoch timestamp when limit resets.`,
    responseExamples: [],
    codeExamples: {
      curl: `# Inspect Rate Limit Headers
curl -i -X GET "https://api.realityai.example/v1/properties" \\
  -H "Authorization: Bearer rai_test_your_demo_key"`,
      javascript: `// Accessing headers in fetch
const limit = res.headers.get("x-ratelimit-limit");
const remaining = res.headers.get("x-ratelimit-remaining");`,
      python: `# Accessing headers in requests
limit = response.headers.get("x-ratelimit-limit")
remaining = response.headers.get("x-ratelimit-remaining")`,
    },
  },
];
