import { faker } from '@faker-js/faker';
import { env } from '../../../config/env';
import { Messages } from '../../../enums/messages';
import { expect, test } from '../../../fixtures';

test.describe('login', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
    });

    test(
        'should log in with valid credentials',
        { tag: '@smoke' },
        async ({ loginPage, accountPage }) => {
            await loginPage.login(env.APP_EMAIL, env.APP_PASSWORD);

            await expect(accountPage.heading).toBeVisible();
            await expect(accountPage.header.userMenu).toBeVisible();
        }
    );

    test('should require email and password', { tag: '@regression' }, async ({ loginPage }) => {
        await loginPage.loginButton.click();

        await expect(loginPage.emailError).toHaveText(Messages.EMAIL_REQUIRED);
        await expect(loginPage.passwordError).toHaveText(Messages.PASSWORD_REQUIRED);
    });

    test('should reject a malformed email', { tag: '@regression' }, async ({ loginPage }) => {
        await loginPage.login('not-an-email', faker.internet.password({ length: 12 }));

        await expect(loginPage.emailError).toHaveText(Messages.EMAIL_FORMAT_INVALID);
    });

    test('should reject unknown credentials', { tag: '@regression' }, async ({ loginPage }) => {
        await loginPage.login(faker.internet.email(), faker.internet.password({ length: 12 }));

        await expect(loginPage.loginError).toHaveText(Messages.LOGIN_FAILED);
    });

    // logs in on its own: signing out of the shared session would invalidate it for other tests
    test('should sign out', { tag: '@regression' }, async ({ loginPage, accountPage }) => {
        await loginPage.login(env.APP_EMAIL, env.APP_PASSWORD);
        await expect(accountPage.heading).toBeVisible();

        await accountPage.header.signOut();

        await expect(loginPage.header.signInLink).toBeVisible();
        await expect(loginPage.header.userMenu).toBeHidden();
    });
});
