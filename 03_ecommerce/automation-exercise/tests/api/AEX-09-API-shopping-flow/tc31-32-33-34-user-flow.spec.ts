import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, deleteUser, verifyLogin, ApiResponse } from '../../../framework/api/user.api';
import { getProductsList, ProductsListResponse } from '../../../framework/api/product.api';

const API_BASE = 'https://automationexercise.com/api';

// NOTE: Cart and checkout operations (add to cart, view cart, place order)
// are not exposed via the Automation Exercise API — UI-only flows.
// Coverage for these steps is handled in EPIC-1 UI testing.

const user = buildUser();
let selectedProductId: number = -1;
let selectedProductName: string = '';


test.describe('AEX-09 – API Shopping Flow', () => {

  test.describe.configure({ mode: 'serial' });

  test('TC-31 | POST register', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-09 API Shopping Flow');
    await story('TC-31');
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


  test('TC-32 | POST login', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-09 API Shopping Flow');
    await story('TC-32');
    await severity('critical');

    let result: ApiResponse;

    await step('Send POST request to /api/verifyLogin', async () => {
      result = await verifyLogin(request, user.email, user.password);
    });

    await step('Verify response code is 200 and user exists', async () => {
      expect(result).toHaveProperty('responseCode', 200);
      expect(result.message).toBe('User exists!');
    });
  });


  test('TC-33 | GET select product', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-09 API Shopping Flow');
    await story('TC-33');
    await severity('critical');

    let result: ProductsListResponse;

    await step('Send GET request to /api/productsList and extract first product', async () => {
      result = await getProductsList(request);
    });

    await step('Verify response code is 200 and products list is not empty', async () => {
      expect(result).toHaveProperty('responseCode', 200);
      expect(result.products.length).toBeGreaterThan(0);
    });

    await step('Extract first product details for downstream flow', async () => {
      selectedProductId = result.products[0].id;
      selectedProductName = result.products[0].name;
      expect(selectedProductId).toBeGreaterThan(0);
      expect(selectedProductName).toBeTruthy();
    });
  });


  test('TC-34 | DELETE account', async ({ request }) => {

    await epic('API Testing');
    await feature('AEX-09 API Shopping Flow');
    await story('TC-34');
    await severity('critical');

    let result: ApiResponse;

    await step('Send DELETE request to /api/deleteAccount', async () => {
      result = await deleteUser(request, user.email, user.password);
    });

    await step('Verify response code is 200 and account deleted', async () => {
      expect(result).toHaveProperty('responseCode', 200);
      expect(result.message).toBe('Account deleted!');
    });
  });

});