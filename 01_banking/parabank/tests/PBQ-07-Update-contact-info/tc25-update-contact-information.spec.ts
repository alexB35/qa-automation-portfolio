import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { UpdateProfilePage } from '../../framework/ui/pages/update-profile.page';

test.describe('PBQ-07 – Update Contact Info', () => {

  test('TC-25 | Update contact info with valid data shows success message', async ({ page, registeredUser }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-07 Update Contact Info');
    await testCaseId('TC-25');
    await severity('normal');

    const updateProfilePage = new UpdateProfilePage(page);

    await step('Navigate to Update Profile page', async () => {
      await updateProfilePage.goto();
    });

    await step('Fill and submit profile update form', async () => {
      await updateProfilePage.fillAndSubmit({
        address: '456 Updated Street',
        city:    'Las Vegas',
        state:   'NV',
        zipCode: '90001',
        phone:   '9876543210',
      });
    });

    await step('Verify profile updated successfully', async () => {
      await updateProfilePage.expectSuccess();
    });
  });

});