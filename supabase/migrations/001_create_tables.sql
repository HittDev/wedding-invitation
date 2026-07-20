-- ============================================
-- MIGRATION 001: Create Core Tables
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-secret-key';

-- ============================================
-- INVITATIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  couple_name_1 VARCHAR(255) NOT NULL,
  couple_name_2 VARCHAR(255) NOT NULL,
  event_title VARCHAR(255) NOT NULL DEFAULT 'Celebración de Matrimonio',
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_location VARCHAR(500) NOT NULL,
  event_description TEXT,
  invitation_message TEXT,
  allowed_guests INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for invitations
CREATE INDEX idx_invitations_code ON invitations(code);
CREATE INDEX idx_invitations_created_by ON invitations(created_by);
CREATE INDEX idx_invitations_is_active ON invitations(is_active);
CREATE INDEX idx_invitations_created_at ON invitations(created_at);

-- ============================================
-- GUESTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  code VARCHAR(50) UNIQUE NOT NULL,
  guest_name VARCHAR(255) NOT NULL,
  guest_email VARCHAR(255),
  guest_phone VARCHAR(20),
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  is_sent BOOLEAN NOT NULL DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for guests
CREATE INDEX idx_guests_invitation_id ON guests(invitation_id);
CREATE INDEX idx_guests_code ON guests(code);
CREATE INDEX idx_guests_email ON guests(guest_email);
CREATE INDEX idx_guests_is_sent ON guests(is_sent);

-- ============================================
-- RSVP_RESPONSES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  guest_id UUID NOT NULL REFERENCES guests(id) ON DELETE CASCADE,
  invitation_id UUID NOT NULL REFERENCES invitations(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('confirmed', 'rejected', 'pending', 'no_response')),
  guest_count INTEGER DEFAULT 1,
  dietary_restrictions TEXT,
  special_requests TEXT,
  response_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for RSVP responses
CREATE INDEX idx_rsvp_responses_guest_id ON rsvp_responses(guest_id);
CREATE INDEX idx_rsvp_responses_invitation_id ON rsvp_responses(invitation_id);
CREATE INDEX idx_rsvp_responses_status ON rsvp_responses(status);
CREATE INDEX idx_rsvp_responses_response_at ON rsvp_responses(response_at);

-- ============================================
-- ADMIN_USERS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for admin users
CREATE INDEX idx_admin_users_user_id ON admin_users(user_id);
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_users_is_active ON admin_users(is_active);

-- ============================================
-- AUDIT_LOGS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE SET NULL,
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('invitation', 'guest', 'rsvp', 'admin_user')),
  entity_id UUID NOT NULL,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for audit logs
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_entity_id ON audit_logs(entity_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);