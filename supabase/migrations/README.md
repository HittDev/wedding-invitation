# Supabase Migrations

Database migrations for the Wedding Invitation Platform.

## Migration Files

### 001_create_tables.sql
Creates core tables:
- invitations
- guests
- rsvp_responses
- admin_users
- audit_logs

Includes indexes and foreign key constraints.

### 002_enable_rls.sql
Enables Row Level Security policies on all tables.

### 003_functions.sql
Database functions and triggers:
- update_updated_at_column()
- generate_guest_code()
- get_invitation_stats()
- get_dashboard_stats()

## Running Migrations

```bash
supabase db push
```
