/**
 * Database Type Definitions
 * Types for Supabase tables and queries
 */

import { UUID, RSVPStatus, AdminRole } from './index';

// ============================================
// INVITATIONS TABLE
// ============================================

export interface Invitation {
  id: UUID;
  code: string;
  couple_name_1: string;
  couple_name_2: string;
  event_title: string;
  event_date: string; // ISO 8601
  event_location: string;
  event_description?: string;
  invitation_message?: string;
  allowed_guests: number;
  is_active: boolean;
  created_by: UUID;
  created_at: string;
  updated_at: string;
}

export type InvitationInsert = Omit<Invitation, 'id' | 'created_at' | 'updated_at'>;
export type InvitationUpdate = Partial<InvitationInsert>;

// ============================================
// GUESTS TABLE
// ============================================

export interface Guest {
  id: UUID;
  invitation_id: UUID;
  code: string; // Unique invitation code per guest
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  is_primary: boolean;
  is_sent: boolean;
  sent_at?: string;
  created_at: string;
  updated_at: string;
}

export type GuestInsert = Omit<Guest, 'id' | 'created_at' | 'updated_at'>;
export type GuestUpdate = Partial<GuestInsert>;

// ============================================
// RSVP RESPONSES TABLE
// ============================================

export interface RSVPResponse {
  id: UUID;
  guest_id: UUID;
  invitation_id: UUID;
  status: RSVPStatus;
  guest_count: number;
  dietary_restrictions?: string;
  special_requests?: string;
  response_at: string;
  created_at: string;
  updated_at: string;
}

export type RSVPResponseInsert = Omit<RSVPResponse, 'id' | 'created_at' | 'updated_at'>;
export type RSVPResponseUpdate = Partial<RSVPResponseInsert>;

// ============================================
// ADMIN USERS TABLE
// ============================================

export interface AdminUser {
  id: UUID;
  user_id: string; // Supabase auth user ID
  email: string;
  full_name?: string;
  role: AdminRole;
  is_active: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export type AdminUserInsert = Omit<AdminUser, 'id' | 'created_at' | 'updated_at'>;
export type AdminUserUpdate = Partial<AdminUserInsert>;

// ============================================
// AUDIT LOGS TABLE
// ============================================

export interface AuditLog {
  id: UUID;
  user_id: UUID;
  action: string;
  entity_type: 'invitation' | 'guest' | 'rsvp' | 'admin_user';
  entity_id: UUID;
  changes?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export type AuditLogInsert = Omit<AuditLog, 'id' | 'created_at'>;

// ============================================
// VIEW TYPES
// ============================================

export interface InvitationWithGuests extends Invitation {
  guests: Guest[];
}

export interface GuestWithRSVP extends Guest {
  rsvp?: RSVPResponse;
}

export interface InvitationStats {
  total_invitations: number;
  active_invitations: number;
  total_guests: number;
  rsvp_confirmed: number;
  rsvp_rejected: number;
  rsvp_pending: number;
  rsvp_no_response: number;
}
