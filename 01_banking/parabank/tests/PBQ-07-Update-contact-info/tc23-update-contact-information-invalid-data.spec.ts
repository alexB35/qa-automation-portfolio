import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { UpdateProfilePage } from '../../framework/ui/pages/update-profile.page';

test.describe('PBQ-07 – Update Contact Info', () => {

  test('TC-23 | Empty required fields show validation errors', async ({ page, registeredUser }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-07 Update Contact Info');
    await testCaseId('TC-23');
    await severity('minor');

    const updateProfilePage = new UpdateProfilePage(page);

    await step('Navigate to Update Profile page', async () => {
      await updateProfilePage.goto();
    });

    await step('Clear all required fields and submit', async () => {
      await updateProfilePage.fillAndSubmit({
        address: '',
        city:    '',
        state:   '',
        zipCode: '',
      });
    });

    await step('Verify validation errors are displayed', async () => {
      await updateProfilePage.expectValidationErrors();
    });
  });

});