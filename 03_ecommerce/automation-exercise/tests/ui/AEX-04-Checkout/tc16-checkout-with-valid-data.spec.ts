import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { ProductPage } from '../../../framework/ui/pages/product.page';
import { CartPage } from '../../../framework/ui/pages/cart.page';
import { CheckoutPage } from '../../../framework/ui/pages/checkout.page';
import { VALID_CARD } from '../../../framework/data/payment.data';
import { promises as fs } from 'fs';

test.describe('AEX-04 – Checkout', () => {    

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-16 | Checkout with Valid Data', async ({ page, registeredUser }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await epic('UI Testing');
    await story('AEX-04 Checkout');
    await testCaseId('TC-16');
    await severity('critical');
    
    await step('Navigate to product page', async () => {
      await productPage.goto();
    });

    await step('Add product to cart from details page', async () => {
      await productPage.addToCartFromList('Summer White Top');
    });

    await step('Verify cart update', async () => {     
      await cartPage.goto();
      await cartPage.verifyProductInCart('Summer White Top', '1');
    });

    await step('Proceed to checkout', async () => {
      await checkoutPage.proceedToCheckout();
    });

    await step('Verify purchase details', async () => {
      await checkoutPage.verifyPurchase(registeredUser, 'Summer White Top', '1');
    });

    await step('Payment', async () => {
      await checkoutPage.fillPayment(
        `${registeredUser.firstName} ${registeredUser.lastName}`, VALID_CARD
      );
    });

    await step('Verify order placed successfully', async () => {
      await expect(page.getByText('Order Placed!')).toBeVisible();
    });
    
    await step('Download and verify invoice', async () => {
      const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByText('Download Invoice').click(),
      ]);
      const filePath = await download.path();
      if (!filePath) throw new Error('Download failed');
      const content = await fs.readFile(filePath, 'utf-8');
      const normalized = content.replace(/\s+/g, ' ').trim();
      expect(normalized).toContain(`Hi ${registeredUser.firstName} ${registeredUser.lastName}`);
      expect(normalized).toContain('Thank you');
    });
  });
});