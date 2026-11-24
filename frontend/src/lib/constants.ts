/**
 * Shared Application Constants
 */
export const APP_NAME = 'Reality AI';
export const APP_TAGLINE = 'Architectural Real Estate Discovery';
export const DEFAULT_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

export const STORAGE_KEYS = {
  SAVED_PROPERTIES: 'reality_ai_saved_ids',
  SELLER_LISTINGS: 'reality_ai_seller_listings_v1',
  SELLER_ENQUIRIES: 'reality_ai_seller_enquiries_v1',
  ADMIN_PROPERTIES: 'reality_ai_admin_properties_v1',
  ADMIN_USERS: 'reality_ai_admin_users_v1',
  ADMIN_REPORTS: 'reality_ai_admin_reports_v1',
  AUTH_USER: 'reality_ai_auth_user',
} as const;
