import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';
import { CartPage } from '../../../framework/ui/pages/cart.page';

test.describe('AEX-03 – Add Product to Cart', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-12 | Add Product to Cart from Brands', async ({ page }) => {
 
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-12');
    await severity('critical');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Open product from brands', async () => {
      await productPage.filterByBrand('H&M');
    }); 

    await step('Add product to cart from details page', async () => {
      await productPage.addToCartFromList('Pure Cotton V-Neck T-Shirt');
    });

    await step('Verify cart update', async () => {     
      await cartPage.goto();
      await expect(page.getByText('Pure Cotton V-Neck T-Shirt')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('1');
    });
  });
});