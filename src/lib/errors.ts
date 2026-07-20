/**
 * Custom error classes
 */

export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super('VALIDATION_ERROR', message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super('NOT_FOUND', message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super('FORBIDDEN', message, 403);
  }
}

export class RateLimitError extends AppError {
  constructor(retryAfter?: number) {
    const message = `Too many requests. Please try again${retryAfter ? ` in ${retryAfter} seconds` : ''}`;
    super('RATE_LIMIT', message, 429);
    if (retryAfter) {
      this.retryAfter = retryAfter;
    }
  }

  retryAfter?: number;
}

export class DatabaseError extends AppError {
  constructor(message = 'Database error') {
    super('DATABASE_ERROR', message, 500);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message?: string) {
    super('EXTERNAL_SERVICE_ERROR', `${service} service error${message ? ': ' + message : ''}`, 502);
  }
}

/**
 * Determine if error is an AppError
 */
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

/**
 * Format error for API response
 */
export const formatErrorResponse = (error: unknown) => {
  if (isAppError(error)) {
    return {
      success: false,
      error: error.code,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message,
      statusCode: 500,
    };
  }

  return {
    success: false,
    error: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred',
    statusCode: 500,
  };
};
