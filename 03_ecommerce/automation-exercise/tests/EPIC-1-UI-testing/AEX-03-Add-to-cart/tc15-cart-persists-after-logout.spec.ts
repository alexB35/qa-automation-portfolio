import { request } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { createUser, deleteUser } from '../../../framework/api/user.api';
import { buildUser } from '../../../framework/data/user.factory';
import { UserBase } from '../../../framework/data/user.base';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-15 | Cart Persists after Logout ────────────────────────────────────────────
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

    test.afterEach(async () => {
      await deleteUser(apiContext, user.email, user.password);
      await apiContext.dispose();
    });
 
    
// ── Tests ──────────────────────────────────────────────────────────
test('TC-15 | Cart Persists after Logout', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-15 - Cart Persists after Logout');
    await severity('medium');

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
 
    await step('Add product to cart', async () => {
      const product = page.locator('.product-image-wrapper')
        .filter({ has: page.locator('a[href="/product_details/15"]') });
      await product.locator('text=View Product').click();
      await expect(page.getByRole('spinbutton')).toBeVisible();
      await page.getByRole('spinbutton').fill('99');
      await page.getByRole('button', { name: /add to cart/i }).click();
    });

    await step('Verify cart update', async () => {
      await expect(page.getByText('Added!')).toBeVisible();
      await page.locator('text=View Cart').click();
      await expect(page.getByText('Printed Off Shoulder Top - White')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('99');
    });

    await step('Logout', async () => {
      await page.getByRole('link', { name: ' Logout' }).click();
      await expect(page).toHaveURL(/login/);
    });

    await step('Login again with same credentials', async () => {
      await page.goto(URLS.loginUrl);
      await page.locator('input[data-qa="login-email"]').fill(user.email);
      await page.locator('input[data-qa="login-password"]').fill(user.password);
      await page.locator('button[data-qa="login-button"]').click();
      await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();
    });

    await step('Verify cart persistence', async () => {
      await page.goto(URLS.cartUrl);
      await expect(page.getByText('Printed Off Shoulder Top - White')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('99');
    });
  });
});
