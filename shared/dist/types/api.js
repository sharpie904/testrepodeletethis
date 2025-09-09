import { z } from 'zod';
// Base API Response Types
export const ApiSuccessResponseSchema = (dataSchema) => z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional(),
});
export const ApiErrorResponseSchema = z.object({
    success: z.literal(false),
    error: z.object({
        code: z.string(),
        message: z.string(),
        details: z.record(z.any()).optional(),
    }),
});
export const ApiResponseSchema = (dataSchema) => z.union([
    ApiSuccessResponseSchema(dataSchema),
    ApiErrorResponseSchema,
]);
// Error Codes
export const ErrorCodes = {
    // Authentication
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    // Validation
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    INVALID_INPUT: 'INVALID_INPUT',
    // Resources
    NOT_FOUND: 'NOT_FOUND',
    ALREADY_EXISTS: 'ALREADY_EXISTS',
    // Server
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
    // Business Logic
    INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
    ORGANIZATION_LIMIT_REACHED: 'ORGANIZATION_LIMIT_REACHED',
};
// Custom Error Class
export class AppError extends Error {
    code;
    statusCode;
    details;
    constructor(code, message, statusCode = 500, details) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'AppError';
    }
    toJSON() {
        return {
            success: false,
            error: {
                code: this.code,
                message: this.message,
                details: this.details,
            },
        };
    }
}
// HTTP Status Mappings
export const ErrorStatusMap = {
    [ErrorCodes.UNAUTHORIZED]: 401,
    [ErrorCodes.FORBIDDEN]: 403,
    [ErrorCodes.TOKEN_EXPIRED]: 401,
    [ErrorCodes.INVALID_CREDENTIALS]: 401,
    [ErrorCodes.VALIDATION_ERROR]: 400,
    [ErrorCodes.INVALID_INPUT]: 400,
    [ErrorCodes.NOT_FOUND]: 404,
    [ErrorCodes.ALREADY_EXISTS]: 409,
    [ErrorCodes.INTERNAL_ERROR]: 500,
    [ErrorCodes.DATABASE_ERROR]: 500,
    [ErrorCodes.INSUFFICIENT_PERMISSIONS]: 403,
    [ErrorCodes.ORGANIZATION_LIMIT_REACHED]: 400,
};
