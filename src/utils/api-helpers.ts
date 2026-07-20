/**
 * API helper utilities
 */

import { formatErrorResponse, isAppError } from '@/lib/errors';

export interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

/**
 * Enhanced fetch with timeout and retries
 */
export const fetchWithTimeout = async <T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const { timeout = 10000, retries = 3, ...fetchOptions } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on client errors (4xx)
      if (error instanceof Error && error.message.includes('HTTP 4')) {
        throw error;
      }

      // Wait before retrying
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError || new Error('Fetch failed after retries');
};

/**
 * API error handler
 */
export const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  return formatErrorResponse(error);
};

/**
 * Create API error response
 */
export const createErrorResponse = (message: string, statusCode: number = 500) => {
  return new Response(
    JSON.stringify({
      success: false,
      error: 'API_ERROR',
      message,
    }),
    {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};

/**
 * Create API success response
 */
export const createSuccessResponse = <T>(data: T, statusCode: number = 200) => {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      status: statusCode,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
