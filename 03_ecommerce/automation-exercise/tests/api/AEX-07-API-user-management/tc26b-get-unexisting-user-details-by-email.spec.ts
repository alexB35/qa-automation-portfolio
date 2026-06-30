import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { getUserDetailByEmail, UserDetailResponse } from '../../../framework/api/user.api';

test.describe('AEX-07 – API User Management', () => {
 
  test('TC-26b | GET unexisting user details by email', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-26b');
    await severity('normal');

    let result: UserDetailResponse;
 
    await step('Send GET request with unknown email', async () => {
      result = await getUserDetailByEmail(request, 'unknown_user_99999@test.com');
    });
 
    await step('Verify response code is 404 and account not found', async () => {
      expect(result).toHaveProperty('responseCode', 404);
      expect(result.message).toContain('Account not found');
    });
  });
});