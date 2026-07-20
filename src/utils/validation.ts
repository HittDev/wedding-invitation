/**
 * Validation utilities
 */

import { z } from 'zod';

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const isValidInvitationCode = (code: string): boolean => {
  // Codes should be 6-10 alphanumeric characters
  return /^[A-Z0-9]{6,10}$/i.test(code);
};

// Zod Schemas for common types
export const emailSchema = z.string().email('Email inválido');

export const phoneSchema = z
  .string()
  .refine(isValidPhone, 'Número de teléfono inválido');

export const urlSchema = z
  .string()
  .url('URL inválida')
  .optional();

export const uuidSchema = z
  .string()
  .uuid('UUID inválido');

export const invitationCodeSchema = z
  .string()
  .min(6, 'Código muy corto')
  .max(10, 'Código muy largo')
  .regex(/^[A-Z0-9]+$/i, 'Solo caracteres alfanuméricos permitidos');

export const confirmGuestCountSchema = z
  .number()
  .int('Debe ser un número entero')
  .min(1, 'Al menos 1 persona')
  .max(10, 'Máximo 10 personas');
