import { z } from 'zod';

export const LoginResponseSchema = z.strictObject({
    access_token: z.string().min(1),
    token_type: z.literal('bearer'),
    expires_in: z.int().positive(),
});

export const UserSchema = z.strictObject({
    id: z.string().min(1),
    provider: z.string().nullable(),
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string().nullable(),
    dob: z.string().nullable(),
    email: z.email(),
    totp_enabled: z.boolean(),
    created_at: z.string(),
    address: z.strictObject({
        street: z.string().nullable(),
        house_number: z.string().nullable(),
        city: z.string().nullable(),
        state: z.string().nullable(),
        country: z.string().nullable(),
        postal_code: z.string().nullable(),
    }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type User = z.infer<typeof UserSchema>;
