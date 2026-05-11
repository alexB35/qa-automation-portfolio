import { test as base, expect } from '@playwright/test';

export { expect };

export const test = base.extend({
  page: async ({ page }, use) => {
    // Block ad requests
    await page.route('**/*doubleclick*', r => r.abort());
    await page.route('**/*googlesyndication*', r => r.abort());
    await page.route('**/*googleadservices*', r => r.abort());
    await page.route('**/*google-analytics*', r => r.abort());

    // Block google_vignette navigation
    page.on('framenavigated', async frame => {
      if (frame.url().includes('#google_vignette')) {
        await page.evaluate(() => {
          window.location.hash = '';
        });
      }
    });

    await use(page);
  },
});