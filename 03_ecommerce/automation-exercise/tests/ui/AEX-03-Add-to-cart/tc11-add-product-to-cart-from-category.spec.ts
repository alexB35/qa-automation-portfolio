import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';
import { CartPage } from '../../../framework/ui/pages/cart.page';

test.describe('AEX-03 – Add Product to Cart', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-11 | Add Product to Cart from Category', async ({ page }) => {
 
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-11');
    await severity('critical');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Open product category', async () => {
      await productPage.filterByCategory('Kids', 4);
    });

    await step('Add product to cart', async () => {   
      await productPage.addToCartFromList('Cotton Mull Embroidered Dress');
    });   

    await step('Verify cart update', async () => {
      await cartPage.goto();
      await expect(page.getByText('Cotton Mull Embroidered Dress')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('1');
    });
  });
});