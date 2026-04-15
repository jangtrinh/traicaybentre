/**
 * Supabase public client (anon key) — safe for browser & RSC.
 * Reads only published articles + public price/holiday data via RLS.
 *
 * Lazy-initialized via Proxy so importing this module does not throw at
 * build time when env vars are unavailable. Client is instantiated on
 * first method access, which matches the RSC/browser runtime window
 * where env vars are always present.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let _client: SupabaseClient<Database> | null = null;

function getClient(): SupabaseClient<Database> {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars"
    );
  }
  _client = createClient<Database>(url, anonKey, {
    auth: { persistSession: false },
  });
  return _client;
}

export const supabasePublic = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
