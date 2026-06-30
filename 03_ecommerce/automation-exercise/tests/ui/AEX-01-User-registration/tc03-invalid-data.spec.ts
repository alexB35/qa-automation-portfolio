import { epic, story, testCaseId, severity, step, issue } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { RegisterPage } from '../../../framework/ui/pages/register.page';
import { buildUser } from '../../../framework/data/user.factory';

test.describe('AEX-01 – User Registration', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-03 | Invalid data registration', async ({ page }) => {
 
  const registerPage = new RegisterPage(page);
  const user = buildUser();

    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-03');
    await severity('normal');
    await issue('AEX-B-01 - Invalid date of birth during registration', 'https://alexb35.atlassian.net/browse/AEX-5');

    await step('Navigate to signup page', async () => {
      await registerPage.goto();
    });
 
    await step('Enter name and email then proceed', async () => {
      await registerPage.fillSignupNameAndEmail(user.name, user.email);
      await expect(page.getByText('Enter Account Information')).toBeVisible();
    });
 
    await step('Fill form with February 31st as date of birth', async () => {     
      await registerPage.fillRegistrationForm({ ...user, day: '31', month: 'February', year: '2000' });
    });
 
    await step('Verify invalid date rejected', async () => {
      await expect(page.getByText('Invalid date of birth')).toBeVisible();
    });
  });
});
