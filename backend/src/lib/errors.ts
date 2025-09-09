import type { Context } from 'hono';
import { AppError, ErrorCodes, ErrorStatusMap, type ApiErrorResponse } from 'shared';

export function createAppError(
  code: keyof typeof ErrorCodes,
  message: string,
  details?: Record<string, any>
): AppError {
  const errorCode = ErrorCodes[code];
  const statusCode = ErrorStatusMap[errorCode];
  return new AppError(errorCode, message, statusCode, details);
}

export function handleError(error: unknown, c: Context): Response {
  console.error('API Error:', error);

  if (error instanceof AppError) {
    return c.json(error.toJSON(), error.statusCode);
  }

  // Handle Prisma errors
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any;
    
    switch (prismaError.code) {
      case 'P2002':
        return c.json({
          success: false,
          error: {
            code: ErrorCodes.ALREADY_EXISTS,
            message: 'A record with this information already exists',
            details: { field: prismaError.meta?.target },
          },
        } satisfies ApiErrorResponse, 409);
      
      case 'P2025':
        return c.json({
          success: false,
          error: {
            code: ErrorCodes.NOT_FOUND,
            message: 'Record not found',
          },
        } satisfies ApiErrorResponse, 404);
      
      default:
        return c.json({
          success: false,
          error: {
            code: ErrorCodes.DATABASE_ERROR,
            message: 'Database operation failed',
          },
        } satisfies ApiErrorResponse, 500);
    }
  }

  // Generic error
  return c.json({
    success: false,
    error: {
      code: ErrorCodes.INTERNAL_ERROR,
      message: 'An unexpected error occurred',
    },
  } satisfies ApiErrorResponse, 500);
}

export function createSuccessResponse<T>(data: T, message?: string) {
  return {
    success: true as const,
    data,
    message,
  };
}