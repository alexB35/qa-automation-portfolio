import { Page } from '@playwright/test';

export class RegisterPage {
  constructor(private page: Page) {}

  // ── Locators ─────────────────────────────

  signupLink = () => this.page.getByRole('link', { name: ' Signup / Login' });

  nameInput = () => this.page.locator('input[data-qa="signup-name"]');
  emailInput = () => this.page.locator('input[data-qa="signup-email"]');
  signupButton = () => this.page.locator('button[data-qa="signup-button"]');

  passwordInput = () => this.page.locator('input[data-qa="password"]');

  titleMr = () => this.page.locator('#id_gender1');
  titleMrs = () => this.page.locator('#id_gender2');

  daySelect = () => this.page.locator('select[data-qa="days"]');
  monthSelect = () => this.page.locator('select[data-qa="months"]');
  yearSelect = () => this.page.locator('select[data-qa="years"]');

  firstNameInput = () => this.page.locator('input[data-qa="first_name"]');
  lastNameInput = () => this.page.locator('input[data-qa="last_name"]');
  addressInput = () => this.page.locator('input[data-qa="address"]');

  countrySelect = () => this.page.locator('select[data-qa="country"]');

  stateInput = () => this.page.locator('input[data-qa="state"]');
  cityInput = () => this.page.locator('input[data-qa="city"]');
  zipCodeInput = () => this.page.locator('input[data-qa="zipcode"]');
  phoneInput = () => this.page.locator('input[data-qa="mobile_number"]');

  createAccountButton = () => this.page.locator('button[data-qa="create-account"]');

  continueButton = () => this.page.locator('a[data-qa="continue-button"]');

  // ── Actions ─────────────────────────────

  async goToSignup() {
    await this.signupLink().click();
  }

  async fillSignupNameAndEmail(name: string, email: string) {
    await this.nameInput().fill(name);
    await this.emailInput().fill(email);
    await this.signupButton().click();
  }

  async fillRegistrationForm(user: any) {
    await this.titleMr().check();
    await this.passwordInput().fill(user.password);

    await this.daySelect().selectOption(String(user.day));
    await this.monthSelect().selectOption(user.month);
    await this.yearSelect().selectOption(String(user.year));

    await this.firstNameInput().fill(user.firstName);
    await this.lastNameInput().fill(user.lastName);
    await this.addressInput().fill(user.address);

    await this.countrySelect().selectOption(user.country);

    await this.stateInput().fill(user.state);
    await this.cityInput().fill(user.city);
    await this.zipCodeInput().fill(user.zipCode);
    await this.phoneInput().fill(user.phone);

    await this.createAccountButton().click();
  }

  async clickContinue() {
    await this.continueButton().click();
  }
}