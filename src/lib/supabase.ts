import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey);
}

export const isSupabaseConfigured = !!client;

// Proxy to handle missing environment variables gracefully
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    if (!client) {
      throw new Error(
        'Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are missing. ' +
        'Please add them to your environment secrets.'
      );
    }
    return (client as any)[prop];
  }
});
