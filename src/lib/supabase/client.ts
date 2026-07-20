/**
 * Supabase Client - Client Side
 * Used in browser for client-side operations
 */

import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { env } from '@/lib/env';

export const createClient = () => {
  return createBrowserClient(
    env.supabase.url,
    env.supabase.anonKey,
  );
};

export type SupabaseClient = ReturnType<typeof createClient>;
