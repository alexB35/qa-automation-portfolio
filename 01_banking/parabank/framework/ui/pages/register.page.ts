import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';
import type { UserBase } from '../../data/user.base';

export class RegisterPage {
  readonly page: Page;

  readonly firstNameInput:       Locator;
  readonly lastNameInput:        Locator;
  readonly addressInput:         Locator;
  readonly cityInput:            Locator;
  readonly stateInput:           Locator;
  readonly zipCodeInput:         Locator;
  readonly phoneInput:           Locator;
  readonly ssnInput:             Locator;
  readonly usernameInput:        Locator;
  readonly passwordInput:        Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton:       Locator;

  constructor(page: Page) {
    this.page                 = page;
    this.firstNameInput       = page.locator('#customer\\.firstName');
    this.lastNameInput        = page.locator('#customer\\.lastName');
    this.addressInput         = page.locator('#customer\\.address\\.street');
    this.cityInput            = page.locator('#customer\\.address\\.city');
    this.stateInput           = page.locator('#customer\\.address\\.state');
    this.zipCodeInput         = page.locator('#customer\\.address\\.zipCode');
    this.phoneInput           = page.locator('#customer\\.phoneNumber');
    this.ssnInput             = page.locator('#customer\\.ssn');
    this.usernameInput        = page.locator('#customer\\.username');
    this.passwordInput        = page.locator('#customer\\.password');
    this.confirmPasswordInput = page.locator('#repeatedPassword');
    this.registerButton       = page.locator('input[value="Register"]');
  }

  async goto() {
    await this.page.goto(URLS.registerUrl);
  }

  async fillForm(user: UserBase, confirmPassword?: string) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.addressInput.fill(user.address);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.zipCodeInput.fill(user.zipCode);
    await this.phoneInput.fill(user.phone);
    await this.ssnInput.fill(user.ssn);
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(confirmPassword ?? user.password);
  }

  async submit() {
    await this.registerButton.click();
  }

  async fillAndSubmit(user: UserBase, confirmPassword?: string) {
    await this.fillForm(user, confirmPassword);
    await this.submit();
  }

  async expectSuccess(user: UserBase) {
    await expect(this.page.getByText('Your account was created')).toBeVisible();
    await expect(this.page.locator('#leftPanel')).toContainText(`Welcome ${user.firstName} ${user.lastName}`);
  }
}