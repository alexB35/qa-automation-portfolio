import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-20b | Search for general products ────────────────────────────────────────────
test.describe('AEX-05 – Check Product', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-20b | Search for general products', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-20b - Search for general products');
    await severity('critical');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Search product', async () => {
      await page.locator('input[id="search_product"]').fill('blue');
      await page.locator('button[id="submit_search"]').click();
    });

    await step('Verify searched product', async () => {
      await expect(page.getByText(`Searched Products`)).toBeVisible();
      const products = page.locator('.product-image-wrapper');
      const texts = await products.allTextContents();
        expect(texts.length).toBeGreaterThan(1);
        expect(texts.every(t => t.toLowerCase().includes('blue'))).toBeTruthy();
    });

  });
});