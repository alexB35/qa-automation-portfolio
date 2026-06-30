import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { createUser, verifyLogin, ApiResponse } from '../../../framework/api/user.api';

test.describe('AEX-07 – API User Management', () => {
   
  test('TC-25b | POST login with invalid credentials', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-25b');
    await severity('normal');

    let result: ApiResponse;
 
    await step('Send POST request to /api/verifyLogin with invalid credentials', async () => {
      result = await verifyLogin(request, 'unknown@test.com', 'WrongPass123!');
    });
 
    await step('Verify response code is 404 and user not found', async () => {
      expect(result).toHaveProperty('responseCode', 404);
      expect(result.message).toBe('User not found!');
    });
  });
}); 