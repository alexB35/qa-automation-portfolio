import { Page, expect } from '@playwright/test';

export class ContactPage {
  readonly nameInput = () => this.page.locator('input[data-qa="name"]');
  readonly emailInput = () => this.page.locator('input[data-qa="email"]');
  readonly subjectInput = () => this.page.locator('input[data-qa="subject"]');
  readonly messageInput = () => this.page.locator('textarea[data-qa="message"]');
  readonly fileInput = () => this.page.locator('input[name="upload_file"]');
  readonly submitButton = () => this.page.locator('input[data-qa="submit-button"]');

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://automationexercise.com/contact_us');
  }

  async fillContactForm(contact: {
    name: string;
    email: string;
    subject: string;
    message: string;
    filePath?: string;
  }) {
    await this.nameInput().fill(contact.name);
    await this.emailInput().fill(contact.email);
    await this.subjectInput().fill(contact.subject);
    await this.messageInput().fill(contact.message);
    if (contact.filePath) {
      await this.fileInput().setInputFiles(contact.filePath);
    }
  }

  async submitForm() {
    await this.submitButton().click();
    this.page.on('dialog', dialog => dialog.accept());
  }

  async verifySuccess() {
    await expect(this.page.getByText('Success! Your details have been submitted successfully.')).toBeVisible();
  }

  async verifyValidationError() {
    await expect(this.page).toHaveURL(/contact_us/);
  }
}