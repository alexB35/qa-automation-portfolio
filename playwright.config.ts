import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // default testDir folder not limited : precise folder in command line
  timeout: 30_000,
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'outputs/playwright-report' }]],
  use: {
    browserName: 'chromium',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
  },
});