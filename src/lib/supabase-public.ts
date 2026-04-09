/**
 * Supabase public client (anon key) — safe for browser & RSC.
 * Reads only published articles + public price/holiday data via RLS.
 */
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabasePublic = createClient<Database>(url, anonKey, {
  auth: { persistSession: false },
});
