import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const normalizedSupabaseUrl = supabaseUrl?.replace(/\/rest\/v1\/?$/, "");

let cachedClient = null;

export function getSupabaseClient() {
  if (cachedClient) return cachedClient;

  if (!normalizedSupabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase client is not configured");
  }

  cachedClient = createClient(normalizedSupabaseUrl, supabaseAnonKey);
  return cachedClient;
}

export const supabase = (() => {
  try {
    return getSupabaseClient();
  } catch {
    return null;
  }
})();
