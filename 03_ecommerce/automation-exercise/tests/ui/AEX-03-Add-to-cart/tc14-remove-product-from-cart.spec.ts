import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';
import { CartPage } from '../../../framework/ui/pages/cart.page';

test.describe('AEX-03 – Add Product to Cart', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-14 | Remove Product from Cart', async ({ page }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-14');
    await severity('critical');

    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Add product to cart from details page', async () => {
      await productPage.addToCartFromDetail('99', 31);
    });

    await step('Verify cart update', async () => {   
      await cartPage.goto();  
      await expect(page.getByText('Pure Cotton Neon Green Tshirt')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('99');
    });

    await step('Remove product from cart', async () => {
      await cartPage.removeProduct(31);
    });

    await step('Verify cart is empty', async () => {
      await cartPage.goto();
      await expect(page.locator('span#empty_cart')).toBeVisible();
    });
  });
});