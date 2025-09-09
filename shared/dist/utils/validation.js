import { z } from 'zod';
import { AppError, ErrorCodes } from '../types/api.js';
export function validateSchema(schema, data) {
    try {
        return schema.parse(data);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            const details = error.errors.reduce((acc, err) => {
                const path = err.path.join('.');
                acc[path] = err.message;
                return acc;
            }, {});
            throw new AppError(ErrorCodes.VALIDATION_ERROR, 'Validation failed', 400, details);
        }
        throw error;
    }
}
export function createValidator(schema) {
    return (data) => validateSchema(schema, data);
}
