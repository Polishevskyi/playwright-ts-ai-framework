import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
    constructor(private readonly page: Page) {}

    get signInLink(): Locator {
        return this.page.getByTestId('nav-sign-in');
    }

    get userMenu(): Locator {
        return this.page.getByTestId('nav-menu');
    }

    get signOutLink(): Locator {
        return this.page.getByTestId('nav-sign-out');
    }

    async signOut(): Promise<void> {
        await this.userMenu.click();
        await this.signOutLink.click();
    }
}
