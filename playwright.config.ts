import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Environment is selected via ENVIRONMENT (defaults to "dev"):
 *   ENVIRONMENT=staging npx playwright test  ->  loads env/.env.staging
 */
const environment = process.env.ENVIRONMENT ?? 'dev';
dotenv.config({ path: `./env/.env.${environment}`, quiet: true });

const IS_CI = !!process.env.CI;
const STORAGE_STATE = '.auth/customer.json';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: IS_CI,
    retries: IS_CI ? 2 : 0,
    workers: IS_CI ? 2 : undefined,
    timeout: 60_000,
    expect: { timeout: 10_000 },

    reporter: IS_CI
        ? [['list'], ['html', { open: 'never' }]]
        : [['list'], ['html', { open: 'on-failure' }]],

    use: {
        baseURL: process.env.APP_URL,
        /* The app under test exposes test ids via data-test attributes */
        testIdAttribute: 'data-test',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 10_000,
        navigationTimeout: 30_000,
    },

    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'api',
            testMatch: /.*\/api\/.*\.spec\.ts/,
            use: { baseURL: process.env.API_URL },
        },
        {
            name: 'chromium',
            testIgnore: /.*\/api\/.*\.spec\.ts/,
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
                storageState: STORAGE_STATE,
            },
        },
    ],
});
