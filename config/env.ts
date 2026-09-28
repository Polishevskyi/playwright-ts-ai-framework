import dotenv from 'dotenv';
import { z } from 'zod';

const environment = process.env.ENVIRONMENT ?? 'dev';
dotenv.config({ path: `./env/.env.${environment}`, quiet: true });

const EnvSchema = z.object({
    APP_URL: z.url(),
    API_URL: z.url(),
    APP_EMAIL: z.email(),
    APP_PASSWORD: z.string().min(1),
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
    throw new Error(
        `Invalid environment in env/.env.${environment}:\n${z.prettifyError(parsed.error)}`
    );
}

export const env = parsed.data;
