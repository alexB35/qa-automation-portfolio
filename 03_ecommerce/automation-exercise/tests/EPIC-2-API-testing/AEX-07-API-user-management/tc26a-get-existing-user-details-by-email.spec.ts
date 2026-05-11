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
  
// ── TC-26a | GET existing user details by email ──────────────────────────
  test('TC-26a | GET existing user details by email', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-26a GET existing user details');
    await severity('medium');
 
    await step('Send GET request to /api/getUserDetailByEmail', async () => {
      const response = await request.get(`${API_BASE}/getUserDetailByEmail`, {
        params: { email: user.email },
      });
 
      await step('Verify response contains correct user details', async () => {
        const body = await response.json();
        expect(body).toHaveProperty('responseCode', 200);
        expect(body.user).toHaveProperty('email', user.email);
        expect(body.user).toHaveProperty('name', user.name);
      });
    });
  }); 
});