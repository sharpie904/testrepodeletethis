import { z } from 'zod';
export declare const LoginSchema: any;
export declare const RegisterSchema: any;
export declare const UserSchema: any;
export declare const SessionSchema: any;
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type User = z.infer<typeof UserSchema>;
export type Session = z.infer<typeof SessionSchema>;
