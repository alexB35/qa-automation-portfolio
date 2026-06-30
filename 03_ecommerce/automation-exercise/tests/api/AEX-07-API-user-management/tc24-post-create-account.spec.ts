import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, ApiResponse } from '../../../framework/api/user.api';

const user = buildUser();
 
test.describe('AEX-07 – API User Management', () => {
  
  test('TC-24 | POST create account', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-24');
    await severity('critical');

    let result: ApiResponse;
 
    await step('Send POST request to /api/createAccount', async () => {
      result = await createUser(request, user);
    });

    await step('Verify response code is 201 and user created', async () => {
      expect(result).toHaveProperty('responseCode', 201);
      expect(result.message).toBe('User created!');
    });
  });
});
