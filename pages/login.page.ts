import { Locator, Page } from '@playwright/test';
import { AppRoutes } from '../enums/routes';
import { HeaderComponent } from './components/header.component';

export class LoginPage {
    readonly header: HeaderComponent;

    constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    get heading(): Locator {
        return this.page.getByRole('heading', { name: 'Login' });
    }

    get emailInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Email address' });
    }

    get passwordInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Password' });
    }

    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login', exact: true });
    }

    get emailError(): Locator {
        return this.page.getByTestId('email-error');
    }

    get passwordError(): Locator {
        return this.page.getByTestId('password-error');
    }

    get loginError(): Locator {
        return this.page.getByTestId('login-error');
    }

    async open(): Promise<void> {
        await this.page.goto(AppRoutes.LOGIN);
        await this.loginButton.waitFor();
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
