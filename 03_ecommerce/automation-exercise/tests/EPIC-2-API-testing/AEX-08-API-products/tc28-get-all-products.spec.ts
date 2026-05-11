import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
 
// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';
 
// ── AEX-08 | API Products ─────────────────────────────────────────────────
test.describe('AEX-08 – API Products', () => {
 
  // ── TC-28 | GET all products ────────────────────────────────────────────
  test('TC-28 | GET all products — verify response structure', async ({ request }) => {
    
    await epic('API Testing');
    await feature('AEX-08 API Products');
    await story('TC-28 GET all products');
    await severity('high');
 
    await step('Send GET request to /api/productsList', async () => {
      const response = await request.get(`${API_BASE}/productsList`);
      const body = await response.json();
 
      await step('Verify status code is 200', async () => {
        expect(body).toHaveProperty('responseCode', 200);
      });
 
      await step('Verify response contains products array with required fields', async () => {
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBeTruthy();
        expect(body.products.length).toBeGreaterThan(0);
        
        const product = body.products[0];
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('brand');
        expect(product).toHaveProperty('category');
      });
    });
  }); 
});