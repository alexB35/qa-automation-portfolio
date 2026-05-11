import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-11 | Add Product to Cart from Category ────────────────────────────────────────────
test.describe('AEX-03 – Add Product to Cart', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-11 | Add Product to Cart from Category', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-11 - Add Product to Cart from Category');
    await severity('high');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Open product category', async () => {
      await page.locator('a[href="#Kids"]').click();
      await page.locator('a[href="/category_products/4"]').click();
    });

    await step('Add product to cart', async () => {   
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/20"]') });
      await product.locator('text=View Product').click();
      await page.getByRole('button', { name: /add to cart/i }).click();
    });   

    await step('Verify cart update', async () => {
      await expect(page.getByText('Added!')).toBeVisible();
      await page.locator('text=View Cart').click();
      await expect(page.getByText('Cotton Mull Embroidered Dress')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('1');
    });
  });
});