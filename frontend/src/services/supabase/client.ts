/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let clientInstance: SupabaseClient | null = null;

const FALLBACK_URL = 'https://placeholder-project.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

/**
 * Production Supabase Client singleton.
 * Reads from import.meta.env.VITE_SUPABASE_URL and import.meta.env.VITE_SUPABASE_ANON_KEY.
 * Uses a safe placeholder fallback solely to prevent module-eval startup crashes if env
 * keys are absent; authentication fails closed when Supabase is unconfigured.
 */
export const getSupabaseClient = (): SupabaseClient => {
  if (clientInstance) {
    return clientInstance;
  }

  const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_KEY;

  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn(
      '[Reality AI] Supabase environment configuration not detected. ' +
      'Authentication is disabled until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in frontend/.env.'
    );
  }

  clientInstance = createClient(url, anonKey, {
    auth: {
      flowType: 'pkce',
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  });

  return clientInstance;
};

/**
 * Supabase client instance with lazy validation.
 */
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});
