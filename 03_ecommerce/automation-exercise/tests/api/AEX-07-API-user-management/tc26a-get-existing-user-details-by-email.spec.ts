import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, getUserDetailByEmail, UserDetailResponse } from '../../../framework/api/user.api';

const user = buildUser();

test.describe('AEX-07 – API User Management', () => {
  
  test.beforeAll(async ({ request }) => {
    const result = await createUser(request, user);
    expect(result).toHaveProperty('responseCode', 201);
  });
  
  test('TC-26a | GET existing user details by email', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-26a');
    await severity('normal');

    let result: UserDetailResponse;
 
    await step('Send GET request to /api/getUserDetailByEmail', async () => {
      result = await getUserDetailByEmail(request, user.email);
    });
 
    await step('Verify response contains correct user details', async () => {
      expect(result).toHaveProperty('responseCode', 200);
      expect(result.user).toHaveProperty('email', user.email);
      expect(result.user).toHaveProperty('name', user.name);
    });
  });
}); 