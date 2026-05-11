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

  test.beforeAll(async ({ request }) => {
    const result = await createUser(request, user);
    expect(result).toHaveProperty('responseCode', 201);
  });

// ── TC-25a | POST login with valid credentials ───────────────────────────
  test('TC-25a | POST login with valid credentials', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-25a POST login valid');
    await severity('high');
 
    await step('Send POST request to /api/verifyLogin with valid credentials', async () => {
      const response = await request.post(`${API_BASE}/verifyLogin`, {
        form: {
          email: user.email,
          password: user.password,
        },
      });
 
      await step('Verify response code is 200 and user exists', async () => {
        const body = await response.json();
        expect(body).toHaveProperty('responseCode', 200);
        expect(body.message).toBe('User exists!');
      });
    });
  });
});