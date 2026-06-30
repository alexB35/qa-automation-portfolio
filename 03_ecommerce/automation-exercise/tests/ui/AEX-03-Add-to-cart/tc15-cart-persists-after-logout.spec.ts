import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';
import { CartPage } from '../../../framework/ui/pages/cart.page';
import { LoginPage } from '../../../framework/ui/pages/login.page';

test.describe('AEX-03 – Add Product to Cart', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-15 | Cart Persists after Logout', async ({ page, registeredUser }) => {
    
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);

    await epic('UI Testing');
    await story('AEX-03 Add Product to Cart');
    await testCaseId('TC-15');
    await severity('normal');
    
    await step('Navigate to product page', async () => {
      await productPage.goto();
      await page.waitForLoadState('domcontentloaded');
    });

    await step('Add product to cart from products page', async () => {
      await productPage.addToCartFromList('Printed Off Shoulder Top - White');
    });

    await step('Verify cart update', async () => {     
      await cartPage.goto();
      await cartPage.verifyProductInCart('Printed Off Shoulder Top - White', '1');
    });

    await step('Logout', async () => {
      await loginPage.logout();
    });

    await step('Verify user is logged out', async () => {
      await loginPage.isLoggedOut();
    });

    await step('Login again with same credentials', async () => {
      await loginPage.goto();
      await loginPage.login(registeredUser.email, registeredUser.password);
      await loginPage.isLoggedIn(registeredUser.name);
    });

    await step('Verify cart persistence', async () => {
      await cartPage.goto();
      await expect(page.getByText('Printed Off Shoulder Top - White')).toBeVisible();
      await expect(page.locator('.cart_quantity button')).toHaveText('1');
    });
  });
});
