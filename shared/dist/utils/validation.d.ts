import { z } from 'zod';
export declare function validateSchema<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T>;
export declare function createValidator<T extends z.ZodTypeAny>(schema: T): (data: unknown) => z.infer<T>;
