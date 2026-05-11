import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
 
// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';
const SEARCH_TERM = 'top';
 
// ── AEX-08 | API Products ─────────────────────────────────────────────────
test.describe('AEX-08 – API Products', () => {

// ── TC-30a | POST search product by name ────────────────────────────────
  test('TC-30a | POST search product by name — results returned', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-08 API Products');
    await story('TC-30a POST search product');
    await severity('high');
 
    await step('Send POST request to /api/searchProduct with search_product=top', async () => {
      const response = await request.post(`${API_BASE}/searchProduct`, {
        form: { search_product: SEARCH_TERM },
      });
      const body = await response.json();
 
      await step('Verify status code is 200 and results returned', async () => {
        expect(body).toHaveProperty('responseCode', 200);
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBeTruthy();
        expect(body.products.length).toBeGreaterThan(0);
      });
    });
  });
});