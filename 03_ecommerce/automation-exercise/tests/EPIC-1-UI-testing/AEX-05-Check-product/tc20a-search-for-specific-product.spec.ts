import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-20a | Search for specific product ────────────────────────────────────────────
test.describe('AEX-05 – Check Product', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-20a | Search for specific product', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-20a - Search for specific product');
    await severity('high');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Search product', async () => {
      await page.locator('input[id="search_product"]').fill('Blue Cotton Indie Mickey Dress');
      await page.locator('button[id="submit_search"]').click();
    });

    await step('Verify searched product', async () => {
      await expect(page.getByText(`Searched Products`)).toBeVisible();
      await expect(page.getByText('Blue Cotton Indie Mickey Dress').first()).toBeVisible();
    });
  });
});