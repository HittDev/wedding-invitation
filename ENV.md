# Environment Variables

## Supabase Configuration

```env
# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Supabase Anon Key (Public, safe to expose)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Service Role Key (KEEP SECRET - server only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Application Configuration

```env
# Public app URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Wedding domain (for custom invitations)
NEXT_PUBLIC_WEDDING_DOMAIN=boda.midominio.com
```

## Security Configuration

```env
# RSVP rate limiting
NEXT_PUBLIC_RATE_LIMIT_RSVP=5          # Max attempts
RSVP_RATE_LIMIT_WINDOW=3600            # Time window in seconds (1 hour)
```

## Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Navigate to Project Settings → API
4. Copy the URL and Anon Key
5. For Service Role Key, go to Settings → API → Service Role Secret Key

## Important Notes

- ⚠️ Never commit `.env.local` to version control
- ⚠️ Keep `SUPABASE_SERVICE_ROLE_KEY` secret - never expose in frontend
- ✅ Variables prefixed with `NEXT_PUBLIC_` are safe to expose (client-side)
- ✅ Variables without prefix are server-side only
