/**
 * API Request/Response Types
 */

import { Invitation, Guest, RSVPResponse, AdminUser } from './database';
import { UUID, RSVPStatus } from './index';

// ============================================
// INVITATION ENDPOINTS
// ============================================

export interface CreateInvitationRequest {
  couple_name_1: string;
  couple_name_2: string;
  event_title?: string;
  event_date: string;
  event_location: string;
  event_description?: string;
  invitation_message?: string;
  allowed_guests: number;
  guests: Array<{
    guest_name: string;
    guest_email?: string;
    guest_phone?: string;
  }>;
}

export interface CreateInvitationResponse {
  invitation: Invitation;
  guests: Guest[];
}

export interface GetInvitationResponse {
  invitation: Invitation;
  guests: Guest[];
  stats: {
    total_responses: number;
    confirmed: number;
    rejected: number;
    pending: number;
  };
}

// ============================================
// GUEST ENDPOINTS
// ============================================

export interface ValidateCodeRequest {
  code: string;
}

export interface ValidateCodeResponse {
  valid: boolean;
  guest?: Guest;
  invitation?: Invitation;
}

export interface GetGuestInvitationResponse {
  guest: Guest;
  invitation: Invitation;
  rsvp?: RSVPResponse;
}

// ============================================
// RSVP ENDPOINTS
// ============================================

export interface SubmitRSVPRequest {
  guest_id: UUID;
  status: RSVPStatus;
  guest_count?: number;
  dietary_restrictions?: string;
  special_requests?: string;
}

export interface SubmitRSVPResponse {
  rsvp: RSVPResponse;
  message: string;
}

// ============================================
// ADMIN ENDPOINTS
// ============================================

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  admin: AdminUser;
  token: string;
}

export interface GetDashboardStatsResponse {
  stats: {
    total_invitations: number;
    active_invitations: number;
    total_guests: number;
    rsvp_confirmed: number;
    rsvp_rejected: number;
    rsvp_pending: number;
  };
  recent_invitations: Invitation[];
  recent_responses: RSVPResponse[];
}

export interface UpdateInvitationRequest {
  invitation_id: UUID;
  data: {
    event_title?: string;
    event_date?: string;
    event_location?: string;
    event_description?: string;
    invitation_message?: string;
    is_active?: boolean;
  };
}

export interface SendInvitationsRequest {
  invitation_id: UUID;
  guest_ids?: UUID[]; // If not provided, send to all
}

export interface SendInvitationsResponse {
  sent_count: number;
  failed_count: number;
  message: string;
}
