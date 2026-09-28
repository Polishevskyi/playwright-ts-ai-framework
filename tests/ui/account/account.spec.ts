import { expect, test } from '../../../fixtures';

test.describe('account', () => {
    test(
        'should open the account page with a saved session',
        { tag: '@smoke' },
        async ({ accountPage }) => {
            await accountPage.open();

            await expect(accountPage.heading).toBeVisible();
            await expect(accountPage.header.userMenu).toBeVisible();
        }
    );
});
