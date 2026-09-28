import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';
import { StorageState } from './enums/storage-state';

const IS_CI = !!process.env.CI;

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
        baseURL: env.APP_URL,
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
            use: { baseURL: env.API_URL },
        },
        {
            name: 'chromium',
            testIgnore: /.*\/api\/.*\.spec\.ts/,
            dependencies: ['setup'],
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
                storageState: StorageState.CUSTOMER,
            },
        },
    ],
});
