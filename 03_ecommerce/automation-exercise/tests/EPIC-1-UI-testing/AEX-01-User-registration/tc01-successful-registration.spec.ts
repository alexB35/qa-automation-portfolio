import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { BASE_URL } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';
import { RegisterPage } from '../../../framework/ui/pages/register.page';

// ── Test Data ──────────────────────────────────────────────────────────────


// ── TC-01 | Successful user registration ──────────────────────────────────
test.describe('AEX-01 – User Registration', () => {

// ── Configuration ────────────────────────────────────────────────── 
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
  test('TC-01 | Successful user registration with valid data', async ({ page }) => {

    const user = buildUser();
    const registerPage = new RegisterPage(page);

    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-01 - Successful user registration');
    await severity('critical');

    await step('Navigate to homepage', async () => {
      await page.goto(BASE_URL);
      await dismissGDPR(page);
      await expect(page).toHaveURL(BASE_URL + '/');
    });

    await step('Navigate to login/signup page', async () => {
      await registerPage.goToSignup();
      await expect(page.getByText('New User Signup!')).toBeVisible();
    });

    await step('Enter name and email', async () => {
      await registerPage.fillSignupNameAndEmail(user.name, user.email);
    });

    await step('Fill registration form', async () => {
      await registerPage.fillRegistrationForm(user);
    });

    await step('Verify account created successfully', async () => {
      await expect(page.getByText('Account Created!')).toBeVisible();
      await registerPage.clickContinue();
      await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();
    });
  });
});