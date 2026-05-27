/// <reference types="node" />
import { firefox } from '@playwright/test';

async function globalSetup() {
  if (!process.env['CI']) return;

  console.log('[global-setup] Initializing Parabank Database...');

  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('http://localhost:8080/parabank/index.htm');
  await page.waitForLoadState('networkidle');
  console.log('[global-setup] DB init triggered — waiting 25s for schema creation...');
  await new Promise(r => setTimeout(r, 25000));

  let ready = false;
  for (let i = 0; i < 10; i++) {
    try {
      await page.goto('http://localhost:8080/parabank/register.htm');
      await page.fill('#customer\\.firstName', 'Init');
      await page.fill('#customer\\.lastName', 'User');
      await page.fill('#customer\\.address\\.street', '1 Main St');
      await page.fill('#customer\\.address\\.city', 'NY');
      await page.fill('#customer\\.address\\.state', 'NY');
      await page.fill('#customer\\.address\\.zipCode', '10001');
      await page.fill('#customer\\.phoneNumber', '0123456789');
      await page.fill('#customer\\.ssn', '000-00-0001');
      await page.fill('#customer\\.username', 'ci_warmup_user');
      await page.fill('#customer\\.password', 'Test123!');
      await page.fill('#repeatedPassword', 'Test123!');
      await page.click('input[value="Register"]');
      await page.waitForSelector('text=Your account was created successfully', { timeout: 5000 });
      console.log(`[global-setup] ParaBank DB ready after attempt ${i + 1}`);
      ready = true;
      break;
    } catch (e) {
      console.log(`[global-setup] Attempt ${i + 1}/10 failed: ${(e as Error).message}`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  await browser.close();
  if (!ready) throw new Error('[global-setup] ParaBank DB failed to initialize');
}

export default globalSetup;