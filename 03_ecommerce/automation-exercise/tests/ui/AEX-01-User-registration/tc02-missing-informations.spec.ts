import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { RegisterPage } from '../../../framework/ui/pages/register.page';
import { buildUser } from '../../../framework/data/user.factory';

test.describe('AEX-01 – User Registration', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-02 | Missing informations', async ({ page }) => {

    const user = buildUser();
    const registerPage = new RegisterPage(page);

    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-02');
    await severity('critical');

    await step('Navigate to signup page', async () => {
      await registerPage.goto();
    });

    await step('Enter name and email then proceed', async () => {
      await registerPage.fillSignupNameAndEmail(user.name, user.email);
      await expect(page.getByText('Enter Account Information')).toBeVisible();
    });

    await step('Submit form with empty required fields', async () => {
      await registerPage.clickCreateAccountButton();
    });

    await step('Verify form not submitted — password field invalid', async () => {
      await expect(page).toHaveURL(/signup/);
      await expect(registerPage.passwordInput().and(page.locator(':invalid'))).toHaveCount(1);
    });
  });
});