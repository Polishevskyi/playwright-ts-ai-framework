import { Locator, Page } from '@playwright/test';
import { AppRoutes } from '../enums/routes';
import { HeaderComponent } from './components/header.component';

export class AccountPage {
    readonly header: HeaderComponent;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    get heading(): Locator {
        return this.page.getByRole('heading', { name: 'My account', level: 1 });
    }

    async open(): Promise<void> {
        await this.page.goto(AppRoutes.ACCOUNT);
    }
}
