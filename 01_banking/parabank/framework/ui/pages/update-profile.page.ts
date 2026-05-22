import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export type ProfileData = {
  firstName?: string;
  lastName?:  string;
  address?: string;
  city?:    string;
  state?:   string;
  zipCode?: string;
  phone?:   string;
};

export class UpdateProfilePage {
  readonly page:          Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput:  Locator;
  readonly addressInput:  Locator;
  readonly cityInput:     Locator;
  readonly stateInput:    Locator;
  readonly zipCodeInput:  Locator;
  readonly phoneInput:    Locator;
  readonly updateButton:  Locator;

  constructor(page: Page) {
    this.page         = page;
    this.firstNameInput = page.locator('input[id="customer.firstName"]');
    this.lastNameInput = page.locator('input[id="customer.lastName"]');
    this.addressInput = page.locator('input[id="customer.address.street"]');
    this.cityInput    = page.locator('input[id="customer.address.city"]');
    this.stateInput   = page.locator('input[id="customer.address.state"]');
    this.zipCodeInput = page.locator('input[id="customer.address.zipCode"]');
    this.phoneInput   = page.locator('input[id="customer.phoneNumber"]');
    this.updateButton = page.getByRole('button', { name: 'Update Profile' });
  }

  async goto() {
    await this.page.goto(URLS.updateProfileUrl);
  }

  async fillProfile(data: ProfileData) {
    if (data.firstName !== undefined) await this.firstNameInput.fill(data.firstName);
    if (data.lastName !== undefined) await this.lastNameInput.fill(data.lastName);
    if (data.address !== undefined) await this.addressInput.fill(data.address);
    if (data.city    !== undefined) await this.cityInput.fill(data.city);
    if (data.state   !== undefined) await this.stateInput.fill(data.state);
    if (data.zipCode !== undefined) await this.zipCodeInput.fill(data.zipCode);
    if (data.phone   !== undefined) await this.phoneInput.fill(data.phone);
  }

  async submit() {
    await this.updateButton.click();
  }

  async fillAndSubmit(data: ProfileData) {
    await this.fillProfile(data);
    await this.submit();
  }

  async expectSuccess() {
    await expect(this.page.getByText('Profile Updated')).toHaveCount(1);
  }

  async expectValidationErrors() {
    await expect(this.page.getByText('First name is required.')).toBeVisible();
    await expect(this.page.getByText('Last name is required.')).toBeVisible();
    await expect(this.page.getByText('Address is required.')).toBeVisible();
    await expect(this.page.getByText('City is required.')).toBeVisible();
    await expect(this.page.getByText('State is required.')).toBeVisible();
    await expect(this.page.getByText('Zip Code is required.')).toBeVisible();
  }
}