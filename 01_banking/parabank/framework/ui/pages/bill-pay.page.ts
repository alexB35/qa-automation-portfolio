import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export type Payee = {
  name:          string;
  address:       string;
  city:          string;
  state:         string;
  zipCode:       string;
  phone:         string;
  accountNumber: string;
  amount?:       string;
};

export class BillPayPage {
  readonly page: Page;

  readonly nameInput:          Locator;
  readonly addressInput:       Locator;
  readonly cityInput:          Locator;
  readonly stateInput:         Locator;
  readonly zipCodeInput:       Locator;
  readonly phoneInput:         Locator;
  readonly accountNumberInput: Locator;
  readonly verifyAccountInput: Locator;
  readonly amountInput:        Locator;
  readonly fromAccountSelect:  Locator;
  readonly sendPaymentButton:  Locator;

  constructor(page: Page) {
    this.page                = page;
    this.nameInput           = page.locator('input[name="payee.name"]');
    this.addressInput        = page.locator('input[name="payee.address.street"]');
    this.cityInput           = page.locator('input[name="payee.address.city"]');
    this.stateInput          = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput        = page.locator('input[name="payee.address.zipCode"]');
    this.phoneInput          = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberInput  = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput  = page.locator('input[name="verifyAccount"]');
    this.amountInput         = page.locator('input[name="amount"]');
    this.fromAccountSelect   = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton   = page.getByRole('button', { name: 'Send Payment' });
  }

  async goto() {
    await this.page.goto(URLS.billPayUrl);
  }

  async fillPayee(payee: Payee) {
    await this.nameInput.fill(payee.name);
    await this.addressInput.fill(payee.address);
    await this.cityInput.fill(payee.city);
    await this.stateInput.fill(payee.state);
    await this.zipCodeInput.fill(payee.zipCode);
    await this.phoneInput.fill(payee.phone);
    await this.accountNumberInput.fill(payee.accountNumber);
    await this.verifyAccountInput.fill(payee.accountNumber);
    if (payee.amount !== undefined) {
      await this.amountInput.fill(payee.amount);
    }
  }
/*
  async selectFirstAccount() {
  const firstOption =
    this.fromAccountSelect.locator('option').first();
  await expect(firstOption).toBeVisible();
  const value = await firstOption.getAttribute('value');
  if (!value) {
    throw new Error('No account option available');
  }
  await this.fromAccountSelect.selectOption(value);
} */

  async submit() {
    await this.sendPaymentButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillAndSubmit(payee: Payee) {
    await this.fillPayee(payee);
    //await this.selectFirstAccount();
    await this.submit();
  }

  async expectSuccess(payee: Payee) {
    await expect(this.page.getByText('Bill Payment Complete')).toBeVisible();
    await expect(this.page.getByText(payee.name)).toBeVisible();
    await expect(this.page.locator('#amount')).toBeVisible();
  }

  async expectValidationError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}