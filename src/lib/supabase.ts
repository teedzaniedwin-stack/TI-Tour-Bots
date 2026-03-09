import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'CRITICAL ERROR: Supabase environment variables are missing!\n' +
    'Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment secrets.\n' +
    'The app will not function correctly until these are configured.'
  );
}

// Initialize with placeholders if missing to prevent immediate crash, 
// but isSupabaseConfigured will be false.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseKey || 'placeholder-key'
);

export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);
