import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { buildUser } from '../../../framework/data/user.factory';
import { ProductPage } from '../../../framework/ui/pages/product.page';

const user = buildUser();

test.describe('AEX-05 – Check Product', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-21 | Write a Product Review', async ({ page }) => {

    const productPage = new ProductPage(page);
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-21');
    await severity('minor');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Open product details', async () => {
      await productPage.viewProduct(6);
    });

    await step('Write product review', async () => {
      await productPage.writeReview(
        user.name, 
        user.email, 
        'This is a very nice top, I will buy another one for sure ! :)'
      );
    });

    await step('Verify review submission', async () => {
      await expect(page.getByText(`Thank you for your review.`)).toBeVisible();
    });
  });
});