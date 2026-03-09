import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
  (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_URL : undefined) || 
  import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey =
  (typeof process !== 'undefined' ? process.env.VITE_SUPABASE_ANON_KEY : undefined) || 
  import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);
