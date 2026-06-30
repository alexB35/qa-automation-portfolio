import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, verifyLogin, ApiResponse } from '../../../framework/api/user.api';

const user = buildUser();

test.describe('AEX-07 – API User Management', () => {
 
  test.beforeAll(async ({ request }) => {
    const result = await createUser(request, user);
    expect(result).toHaveProperty('responseCode', 201);
  });

  test('TC-25a | POST login with valid credentials', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-25a');
    await severity('critical');

    let result: ApiResponse;
 
    await step('Send POST request to /api/verifyLogin with valid credentials', async () => {
        result = await verifyLogin(request, user.email, user.password);
      });
 
    await step('Verify response code is 200 and user exists', async () => {
      expect(result).toHaveProperty('responseCode', 200);
      expect(result.message).toBe('User exists!');
    });
  });
});