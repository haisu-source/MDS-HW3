import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Server-side helper: creates a Supabase client with the user's Clerk session token
// The accessToken callback lets Supabase use the Clerk token for RLS
export function createServerSupabase(getToken: () => Promise<string | null>) {
  return createClient(supabaseUrl, supabasePublishableKey, {
    accessToken: getToken,
  });
}

// Anon client for public queries (no auth)
export function createAnonSupabase() {
  return createClient(supabaseUrl, supabasePublishableKey);
}
