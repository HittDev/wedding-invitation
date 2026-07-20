/**
 * Application constants
 */

export const APP_NAME = 'Wedding Invitation';
export const APP_DESCRIPTION = 'Premium digital wedding invitation with interactive RSVP';

// Invitation
export const INVITATION_CODE_LENGTH = 8;
export const INVITATION_EXPIRY_DAYS = 365;

// RSVP
export const RSVP_MIN_GUESTS = 1;
export const RSVP_MAX_GUESTS = 10; // Will be overridden by allowed_guests in database
export const RSVP_RATE_LIMIT_ATTEMPTS = 5;
export const RSVP_RATE_LIMIT_WINDOW_MS = 3600000; // 1 hour

// Animations
export const ANIMATION_DURATION = {
  FAST: 150,
  BASE: 300,
  SLOW: 500,
  SPLASH_SCREEN: 2500,
  ENVELOPE: 1500,
  CARD_POP: 600,
} as const;

export const ANIMATION_EASING = {
  EASE_IN_OUT: [0.4, 0, 0.2, 1],
  EASE_OUT: [0.4, 0, 1, 1],
  EASE_IN: [0, 0, 0.2, 1],
  CUBIC_BEZIER: [0.25, 0.46, 0.45, 0.94],
} as const;

// Dates and Times
export const DATE_FORMAT = 'dd MMMM yyyy';
export const TIME_FORMAT = 'HH:mm';
export const COUNTDOWN_UPDATE_INTERVAL = 1000; // 1 second

// API
export const API_TIMEOUT = 10000; // 10 seconds
export const API_RETRY_ATTEMPTS = 3;
export const API_RETRY_DELAY = 1000; // 1 second

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

// Feature Flags
export const FEATURES = {
  AR_EXPERIENCE: false,
  MUSIC_PLAYER: true,
  LIVE_COUNTER: true,
  PHOTO_GALLERY: true,
  GIFT_REGISTRY: true,
} as const;
