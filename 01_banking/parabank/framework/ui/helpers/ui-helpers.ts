import { Page } from '@playwright/test';


// ── Dismiss GDPR Popup ──────────────────────────────────────────────────────────────
export async function dismissGDPR(page: Page): Promise<void> {
  try {
    const consentButton = page.getByRole('button', { name: 'Consent' });
    await consentButton.waitFor({ state: 'visible', timeout: 5000 });
    await consentButton.click();
  } catch {
    // No GDPR popup
  }
}



// ── Dismiss Ad Popup ──────────────────────────────────────────────────────────────
export async function dismissAdPopup(page: Page): Promise<void> {
  try {
    const closeButton = page
    .locator('text=Close')
    .or(page.locator('[id*="dismiss-button-element"]'))
    .or(page.locator('[class*="close-button"]'))
    .or(page.locator('[text*="close"]'))
    .or(page.locator('[class*="continue-prompt-text"]')).first();
    await closeButton.waitFor({ state: 'visible', timeout: 3000 });
    await closeButton.click();
  } catch {
    // No popup present — continue
  }
}


// ── Close Ads ──────────────────────────────────────────────────────────────
export async function closeAds(page: Page): Promise<void> {

  // 1. main page  
  const selectors = [
    '#dismiss-button-element',  
    '[aria-label="Close Ad"]', 
    '[aria-label="close ad"]', 
    '[aria-label="Close"]',
    '.close-button-outer',
    '.close-button',
    '.continue-prompt-text:has-text("Close")'
  ];

  for (const sel of selectors) {
    const btn = page.locator(sel).first();


    try {
      if (await btn.isVisible({ timeout: 2000 })) {
        await btn.click({ force: true });
        return; 
      }
    } catch {}
  }
  
  // 2. iframe
  for (const frame of page.frames()) {
    if (!frame.url().includes('doubleclick') && 
      !frame.url().includes('googlesyndication') &&
      !frame.name().includes('aswift')) {
    continue; // Skip non-ad frames
  }
    const btn = frame.locator('#dismiss-button-element, [aria-label="Close Ad"]').first();

    try {
      if (await btn.isVisible({ timeout: 1000 })) {
        await btn.click({ force: true });
        return;
      }
    } catch {}
  }

  // 3. fallback
  const fallback = page.getByRole('button', { name: /^close$/i });

  try {
    if (await fallback.first().isVisible({ timeout: 1000 })) {
      await fallback.first().click({ force: true });
    }
  } catch {}
}



