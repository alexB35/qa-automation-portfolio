import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-10a | Add Product to Cart ────────────────────────────────────────────
test.describe('AEX-03 – Add Product to Cart', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-10a | Add Product to Cart', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-10a - Add Product to Cart');
    await severity('critical');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Add product to cart', async () => {
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/1"]') });
      await product.locator('text=View Product').click();
      await expect(page.getByRole('spinbutton')).toBeVisible();
      await page.getByRole('spinbutton').fill('2');
      await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible();
      await page.getByRole('button', { name: /add to cart/i }).click();
    });

    await step('Verify cart update', async () => {
      await expect(page.getByText('Added!')).toBeVisible();
      await page.locator('text=View Cart').click();
      await expect(page.getByText('Blue Top')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('2');
    });
  });
});