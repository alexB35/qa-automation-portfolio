import { request } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, deleteUser } from '../../../framework/api/user.api';

// ── Test Data ──────────────────────────────────────────────────────────────
const user = buildUser();

// ── TC-04 | Unavailable email address ────────────────────────────────
test.describe('AEX-01 – User Registration', () => {

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
test('TC-04 | Unavailable email address', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-04 - Unavailable email address');
    await severity('medium');
 
    await step('Navigate to login/signup page', async () => {
      await page.goto(URLS.loginUrl);
      await dismissGDPR(page);
      await expect(page.getByText('New User Signup!')).toBeVisible();
    });
 
    await step('Enter already registered email', async () => {
      await page.locator('input[data-qa="signup-name"]').fill(user.name);
      await page.locator('input[data-qa="signup-email"]').fill(user.email);
      await page.locator('button[data-qa="signup-button"]').click();
    });


    await step('Verify duplicate email error', async () => {
      await expect(page.getByText('Email Address already exist!')).toBeVisible();
    });
  });
});