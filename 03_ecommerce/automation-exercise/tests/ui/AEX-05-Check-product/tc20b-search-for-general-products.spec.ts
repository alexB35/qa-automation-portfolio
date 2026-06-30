import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';

test.describe('AEX-05 – Check Product', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-20b | Search for general products', async ({ page }) => {

    const productPage = new ProductPage(page);
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-20b');
    await severity('critical');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Search product', async () => {
      await productPage.searchProduct('blue');
    });

    await step('Verify searched product', async () => {
      await expect(page.getByText('Searched Products')).toBeVisible();
      const productNames = page.locator('.productinfo p');
      const count = await productNames.count();
      expect(count).toBeGreaterThan(1);
    });
  });
});