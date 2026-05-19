import { type Page } from '@playwright/test';

export async function selectFromAndToAccounts(page: Page): Promise<{ fromAccount: string; toAccount: string }> {
  await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });

  const fromOptions = await page.locator('#fromAccountId option').all();
  const fromAccount = await fromOptions[0].getAttribute('value') ?? '';
  await page.locator('#fromAccountId').selectOption(fromAccount);

  const toOptions = await page.locator('#toAccountId option').all();
  let toAccount = '';
  for (const option of toOptions) {
    const value = await option.getAttribute('value');
    if (value !== fromAccount) {
      toAccount = value ?? '';
      break;
    }
  }
  await page.locator('#toAccountId').selectOption(toAccount);

  return { fromAccount, toAccount };
}