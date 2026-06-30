import { epic, story, testCaseId, severity, step, issue } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';
import { CartPage } from '../../../framework/ui/pages/cart.page';
import { CheckoutPage } from '../../../framework/ui/pages/checkout.page';
import { INVALID_CARD } from '../../../framework/data/payment.data';

test.describe('AEX-04 – Checkout', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-17 | Checkout with Invalid Data', async ({ page, registeredUser }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
 
    await epic('UI Testing');
    await story('AEX-04 Checkout');
    await testCaseId('TC-17');
    await severity('critical');
    await issue('AEX-B-03 - Payment with expired payment card', 'https://alexb35.atlassian.net/browse/AEX-63');
 
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Add product to cart from details page', async () => {
      await productPage.addToCartFromList('Fancy Green Top');
    });

    await step('Verify cart update', async () => {     
      await cartPage.goto();
      await cartPage.verifyProductInCart('Fancy Green Top', '1');
    });

    await step('Proceed to checkout', async () => {
      await checkoutPage.proceedToCheckout();
    });

    await step('Verify purchase details', async () => {
      await checkoutPage.verifyPurchase(registeredUser, 'Fancy Green Top', '1');
    });

    await step('Payment', async () => {
          await checkoutPage.fillPayment(
            `${registeredUser.firstName} ${registeredUser.lastName}`, INVALID_CARD
          );
        });

    await step('Verify card expiration date error', async () => {
      await expect(page.getByText(/expired|invalid|incorrect/i)).toBeVisible();
      await expect(page.getByText('Order placed')).not.toBeVisible();
    });
  });
});