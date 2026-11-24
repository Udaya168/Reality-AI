/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let clientInstance: SupabaseClient | null = null;

/**
 * Production Supabase Client singleton.
 * Strictly reads from import.meta.env.VITE_SUPABASE_URL and import.meta.env.VITE_SUPABASE_ANON_KEY.
 * No hardcoded, demo, or placeholder credentials.
 */
export const getSupabaseClient = (): SupabaseClient => {
  if (clientInstance) {
    return clientInstance;
  }

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      '[Reality AI] Missing Supabase environment configuration. ' +
      'Please ensure frontend/.env is configured with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }

  clientInstance = createClient(url, anonKey, {
    auth: {
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
 * Throws a clear descriptive error if frontend/.env credentials are missing.
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
