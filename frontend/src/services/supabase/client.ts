/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let clientInstance: SupabaseClient | null = null;

const FALLBACK_URL = 'https://placeholder-project.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

/**
 * Production Supabase Client singleton.
 * Strictly reads from import.meta.env.VITE_SUPABASE_URL and import.meta.env.VITE_SUPABASE_ANON_KEY.
 * Falls back safely to placeholder client if environment variables are missing,
 * avoiding uncaught startup crashes and allowing offline / mock demo workflows.
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
      'Running in offline/demo mode. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to frontend/.env for live authentication.'
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
