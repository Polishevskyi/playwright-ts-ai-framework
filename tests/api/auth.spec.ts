import { faker } from '@faker-js/faker';
import { LoginResponseSchema, UserSchema } from '../../api/schemas/auth.schema';
import { ErrorResponseSchema, MessageResponseSchema } from '../../api/schemas/error.schema';
import { env } from '../../config/env';
import { ApiEndpoints } from '../../enums/api-endpoints';
import { expect, test } from '../../fixtures';

test.describe('api/auth', () => {
    test(
        'POST /users/login returns a token for valid credentials',
        { tag: ['@api', '@smoke'] },
        async ({ api }) => {
            const { status, body } = await api.post(ApiEndpoints.LOGIN, {
                body: { email: env.APP_EMAIL, password: env.APP_PASSWORD },
            });

            expect(status).toBe(200);
            LoginResponseSchema.parse(body);
        }
    );

    test(
        'POST /users/login returns 401 for unknown credentials',
        { tag: '@api' },
        async ({ api }) => {
            const { status, body } = await api.post(ApiEndpoints.LOGIN, {
                body: {
                    email: faker.internet.email(),
                    password: faker.internet.password({ length: 12 }),
                },
            });

            expect(status).toBe(401);
            expect(ErrorResponseSchema.parse(body).error).toBe('Unauthorized');
        }
    );

    test('GET /users/me returns the current user', { tag: '@api' }, async ({ api, authToken }) => {
        const { status, body } = await api.get(ApiEndpoints.CURRENT_USER, { token: authToken });

        expect(status).toBe(200);
        expect(UserSchema.parse(body).email).toBe(env.APP_EMAIL);
    });

    test('GET /users/me returns 401 without a token', { tag: '@api' }, async ({ api }) => {
        const { status, body } = await api.get(ApiEndpoints.CURRENT_USER);

        expect(status).toBe(401);
        expect(MessageResponseSchema.parse(body).message).toBe('Unauthorized');
    });
});
