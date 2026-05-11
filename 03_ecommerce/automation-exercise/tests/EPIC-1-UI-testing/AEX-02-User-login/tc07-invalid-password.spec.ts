import { request } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, deleteUser } from '../../../framework/api/user.api';

// ── Test Data ──────────────────────────────────────────────────────────────
const user = buildUser();

// ── TC-07 | Invalid password ────────────────────────────────────────────
test.describe('AEX-02 – User Login', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeAll(async ({ request }) => {
    const result = await createUser(request, user);
    expect(result).toHaveProperty('responseCode', 201);
  });

  test.afterAll(async ({ request }) => {
    await deleteUser(request, user.email, user.password);
  });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-07 | Invalid password', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-02 User Login');
    await testCaseId('TC-07 - Invalid password');
    await severity('high');
 
    await step('Navigate to login / signup page', async () => {
      await page.goto(URLS.loginUrl);
      await dismissGDPR(page);
      await page.locator('input[data-qa="login-email"]').fill(user.email);
      await page.locator('input[data-qa="login-password"]').fill('WrongPass123!');
      await page.locator('button[data-qa="login-button"]').click();
    });

    await step('Verify invalid password error', async () => {
      await expect(page.getByText(`Your email or password is incorrect!`)).toBeVisible();
    });
  });
});