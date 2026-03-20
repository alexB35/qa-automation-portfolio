import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../01_banking/parabank/tests', // from 04_other
  timeout: 30_000,
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: '../01_banking/parabank/outputs/playwright-report' }]],
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
  },
});