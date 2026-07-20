-- ============================================
-- MIGRATION 003: Database Functions
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_invitations_updated_at BEFORE UPDATE ON invitations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rsvp_responses_updated_at BEFORE UPDATE ON rsvp_responses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate unique guest code
CREATE OR REPLACE FUNCTION generate_guest_code()
RETURNS VARCHAR AS $$
DECLARE
  new_code VARCHAR(10);
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT), 1, 6));
    SELECT EXISTS(SELECT 1 FROM guests WHERE code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  RETURN new_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get invitation statistics
CREATE OR REPLACE FUNCTION get_invitation_stats(invitation_uuid UUID)
RETURNS TABLE (
  total_guests BIGINT,
  confirmed BIGINT,
  rejected BIGINT,
  pending BIGINT,
  total_confirmed_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT g.id)::BIGINT,
    COUNT(DISTINCT CASE WHEN rr.status = 'confirmed' THEN g.id END)::BIGINT,
    COUNT(DISTINCT CASE WHEN rr.status = 'rejected' THEN g.id END)::BIGINT,
    COUNT(DISTINCT CASE WHEN rr.status IN ('pending', 'no_response') OR rr.id IS NULL THEN g.id END)::BIGINT,
    COALESCE(SUM(CASE WHEN rr.status = 'confirmed' THEN rr.guest_count ELSE 0 END), 0)::BIGINT
  FROM guests g
  LEFT JOIN rsvp_responses rr ON g.id = rr.guest_id
  WHERE g.invitation_id = invitation_uuid;
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to get dashboard statistics
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
  total_invitations BIGINT,
  active_invitations BIGINT,
  total_guests BIGINT,
  rsvp_confirmed BIGINT,
  rsvp_rejected BIGINT,
  rsvp_pending BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(DISTINCT i.id)::BIGINT as total_invitations,
    COUNT(DISTINCT CASE WHEN i.is_active = TRUE THEN i.id END)::BIGINT as active_invitations,
    COUNT(DISTINCT g.id)::BIGINT as total_guests,
    COUNT(DISTINCT CASE WHEN rr.status = 'confirmed' THEN g.id END)::BIGINT as rsvp_confirmed,
    COUNT(DISTINCT CASE WHEN rr.status = 'rejected' THEN g.id END)::BIGINT as rsvp_rejected,
    COUNT(DISTINCT CASE WHEN rr.status IN ('pending', 'no_response') OR rr.id IS NULL THEN g.id END)::BIGINT as rsvp_pending
  FROM invitations i
  LEFT JOIN guests g ON i.id = g.invitation_id
  LEFT JOIN rsvp_responses rr ON g.id = rr.guest_id;
END;
$$ LANGUAGE plpgsql STABLE;