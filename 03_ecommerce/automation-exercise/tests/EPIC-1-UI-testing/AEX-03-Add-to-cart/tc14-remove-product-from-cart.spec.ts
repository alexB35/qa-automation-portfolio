import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-14 | Remove Product from Cart ────────────────────────────────────────────
test.describe('AEX-03 – Add Product to Cart', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-14 | Remove Product from Cart', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-14 - Remove Product from Cart');
    await severity('high');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Add product to cart', async () => {
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/31"]') });
      await product.locator('text=View Product').click();
      await page.getByRole('button', { name: /add to cart/i }).click();
    });

    await step('Verify cart', async () => {
      await expect(page.getByText(`Added!`)).toBeVisible();
      await page.locator('text=View Cart').click();
      await expect(page.getByText('Pure Cotton Neon Green Tshirt')).toBeVisible();
    });

    await step('Remove product from cart', async () => {
      await page.locator('a.cart_quantity_delete[data-product-id="31"]').click();
      await expect(page.getByText('Cart is empty!')).toBeVisible();
    });
  });
});