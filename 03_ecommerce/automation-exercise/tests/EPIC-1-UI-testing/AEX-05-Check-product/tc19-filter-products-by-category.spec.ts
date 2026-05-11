import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-19 | Filter Product by Categories ────────────────────────────────────────────
test.describe('AEX-05 – Check Product', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });
    
// ── Tests ──────────────────────────────────────────────────────────
test('TC-19 | Filter Product by Categories', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-19 - Filter Product by Categories');
    await severity('medium');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Open product category', async () => {
      await page.locator('a[href="#Men"]').click();
      await page.locator('a[href="/category_products/6"]').click();
    });

    await step('Verify filtered products', async () => {
      await expect(page.getByText(`Men - Jeans Products`)).toBeVisible();
      await expect(page.getByText('Grunt Blue Slim Fit Jeans').first()).toBeVisible();
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/37"]') });
      await product.locator('text=View Product').click();
      await expect(page.getByText(`Category: Men > Jeans`)).toBeVisible();
    });
  });
});