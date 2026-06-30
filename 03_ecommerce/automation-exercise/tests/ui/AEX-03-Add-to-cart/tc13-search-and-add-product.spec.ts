import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';
import { CartPage } from '../../../framework/ui/pages/cart.page';

test.describe('AEX-03 – Add Product to Cart', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-13 | Search and Add Product to Cart', async ({ page }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-13');
    await severity('critical');
    
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Search product', async () => {
      await productPage.searchProduct('Colour Blocked Shirt – Sky Blue');
    });

    await step('Add product to cart from details page', async () => {
      await productPage.addToCartFromDetail('5', 24);
    });

    await step('Verify cart update', async () => {     
      await cartPage.goto();
      await expect(page.getByText('Colour Blocked Shirt – Sky Blue')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('5');
    });
  });
});