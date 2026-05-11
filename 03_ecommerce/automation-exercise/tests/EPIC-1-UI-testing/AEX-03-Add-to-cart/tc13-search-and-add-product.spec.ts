import { request } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { createUser } from '../../../framework/api/user.api';
import { buildUser } from '../../../framework/data/user.factory';
import { UserBase } from '../../../framework/data/user.base';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-13 | Search and Add Product to Cart ────────────────────────────────────────────
test.describe('AEX-03 – Add Product to Cart', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Shared State ───────────────────────────────────────────────────
      let user: UserBase;
      let apiContext: any;

// ── Hooks ──────────────────────────────────────────────────────────
    test.beforeEach(async () => {
      apiContext = await request.newContext();
      user = buildUser();
      await createUser(apiContext, user);
    });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-13 | Search and Add Product to Cart', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-13 - Search and Add Product to Cart');
    await severity('high');
 
    await step('Login with valid credentials', async () => {
          await page.goto(URLS.loginUrl);
          await dismissGDPR(page);
          await page.locator('input[data-qa="login-email"]').fill(user.email);
          await page.locator('input[data-qa="login-password"]').fill(user.password);
          await page.locator('button[data-qa="login-button"]').click();
          await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();    
        });
    
    await step('Navigate to product page', async () => {
      await page.goto(URLS.productUrl);
    });

    await step('Search product', async () => {
      await page.locator('input[id="search_product"]').fill('Colour Blocked Shirt – Sky Blue');
      await page.locator('button[id="submit_search"]').click();
    });

    await step('Add product to cart', async () => {
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/24"]') });
      await product.locator('text=View Product').click();
      await page.getByRole('spinbutton').fill('5');
      await page.getByRole('button', { name: /add to cart/i }).click();
    });

    await step('Verify cart update', async () => {
      await expect(page.getByText('Added!')).toBeVisible();
      await page.locator('text=View Cart').click();
      await expect(page.getByText('Colour Blocked Shirt – Sky Blue')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('5');
    });
  });
});