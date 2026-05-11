import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, deleteUser } from '../../../framework/api/user.api';

// ── Test Data ──────────────────────────────────────────────────────────────
const user = buildUser();


// ── TC-09 | Logout ────────────────────────────────────────────
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
test('TC-09 | Logout', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-02 User Login');
    await testCaseId('TC-09 - Logout');
    await severity('medium');
 
    await step('Navigate to login / signup page', async () => {
      await page.goto(URLS.loginUrl);
      await dismissGDPR(page);
      await page.locator('input[data-qa="login-email"]').fill(user.email);
      await page.locator('input[data-qa="login-password"]').fill(user.password);
      await page.locator('button[data-qa="login-button"]').click();
      await page.waitForURL('**/');
      await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

    });
 
    await step('Logout', async () => {
      await page.getByRole('link', { name: ' Logout' }).click();
    });
 
    await step('Verify logout successful', async () => {
      await expect(page.getByText('Signup / Login')).toBeVisible();
    });
    
  });
});