import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';

// ── Test Data ──────────────────────────────────────────────────────────────
const user = buildUser();


// ── TC-21 | Write Product Review ────────────────────────────────────────────
test.describe('AEX-05 – Check Product', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-21 | Write Product Review', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-05 Check Product');
    await testCaseId('TC-21 - Write Product Review');
    await severity('low');
 
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
      await dismissGDPR(page);
    });

    await step('Open product details', async () => {
      await expect(page.getByText('Summer White Top').first()).toBeVisible();
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/6"]') });
      await product.locator('text=View Product').click();
    });

    await step('Write product review', async () => {
      await expect(page.getByText(`Write your review`)).toBeVisible();
      await page.locator('input[id="name"]').fill(user.name);
      await page.locator('input[id="email"]').fill(user.email);
      await page.locator('textarea[id="review"]').fill('This is a very nice top, I will buy another one for sure ! :)');
      await page.locator('button[id="button-review"]').click();
    });

    await step('Verify review submission', async () => {
      await expect(page.getByText(`Thank you for your review.`)).toBeVisible();
    });

  });
});