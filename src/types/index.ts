/**
 * Global type definitions
 */

export type UUID = string & { readonly __brand: 'UUID' };
export type InvitationCode = string & { readonly __brand: 'InvitationCode' };

export enum RSVPStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REJECTED = 'rejected',
  NO_RESPONSE = 'no_response',
}

export enum AdminRole {
  OWNER = 'owner',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
}
