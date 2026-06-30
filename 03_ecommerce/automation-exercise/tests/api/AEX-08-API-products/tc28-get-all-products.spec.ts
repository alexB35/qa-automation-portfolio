import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { getProductsList, ProductsListResponse } from '../../../framework/api/product.api';
 
test.describe('AEX-08 – API Products', () => {
 
  test('TC-28 | GET all products', async ({ request }) => {
    
    await epic('API Testing');
    await feature('AEX-08 API Products');
    await story('TC-28');
    await severity('critical');

    let result: ProductsListResponse;
 
    await step('Send GET request to /api/productsList', async () => {
      result = await getProductsList(request);
    });
 
    await step('Verify status code is 200', async () => {
      expect(result).toHaveProperty('responseCode', 200);
    });
 
    await step('Verify response contains products array with required fields', async () => {
      expect(result).toHaveProperty('products');
      expect(Array.isArray(result.products)).toBeTruthy();
      expect(result.products.length).toBeGreaterThan(0);
      
      const product = result.products[0];
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('brand');
      expect(product).toHaveProperty('category');
    });
  });
}); 