import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, deleteUser, verifyLogin, ApiResponse } from '../../../framework/api/user.api';

const user = buildUser();

test.describe('AEX-07 – API User Management', () => {
 
  test.beforeAll(async ({ request }) => {
    const result = await createUser(request, user);
    expect(result).toHaveProperty('responseCode', 201);
  });

  test('TC-27 | DELETE user account', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-27');
    await severity('critical');

    let result: ApiResponse;
 
    await step('Send DELETE request to /api/deleteAccount', async () => {
      result = await deleteUser(request, user.email, user.password);
    });

    await step('Verify response code is 200 and account deleted', async () => {
      expect(result).toHaveProperty('responseCode', 200);
      expect(result.message).toBe('Account deleted!');
    });

    await step('Verify account no longer exists', async () => {
      const loginResult = await verifyLogin(request, user.email, user.password);
      expect(loginResult).toHaveProperty('responseCode', 404);
      expect(loginResult.message).toBe('User not found!');
    });
  });
});