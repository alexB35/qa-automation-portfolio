import { request } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { createUser, deleteUser } from '../../../framework/api/user.api';
import { buildUser } from '../../../framework/data/user.factory';
import { UserBase } from '../../../framework/data/user.base';

// ── Test Data ──────────────────────────────────────────────────────────────


// ── TC-06 | Successful login ────────────────────────────────────────────
test.describe('AEX-02 – User Login', () => {
  
// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });
    
      let user: UserBase;
      let apiContext: any;

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
test('TC-06 | Successful login', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-02 User Login');
    await testCaseId('TC-06 - Successful login');
    await severity('critical');
 
    await step('Navigate to login page', async () => {
      await page.goto(URLS.loginUrl);
      await dismissGDPR(page);
    });

    await step('Login with valid credentials', async () => {
      await page.locator('input[data-qa="login-email"]').fill(user.email);
      await page.locator('input[data-qa="login-password"]').fill(user.password);
      await page.locator('button[data-qa="login-button"]').click();
    });

    await step('Verify successful login', async () => {
      await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();
    });
  });
});