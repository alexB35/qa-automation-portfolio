// tests/parabank-login.spec.js
const { test, expect } = require('@playwright/test');

// Paramètres de test
const BASE_URL = 'https://parabank.parasoft.com/parabank/index.htm';
const USERNAME = 'testuser123';
const PASSWORD = 'Test123!';

test.describe('ParaBank Login Tests', () => {

  test('Login with valid credentials', async ({ page }) => {
    // 1️⃣ Ouvrir la page de login
    await page.goto(BASE_URL);

    // 2️⃣ Remplir le formulaire
    await page.fill('input[name="username"]', USERNAME);
    await page.fill('input[name="password"]', PASSWORD);

    // 3️⃣ Cliquer sur le bouton Login
    await page.click('input[value="Log In"]');

    // 4️⃣ Vérifier que l’utilisateur est redirigé vers le tableau de bord
    await expect(page.locator('text=Accounts Overview')).toBeVisible();
  });

  test('Login fails with invalid credentials', async ({ page }) => {
    await page.goto(BASE_URL);

    await page.fill('input[name="username"]', 'wronguser');
    await page.fill('input[name="password"]', 'wrongpass');
    await page.click('input[value="Log In"]');

    // Vérification de l’erreur
    await expect(page.locator('text=The username and password could not be verified.')).toBeVisible();
  });

});