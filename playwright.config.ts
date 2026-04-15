import { defineConfig } from '@playwright/test';

const isCI = process.env['CI'] !== undefined;

export default defineConfig({
  timeout: 10_000,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  fullyParallel: false,
  workers: 1,
  maxFailures: 0,

  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: './01_banking/parabank/outputs/allure-results' }],
    ['html', { outputFolder: './01_banking/parabank/outputs/playwright-report', open: 'never' }],
    ['junit', { outputFile: './01_banking/parabank/outputs/results.xml' }],
  ],

  projects: [
    {
      name: 'setup-parabank',
      testMatch: '**/auth.setup.ts',
      use: { browserName: 'firefox', headless: isCI },
    },
    {
      name: 'parabank',
      testDir: './01_banking/parabank/tests',
      dependencies: ['setup-parabank'],
      outputDir: './01_banking/parabank/outputs/test-results',
      use: {
        browserName: 'firefox',
        headless: isCI,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        storageState: './01_banking/parabank/.auth/session.json',
      },
    },
    {
      name: 'orange-hrm',
      testDir: './03_saas/orange-hrm/playwright-tests',
      outputDir: './03_saas/orange-hrm/outputs/test-results',
      use: {
        browserName: 'firefox',
        headless: isCI,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
      },
    },
  ],
});