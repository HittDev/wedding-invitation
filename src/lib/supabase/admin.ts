/**
 * Supabase Admin Client
 * Used for privileged operations (should only be called from backend)
 */

import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/env';

if (!env.supabase.serviceRoleKey) {
  console.warn('⚠️ Warning: SUPABASE_SERVICE_ROLE_KEY not set. Admin operations will fail.');
}

export const createAdminSupabaseClient = () => {
  return createClient(
    env.supabase.url,
    env.supabase.serviceRoleKey,
  );
};

export type AdminSupabaseClient = ReturnType<typeof createAdminSupabaseClient>;
