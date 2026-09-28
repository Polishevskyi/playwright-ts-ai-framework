import { env } from '../../config/env';
import { StorageState } from '../../enums/storage-state';
import { expect, test } from '../../fixtures';

test.describe('auth setup', () => {
    test('authenticate customer and save storage state', async ({
        page,
        loginPage,
        accountPage,
    }) => {
        await loginPage.open();
        await loginPage.login(env.APP_EMAIL, env.APP_PASSWORD);
        await expect(accountPage.heading).toBeVisible();

        await page.context().storageState({ path: StorageState.CUSTOMER });
    });
});
