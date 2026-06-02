import { test, expect } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { buildUser } from '../../framework/data/user.factory';
import { RegisterPage } from '../../framework/ui/pages/register.page';

test.describe('PBQ-01 – User Registration', () => {

  test('TC-02 | Registration with existing username', async ({ page, registeredUser }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-01 User Registration');
    await testCaseId('TC-02');
    await severity('critical');

    const registerPage = new RegisterPage(page);
    const duplicate = buildUser({ username: registeredUser.username });

    await step('Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await step('Submit form with existing username', async () => {
      await registerPage.fillAndSubmit(duplicate);
    });

    await step('Verify error message is displayed', async () => {
      await expect(page.locator('#customer\\.username\\.errors')).toBeVisible();
      await expect(page.getByText('This username already exists.')).toBeVisible();
    });
  });

});