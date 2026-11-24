/// <reference types="vite/client" />

export const appConfig = {
  name: 'Reality AI',
  tagline: 'Architectural Real Estate Discovery',
  version: '1.0.0',
  apiBaseUrl: import.meta.env?.VITE_API_BASE_URL || 'https://api.realityai.estate/v1',
  currency: 'INR',
  supportedRegions: ['Bengaluru', 'Mysuru', 'Chikmagalur', 'Coorg'],
};
