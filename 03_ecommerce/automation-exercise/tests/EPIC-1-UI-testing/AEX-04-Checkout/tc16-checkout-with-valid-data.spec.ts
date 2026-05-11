import { request } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { URLS } from '../../../resources/config/urls';
import { createUser, deleteUser } from '../../../framework/api/user.api';
import { buildUser } from '../../../framework/data/user.factory';
import { UserBase } from '../../../framework/data/user.base';
import { promises as fs } from 'fs';


// ── Test Data ──────────────────────────────────────────────────────────────


// ── TC-16 | Checkout with Valid Data ────────────────────────────────────────────
test.describe('AEX-04 – Checkout', () => {    

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
test('TC-16 | Checkout with Valid Data', async ({ page }) => {

    await epic('UI Testing');
    await story('AEX-04 Checkout');
    await testCaseId('TC-16 - Checkout with Valid Data');
    await severity('critical');

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
        .filter({ has: page.locator('a[href="/product_details/6"]') });
      await product.locator('text=View Product').click();
      await expect(page.getByRole('spinbutton')).toBeVisible();
      await page.getByRole('spinbutton').fill('2');
      await page.getByRole('button', { name: /add to cart/i }).click();
    });

    await step('Verify cart update', async () => {
      await expect(page.getByText('Added!')).toBeVisible();
      await page.locator('text=View Cart').click();
      await expect(page.getByText('Summer White Top')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('2');
    });

    await step('Proceed to checkout', async () => {
      await page.locator('text=Proceed To Checkout').click();
    });

    await step('Verify purchase', async () => {
      await expect(page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible();
      const delivery = page.locator('#address_delivery');
      const billing = page.locator('#address_invoice');
      for (const block of [delivery, billing]) {
        await expect(block).toContainText(`${user.firstName} ${user.lastName}`);
        await expect(block).toContainText(user.address);
        await expect(block).toContainText(`${user.city} ${user.state} ${user.zipCode}`);
        await expect(block).toContainText(user.country);
        await expect(block).toContainText(user.phone);
      }     
      await expect(page.getByText('Summer White Top')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('2');
      await page.locator('text=Place Order').click();
    });

    await step('Payment', async () => {
      await page.locator('input[data-qa="name-on-card"]').fill(`${user.firstName} ${user.lastName}`);
      await page.locator('input[data-qa="card-number"]').fill('4111111111111111');
      await page.locator('input[data-qa="cvc"]').fill('123');
      await page.locator('input[data-qa="expiry-month"]').fill('12');
      await page.locator('input[data-qa="expiry-year"]').fill('2027');
      await page.locator('button[data-qa="pay-button"]').click();
    });

    await step('Verify order placed successfully', async () => {
      await expect(page.getByText('Order Placed!')).toBeVisible();
      await page.locator('text=Download Invoice').click();    
    });
    
    await step('Download and verify invoice', async () => {
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByText('Download Invoice').click(),
      ]);
      const filePath = await download.path();
        if (!filePath) throw new Error('Download failed');
      const content = await fs.readFile(filePath, 'utf-8');
      const normalized = content.replace(/\s+/g, ' ').trim();
      expect(normalized).toContain(`Hi ${user.firstName} ${user.lastName}`);
      expect(normalized).toContain('Thank you');
    });

  });
});
