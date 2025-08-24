import { createClient } from '@supabase/supabase-js'
import { mockSupabase } from './mockData'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Use mock data if no Supabase credentials are provided
export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : mockSupabase

// Log which mode we're running in
if (supabaseUrl && supabaseKey) {
  console.log('🚀 Creatorverse: Running with Supabase backend')
} else {
  console.log('🎭 Creatorverse: Running with mock data (no Supabase credentials)')
}