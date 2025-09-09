import { z } from 'zod';
import { AppError, ErrorCodes } from '../types/api.js';

export function validateSchema<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown
): z.infer<T> {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const details = error.errors.reduce((acc, err) => {
        const path = err.path.join('.');
        acc[path] = err.message;
        return acc;
      }, {} as Record<string, string>);

      throw new AppError(
        ErrorCodes.VALIDATION_ERROR,
        'Validation failed',
        400,
        details
      );
    }
    throw error;
  }
}

export function createValidator<T extends z.ZodTypeAny>(schema: T) {
  return (data: unknown): z.infer<T> => validateSchema(schema, data);
}