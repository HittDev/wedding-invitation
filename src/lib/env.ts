/**
 * Environment variables validation
 * Ensures all required env vars are set at runtime
 */

const getEnvVar = (key: string, required = true): string => {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value || '';
};

export const env = {
  // Supabase
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY', false),
  },

  // App Config
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL'),
    weddingDomain: getEnvVar('NEXT_PUBLIC_WEDDING_DOMAIN'),
  },

  // Security
  security: {
    rateLimitRsvp: parseInt(getEnvVar('NEXT_PUBLIC_RATE_LIMIT_RSVP', false) || '5'),
    rateLimitWindow: parseInt(getEnvVar('RSVP_RATE_LIMIT_WINDOW', false) || '3600'),
  },

  // Node environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

// Validate critical env vars on startup
if (typeof window === 'undefined') {
  try {
    env.supabase.url;
    env.supabase.anonKey;
    env.app.url;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
    console.warn('⚠️ Missing environment variables');
  }
}
