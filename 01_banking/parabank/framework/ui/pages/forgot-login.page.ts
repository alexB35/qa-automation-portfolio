import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';
import { type UserBase } from '../../data/user.base';

export class ForgotLoginPage {
  readonly page:             Page;
  readonly firstNameInput:   Locator;
  readonly lastNameInput:    Locator;
  readonly addressInput:     Locator;
  readonly cityInput:        Locator;
  readonly stateInput:       Locator;
  readonly zipCodeInput:     Locator;
  readonly ssnInput:         Locator;
  readonly findButton:       Locator;

  constructor(page: Page) {
    this.page           = page;
    this.firstNameInput = page.locator('input[id="firstName"]');
    this.lastNameInput  = page.locator('input[id="lastName"]');
    this.addressInput   = page.locator('input[id="address.street"]');
    this.cityInput      = page.locator('input[id="address.city"]');
    this.stateInput     = page.locator('input[id="address.state"]');
    this.zipCodeInput   = page.locator('input[id="address.zipCode"]');
    this.ssnInput       = page.locator('input[id="ssn"]');
    this.findButton     = page.locator('input[value="Find My Login Info"]');
  }

  async goto() {
  await this.page.goto('https://parabank.parasoft.com/parabank/logout.htm');
  await this.page.goto(URLS.forgotLoginUrl);
}

  
async fillAndSubmit(user: UserBase) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.ssnInput.fill(user.ssn);
    await this.findButton.click();
  }

  async expectLookupSuccess(user: UserBase) {
    await expect(this.page.getByText('Your login information was located successfully. You are now logged in.'))
      .toHaveCount(1);
    await expect(this.page.getByText(`Username: ${user.username}`)).toHaveCount(1);
    await expect(this.page.getByText(`Password: ${user.password}`)).toHaveCount(1);
    await expect(this.page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  }
}