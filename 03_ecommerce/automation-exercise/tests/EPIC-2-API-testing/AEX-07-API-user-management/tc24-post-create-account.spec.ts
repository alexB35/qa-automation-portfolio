import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser } from '../../../framework/api/user.api';

// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';
const user = buildUser();
 
// ── AEX-07 | API User Management ─────────────────────────────────────────
test.describe('AEX-07 – API User Management', () => {
 
  test.describe.configure({ mode: 'serial' });
 
// ── TC-24 | POST create account ─────────────────────────────────────────
  test('TC-24 | POST create account via API', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-24 POST create account');
    await severity('high');
 
    await step('Send POST request to /api/createAccount', async () => {
      const result = await createUser(request, user);

    await step('Verify response code is 201 and user created', async () => {
      expect(result).toHaveProperty('responseCode', 201);
      expect(result.message).toBe('User created!');
    });
    });
  });
});
