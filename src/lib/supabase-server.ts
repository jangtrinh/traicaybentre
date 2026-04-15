/**
 * Supabase server client (service role) — use ONLY in server components,
 * route handlers, and server actions. NEVER expose service role to browser.
 *
 * Lazy-initialized via Proxy so importing this module does not throw at
 * build time when env vars are unavailable (Vercel page-data collection,
 * local `next build` without .env.local). Errors are deferred until first
 * actual method access on the client.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

let _client: SupabaseClient<Database> | null = null;

function getClient(): SupabaseClient<Database> {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars"
    );
  }
  _client = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _client;
}

// Proxy lets existing `supabaseAdmin.from(...)` call sites work unchanged
// while deferring client instantiation until first method access.
export const supabaseAdmin = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    const client = getClient();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
