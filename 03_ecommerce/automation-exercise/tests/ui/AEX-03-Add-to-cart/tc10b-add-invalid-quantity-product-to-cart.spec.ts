import { epic, story, testCaseId, severity, step, issue } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';
import { CartPage } from '../../../framework/ui/pages/cart.page';

test.describe('AEX-03 – Add Product to Cart', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-10b | Add Invalid Product Quantity to Cart', async ({ page }) => {
 
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
  
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-10b');
    await severity('critical');
    await issue('AEX-B-02 - Add invalid product quantity to cart', 'https://alexb35.atlassian.net/browse/AEX-46');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Add product to cart from details page', async () => {
      await productPage.addToCartFromDetail('-50', 2);
    });

    await step('Verify cart update', async () => {     
      await cartPage.goto();
      await expect(page.getByText('Men Tshirt')).toBeVisible();
      const quantity = Number(await page.locator('.cart_quantity button').textContent());
      expect(quantity).toBeGreaterThanOrEqual(1);
    });
  });
});