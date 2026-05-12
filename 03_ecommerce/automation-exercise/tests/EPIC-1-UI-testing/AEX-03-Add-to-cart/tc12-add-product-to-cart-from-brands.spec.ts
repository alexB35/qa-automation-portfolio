import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-12 | Add Product to Cart from Brands ────────────────────────────────────────────
test.describe('AEX-03 – Add Product to Cart', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-12 | Add Product to Cart from Brands', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-12 - Add Product to Cart from Brands');
    await severity('high');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Open product from brands', async () => {
      await page.locator('a[href="/brand_products/H&M"]').click();
    });

    await step('Add product to cart', async () => {  
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/28"]') });
      await product.locator('text=View Product').click();
      await page.waitForLoadState('networkidle');
      await page.getByRole('button', { name: /add to cart/i }).click();
    });   

    await step('Verify cart update', async () => {
      await expect(page.getByText('Added!')).toBeVisible();
      await page.locator('text=View Cart').click();
      await expect(page.getByText('Pure Cotton V-Neck T-Shirt')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('1');
    });
  });
});