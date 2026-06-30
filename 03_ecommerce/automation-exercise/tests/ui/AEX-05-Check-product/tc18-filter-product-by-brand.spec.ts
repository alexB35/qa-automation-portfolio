import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';

test.describe('AEX-05 – Check Product', () => {

    test.use({ storageState: { cookies: [], origins: [] } });
    
test('TC-18 | Filter Product by Brands', async ({ page }) => {

    const productPage = new ProductPage(page);
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-18');
    await severity('normal');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Open product from brands', async () => {
      await productPage.filterByBrand('Babyhug');
    }); 

    await step('Verify filtered products', async () => {
      await expect(page.getByText('Brand - Babyhug Products')).toBeVisible();
      await expect(page.getByText('Sleeves Top and Short - Blue').first()).toBeVisible();
    });

    await step('Open product details', async () => {
      await productPage.viewProduct(16);
    });

    await step('Verify product brand', async () => {
      await expect(page.locator('.product-information')).toContainText('Brand');
      await expect(page.locator('.product-information')).toContainText('Babyhug');
    });
  });
});