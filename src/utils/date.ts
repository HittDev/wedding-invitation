/**
 * Date utilities
 */

import { addDays, differenceInSeconds, isAfter, isBefore } from 'date-fns';

export interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
}

/**
 * Calculate countdown time between now and a target date
 */
export const calculateCountdown = (targetDate: Date): CountdownData => {
  const now = new Date();
  const totalSeconds = Math.max(0, differenceInSeconds(targetDate, now));
  const isExpired = totalSeconds === 0;

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    isExpired,
  };
};

/**
 * Check if a date is in the past
 */
export const isPastDate = (date: Date): boolean => {
  return isBefore(date, new Date());
};

/**
 * Check if a date is in the future
 */
export const isFutureDate = (date: Date): boolean => {
  return isAfter(date, new Date());
};

/**
 * Check if an invitation has expired
 */
export const isInvitationExpired = (createdAt: Date, expiryDays = 365): boolean => {
  const expiryDate = addDays(createdAt, expiryDays);
  return isPastDate(expiryDate);
};

/**
 * Get time zone offset
 */
export const getTimeZoneOffset = (): string => {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.floor(Math.abs(offset) / 60);
  const minutes = Math.abs(offset) % 60;
  const sign = offset <= 0 ? '+' : '-';
  return `UTC${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
