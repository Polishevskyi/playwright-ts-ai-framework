import { mergeTests } from '@playwright/test';
import { test as apiFixture } from './api.fixture';
import { test as pagesFixture } from './pages.fixture';

export const test = mergeTests(pagesFixture, apiFixture);
export { expect } from '@playwright/test';
