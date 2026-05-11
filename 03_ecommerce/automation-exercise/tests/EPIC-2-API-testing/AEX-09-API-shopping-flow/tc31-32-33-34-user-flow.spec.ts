import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, deleteUser } from '../../../framework/api/user.api';

// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';

// NOTE: Cart and checkout operations (add to cart, view cart, place order)
// are not exposed via the Automation Exercise API — UI-only flows.
// Coverage for these steps is handled in EPIC-1 UI testing.

const user = buildUser();
let selectedProductId: number = -1;
let selectedProductName: string = '';

// ── AEX-09 | API Shopping Flow ────────────────────────────────────────────
test.describe('AEX-09 – API Shopping Flow', () => {

  test.describe.configure({ mode: 'serial' });

  // ── TC-31 | POST register ─────────────────────────────────────────────────
  test('TC-31 | POST register — successful account creation via API', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-09 API Shopping Flow');
    await story('TC-31 POST register');
    await severity('critical');

    await step('Send POST request to /api/createAccount', async () => {
      const result = await createUser(request, user);

      await step('Verify response code is 201 and user created', async () => {
        expect(result).toHaveProperty('responseCode', 201);
        expect(result.message).toBe('User created!');
      });
    });
  });

  // ── TC-32 | POST login ────────────────────────────────────────────────────
  test('TC-32 | POST login — successful authentication via API', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-09 API Shopping Flow');
    await story('TC-32 POST login');
    await severity('critical');

    await step('Send POST request to /api/verifyLogin', async () => {
      const response = await request.post(`${API_BASE}/verifyLogin`, {
        form: {
          email:    user.email,
          password: user.password,
        },
      });
      const body = await response.json();

      await step('Verify response code is 200 and user exists', async () => {
        expect(body).toHaveProperty('responseCode', 200);
        expect(body.message).toBe('User exists!');
      });
    });
  });

  // ── TC-33 | GET select product ────────────────────────────────────────────
  test('TC-33 | GET product list — extract product for shopping flow', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-09 API Shopping Flow');
    await story('TC-33 GET select product');
    await severity('high');

    await step('Send GET request to /api/productsList and extract first product', async () => {
      const response = await request.get(`${API_BASE}/productsList`);
      const body = await response.json();

      await step('Verify response code is 200 and products list is not empty', async () => {
        expect(body).toHaveProperty('responseCode', 200);
        expect(body.products.length).toBeGreaterThan(0);
      });

      await step('Extract first product details for downstream flow', async () => {
        selectedProductId = body.products[0].id;
        selectedProductName = body.products[0].name;
        expect(selectedProductId).toBeGreaterThan(0);
        expect(selectedProductName).toBeTruthy();
      });
    });
  });

  // ── TC-34 | DELETE account ────────────────────────────────────────────────
  test('TC-34 | DELETE account — successful account deletion via API', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-09 API Shopping Flow');
    await story('TC-34 DELETE account');
    await severity('high');

    await step('Send DELETE request to /api/deleteAccount', async () => {
      const result = await deleteUser(request, user.email, user.password);

      await step('Verify response code is 200 and account deleted', async () => {
        expect(result).toHaveProperty('responseCode', 200);
        expect(result.message).toBe('Account deleted!');
      });
    });
  });

});