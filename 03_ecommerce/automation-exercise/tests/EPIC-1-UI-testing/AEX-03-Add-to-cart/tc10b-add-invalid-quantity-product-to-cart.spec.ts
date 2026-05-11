import { epic, story, testCaseId, severity, step, issue } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-10b | Add Invalid Quantity Product to Cart ────────────────────────────────────────────
test.describe('AEX-03 – Add Product to Cart', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-10b | Add Invalid Quantity Product to Cart', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-10b - Add Invalid Quantity Product to Cart');
    await severity('high');
    await issue('AEX-B-02 - Add invalid product quantity to cart', 'https://alexb35.atlassian.net/browse/AEX-46');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    }); 

    await step('Add product to cart', async () => {
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/2"]') });
      await product.locator('text=View Product').click();
      await page.getByRole('spinbutton').fill('-50');
      await page.getByRole('button', { name: /add to cart/i }).click();
    });

    await step('Verify negative quantity is not accepted', async () => {
      await page.locator('text=View Cart').click();
      const qty = page.locator('.cart_quantity button');
      const value = Number(await qty.textContent());
      expect(value).toBeGreaterThanOrEqual(1);
    });
  });
});