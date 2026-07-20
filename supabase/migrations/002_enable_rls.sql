-- ============================================
-- MIGRATION 002: Enable Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- INVITATIONS POLICIES
-- ============================================

CREATE POLICY "Allow guests to view invitation via guest record"
  ON invitations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM guests
      WHERE guests.invitation_id = invitations.id
    )
  );

CREATE POLICY "Allow admins to view invitations"
  ON invitations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()::TEXT
        AND admin_users.is_active = TRUE
    )
  );

CREATE POLICY "Allow admins to create invitations"
  ON invitations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()::TEXT
        AND admin_users.is_active = TRUE
        AND admin_users.role IN ('super_admin', 'admin')
    )
  );

-- ============================================
-- GUESTS POLICIES
-- ============================================

CREATE POLICY "Allow guests to view their own record"
  ON guests FOR SELECT
  USING (true);

CREATE POLICY "Allow admins to view guests"
  ON guests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()::TEXT
        AND admin_users.is_active = TRUE
    )
  );

CREATE POLICY "Allow admins to create guests"
  ON guests FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()::TEXT
        AND admin_users.is_active = TRUE
        AND admin_users.role IN ('super_admin', 'admin', 'editor')
    )
  );

-- ============================================
-- RSVP_RESPONSES POLICIES
-- ============================================

CREATE POLICY "Allow guests to view their RSVP"
  ON rsvp_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM guests
      WHERE guests.id = rsvp_responses.guest_id
    )
  );

CREATE POLICY "Allow guests to create RSVP"
  ON rsvp_responses FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM guests
      WHERE guests.id = guest_id
    )
  );

CREATE POLICY "Allow admins to view RSVP responses"
  ON rsvp_responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()::TEXT
        AND admin_users.is_active = TRUE
    )
  );

-- ============================================
-- ADMIN_USERS POLICIES
-- ============================================

CREATE POLICY "Allow super admins to view all admin users"
  ON admin_users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.user_id = auth.uid()::TEXT
        AND au.is_active = TRUE
        AND au.role = 'super_admin'
    )
  );

-- ============================================
-- AUDIT_LOGS POLICIES
-- ============================================

CREATE POLICY "Allow admins to view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()::TEXT
        AND admin_users.is_active = TRUE
    )
  );