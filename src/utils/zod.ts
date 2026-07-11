import { z } from 'zod';

export const registerSchema = z.object({
    email: z.email('Invalid email format'),
    username: z.string().min(3, 'Username must be at least 3 characters').max(30, 'Username too long'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(30, 'password too long')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
});

export const loginSchema = z.object({
    identifier: z.string().min(1, 'Email or username is required'),
    password: z.string().min(1, 'Password is required'),
});