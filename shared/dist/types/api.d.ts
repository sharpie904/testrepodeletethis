import { z } from 'zod';
export declare const ApiSuccessResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => any;
export declare const ApiErrorResponseSchema: any;
export declare const ApiResponseSchema: <T extends z.ZodTypeAny>(dataSchema: T) => any;
export type ApiSuccessResponse<T> = {
    success: true;
    data: T;
    message?: string;
};
export type ApiErrorResponse = {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
};
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
export declare const ErrorCodes: {
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly TOKEN_EXPIRED: "TOKEN_EXPIRED";
    readonly INVALID_CREDENTIALS: "INVALID_CREDENTIALS";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly INVALID_INPUT: "INVALID_INPUT";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly ALREADY_EXISTS: "ALREADY_EXISTS";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
    readonly DATABASE_ERROR: "DATABASE_ERROR";
    readonly INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS";
    readonly ORGANIZATION_LIMIT_REACHED: "ORGANIZATION_LIMIT_REACHED";
};
export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];
export declare class AppError extends Error {
    code: ErrorCode;
    statusCode: number;
    details?: Record<string, any> | undefined;
    constructor(code: ErrorCode, message: string, statusCode?: number, details?: Record<string, any> | undefined);
    toJSON(): ApiErrorResponse;
}
export declare const ErrorStatusMap: Record<ErrorCode, number>;
