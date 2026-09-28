import { test as base } from '@playwright/test';
import { AccountPage } from '../pages/account.page';
import { LoginPage } from '../pages/login.page';

export type PageFixtures = {
    loginPage: LoginPage;
    accountPage: AccountPage;
};

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
});
