import { z } from 'zod';

// POST /users/login answers 401 with {"error"}, GET /users/me with {"message"}
export const ErrorResponseSchema = z.strictObject({
    error: z.string(),
});

export const MessageResponseSchema = z.strictObject({
    message: z.string(),
});
