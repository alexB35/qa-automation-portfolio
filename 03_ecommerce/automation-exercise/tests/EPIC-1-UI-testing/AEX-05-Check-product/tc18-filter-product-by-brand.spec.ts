import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-18 | Filter Product by Brands ────────────────────────────────────────────
test.describe('AEX-05 – Check Product', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });
    
// ── Tests ──────────────────────────────────────────────────────────
test('TC-18 | Filter Product by Brands', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-18 - Filter Product by Brands');
    await severity('medium');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Open product from brands', async () => {
      await page.locator('a[href="/brand_products/Babyhug"]').click();
    });

    await step('Verify filtered products', async () => {
      await expect(page.getByText(`Brand - Babyhug Products`)).toBeVisible();
      await expect(page.getByText('Sleeves Top and Short - Blue').first()).toBeVisible();
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/16"]') });
      await product.locator('text=View Product').click();
      await expect(page.locator('.product-information p', { hasText: 'Brand' })).toBeVisible();
      await expect(page.locator('.product-information p', { hasText: 'Babyhug' })).toBeVisible();
    });
  });
});