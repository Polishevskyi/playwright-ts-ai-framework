import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: ['node_modules', 'playwright-report', 'test-results', 'blob-report'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            'no-console': 'error',
            'prefer-const': 'error',
        },
    },
    {
        files: ['tests/**/*.ts', 'pages/**/*.ts', 'fixtures/**/*.ts'],
        ...playwright.configs['flat/recommended'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            'playwright/no-wait-for-timeout': 'error',
            'playwright/no-page-pause': 'error',
            'playwright/no-focused-test': 'error',
            'playwright/no-skipped-test': ['error', { allowConditional: true }],
            'playwright/no-force-option': 'error',
            'playwright/no-raw-locators': 'warn',
            'playwright/no-nth-methods': 'warn',
            'playwright/no-conditional-in-test': 'error',
            'playwright/prefer-web-first-assertions': 'error',
            'playwright/prefer-to-be': 'error',
            'playwright/prefer-to-have-length': 'error',
            'playwright/require-top-level-describe': 'error',
            'playwright/missing-playwright-await': 'error',
            'playwright/valid-expect': 'error',
            'playwright/expect-expect': 'error',
        },
    },
    {
        files: ['**/*.mts', '*.config.ts'],
        extends: [tseslint.configs.disableTypeChecked],
    },
    prettier
);
