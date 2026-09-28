import { test as base } from '@playwright/test';
import { ApiClient } from '../api/api-client';
import { LoginResponseSchema } from '../api/schemas/auth.schema';
import { env } from '../config/env';
import { ApiEndpoints } from '../enums/api-endpoints';

export type ApiFixtures = {
    api: ApiClient;
    authToken: string;
};

export const test = base.extend<ApiFixtures>({
    api: async ({ request }, use) => {
        await use(new ApiClient(request, env.API_URL));
    },

    // test-scoped: tokens expire after 5 minutes
    authToken: async ({ api }, use) => {
        const { status, body } = await api.post(ApiEndpoints.LOGIN, {
            body: { email: env.APP_EMAIL, password: env.APP_PASSWORD },
        });

        if (status !== 200) {
            throw new Error(`authToken fixture: API login failed with status ${status}`);
        }

        await use(LoginResponseSchema.parse(body).access_token);
    },
});
