import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';

test.describe('AEX-05 – Check Product', () => {

    test.use({ storageState: { cookies: [], origins: [] } });
    
test('TC-19 | Filter Product by Categories', async ({ page }) => {

    const productPage = new ProductPage(page);
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-19');
    await severity('normal');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Open product category', async () => {
      await productPage.filterByCategory('Men', 6);
    });

    await step('Verify filtered products', async () => {
      await expect(page.getByText('Men - Jeans Products')).toBeVisible();
      await expect(page.getByText('Grunt Blue Slim Fit Jeans').first()).toBeVisible();
    });

    await step('Open product details', async () => {
      await productPage.viewProduct(37);
    });

    await step('Verify product category', async () => {
      await expect(page.locator('.product-information')).toContainText('Category');
      await expect(page.locator('.product-information')).toContainText('Men');
      await expect(page.locator('.product-information')).toContainText('Jeans');
    });
  });
});