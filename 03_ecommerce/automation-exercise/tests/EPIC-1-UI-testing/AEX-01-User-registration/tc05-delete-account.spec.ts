import { request } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser } from '../../../framework/api/user.api';

// ── Test Data ──────────────────────────────────────────────────────────────
const user = buildUser();  

// ── TC-05 | Delete account ────────────────────────────────────────────
test.describe('AEX-01 – User Registration', () => {

// ── Configuration ──────────────────────────────────────────────────  
    test.use({ storageState: { cookies: [], origins: [] } });

    test.beforeAll(async ({ request }) => {
    const result = await createUser(request, user);
    expect(result).toHaveProperty('responseCode', 201);
  });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-05 | Delete account after registration', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-05 - Delete account');
    await severity('medium');
 
    await step('Navigate to login / signup page', async () => {
      await page.goto(URLS.loginUrl);
      await dismissGDPR(page);
      await page.locator('input[data-qa="login-email"]').fill(user.email);
      await page.locator('input[data-qa="login-password"]').fill(user.password);
      await page.locator('button[data-qa="login-button"]').click();
      await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

    });
 
    await step('Delete account', async () => {
      await page.getByRole('link', { name: ' Delete Account' }).click();
    });
 
    await step('Verify account deleted', async () => {
      await expect(page.getByText('Account Deleted!')).toBeVisible();
    });
  });
});