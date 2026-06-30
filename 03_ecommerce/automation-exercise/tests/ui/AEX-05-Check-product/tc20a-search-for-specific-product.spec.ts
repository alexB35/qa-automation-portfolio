import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';

test.describe('AEX-05 – Check Product', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-20a | Search for specific product', async ({ page }) => {

    const productPage = new ProductPage(page);
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-20a');
    await severity('critical');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Search product', async () => {
      await productPage.searchProduct('Blue Cotton Indie Mickey Dress');
    });

    await step('Verify searched product', async () => {
      await expect(page.getByText(`Searched Products`)).toBeVisible();
      await expect(page.getByText('Blue Cotton Indie Mickey Dress').first()).toBeVisible();
    });
  });
});