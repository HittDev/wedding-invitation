# Database Schema Documentation

## Tables Overview

### invitations
Main invitations table storing wedding invitation details.

**Columns:**
- `id` (UUID, PK): Unique invitation identifier
- `code` (VARCHAR, UNIQUE): Unique invitation code
- `couple_name_1` (VARCHAR): First partner name
- `couple_name_2` (VARCHAR): Second partner name
- `event_title` (VARCHAR): Event title
- `event_date` (TIMESTAMP TZ): Event date and time
- `event_location` (VARCHAR): Event location
- `event_description` (TEXT): Event description
- `invitation_message` (TEXT): Custom invitation message
- `allowed_guests` (INTEGER): Number of allowed guests per invitation
- `is_active` (BOOLEAN): Active status
- `created_by` (UUID, FK): Admin user who created
- `created_at` (TIMESTAMP TZ): Creation timestamp
- `updated_at` (TIMESTAMP TZ): Last update timestamp

**Indexes:**
- code (UNIQUE)
- created_by
- is_active
- created_at

---

### guests
Guest information linked to invitations.

**Columns:**
- `id` (UUID, PK): Unique guest identifier
- `invitation_id` (UUID, FK): Reference to invitation
- `code` (VARCHAR, UNIQUE): Unique guest code for RSVP access
- `guest_name` (VARCHAR): Guest name
- `guest_email` (VARCHAR): Guest email
- `guest_phone` (VARCHAR): Guest phone number
- `is_primary` (BOOLEAN): Primary guest indicator
- `is_sent` (BOOLEAN): Invitation sent status
- `sent_at` (TIMESTAMP TZ): When invitation was sent
- `created_at` (TIMESTAMP TZ): Creation timestamp
- `updated_at` (TIMESTAMP TZ): Last update timestamp

**Indexes:**
- invitation_id
- code (UNIQUE)
- guest_email
- is_sent

**Constraints:**
- FK: invitation_id -> invitations(id) ON DELETE CASCADE

---

### rsvp_responses
RSVP responses from guests.

**Columns:**
- `id` (UUID, PK): Unique response identifier
- `guest_id` (UUID, FK): Reference to guest
- `invitation_id` (UUID, FK): Reference to invitation
- `status` (VARCHAR): Response status (confirmed, rejected, pending, no_response)
- `guest_count` (INTEGER): Number of attending guests
- `dietary_restrictions` (TEXT): Dietary restrictions
- `special_requests` (TEXT): Special requests
- `response_at` (TIMESTAMP TZ): When response was submitted
- `created_at` (TIMESTAMP TZ): Creation timestamp
- `updated_at` (TIMESTAMP TZ): Last update timestamp

**Indexes:**
- guest_id
- invitation_id
- status
- response_at

**Constraints:**
- FK: guest_id -> guests(id) ON DELETE CASCADE
- FK: invitation_id -> invitations(id) ON DELETE CASCADE
- CHECK: status IN ('confirmed', 'rejected', 'pending', 'no_response')

---

### admin_users
Administrative user accounts.

**Columns:**
- `id` (UUID, PK): Unique admin identifier
- `user_id` (TEXT, UNIQUE): Supabase auth user ID
- `email` (VARCHAR, UNIQUE): Admin email
- `full_name` (VARCHAR): Admin full name
- `role` (VARCHAR): Admin role (super_admin, admin, editor)
- `is_active` (BOOLEAN): Active status
- `last_login` (TIMESTAMP TZ): Last login timestamp
- `created_at` (TIMESTAMP TZ): Creation timestamp
- `updated_at` (TIMESTAMP TZ): Last update timestamp

**Indexes:**
- user_id (UNIQUE)
- email (UNIQUE)
- is_active

**Constraints:**
- CHECK: role IN ('super_admin', 'admin', 'editor')

---

### audit_logs
Audit trail for administrative actions.

**Columns:**
- `id` (UUID, PK): Unique log identifier
- `user_id` (UUID, FK): Admin user who performed action
- `action` (VARCHAR): Action performed (CREATE, UPDATE, DELETE, etc.)
- `entity_type` (VARCHAR): Entity type (invitation, guest, rsvp, admin_user)
- `entity_id` (UUID): ID of affected entity
- `changes` (JSONB): JSON diff of changes
- `ip_address` (INET): IP address of requester
- `user_agent` (TEXT): User agent string
- `created_at` (TIMESTAMP TZ): Creation timestamp

**Indexes:**
- user_id
- entity_type
- entity_id
- created_at

**Constraints:**
- FK: user_id -> admin_users(id) ON DELETE SET NULL
- CHECK: entity_type IN ('invitation', 'guest', 'rsvp', 'admin_user')

---

## Row Level Security (RLS)

All tables have RLS enabled:

### Guests (Public)
- Can view their own data via guest code
- Can create RSVP responses
- Cannot delete or modify guest records

### Admins (Authenticated)
- Can view all invitations and guests
- Can create, update invitations and guests
- Role-based permissions for sensitive operations
- Super admins only can delete and manage admin users

### Audit Logs
- Admins can view audit logs
- System can insert logs
- No guest access

---

## Database Functions

### update_updated_at_column()
Automatically updates the `updated_at` column when records are modified.

### generate_guest_code()
Generates a unique 6-character guest code.

### get_invitation_stats(invitation_uuid UUID)
Returns statistics for an invitation:
- Total guests
- Confirmed count
- Rejected count
- Pending count
- Total confirmed guest count

### get_dashboard_stats()
Returns global dashboard statistics:
- Total invitations
- Active invitations
- Total guests
- RSVP confirmed count
- RSVP rejected count
- RSVP pending count

---

## Performance Optimization

- All foreign key columns are indexed
- Status columns indexed for filtering
- Created_at columns indexed for range queries
- Code columns are unique and indexed
- Soft deletes not used (CASCADE deletes)
- Views for aggregated data

---

## Data Relationships

```
invitations (1) ---- (N) guests
    |                   |
    |                   |
    +-- (1) -----------(N) rsvp_responses
    |
    +-- created_by --> admin_users

admin_users (1) ---- (N) audit_logs
```
