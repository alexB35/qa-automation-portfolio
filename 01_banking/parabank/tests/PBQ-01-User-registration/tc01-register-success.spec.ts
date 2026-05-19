import { test, expect } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';

test.describe('PBQ-01 – User Registration', () => {

  test('TC-01 | Successful registration with valid data', async ({ page, registeredUser }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-01 User Registration');
    await testCaseId('TC-01');
    await severity('critical');

    await step('Verify account created successfully', async () => {
      await expect(page.getByText('Your account was created')).toBeVisible();
      await expect(page.locator('#leftPanel')).toContainText(`Welcome ${registeredUser.firstName} ${registeredUser.lastName}`);
    });
  });
});