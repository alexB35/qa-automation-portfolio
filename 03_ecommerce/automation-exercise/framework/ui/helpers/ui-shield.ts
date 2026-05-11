import { Page } from '@playwright/test';

export async function uiShield(page: Page) {
 
  await page.waitForTimeout(1000);

  
  for (let i = 0; i < 3; i++) {
    await removeOverlays(page);
    await closePopups(page);
    await closeIframePopups(page);
    await page.waitForTimeout(500);
  }
}

async function removeOverlays(page: Page) {
  await page.evaluate(() => {
    const candidates = document.querySelectorAll('body *');

    candidates.forEach(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      const isFixed = style.position === 'fixed';
      const isLargeOverlay =
        rect.width > window.innerWidth * 0.8 &&
        rect.height > window.innerHeight * 0.5;

      if (isFixed && isLargeOverlay) {
        el.remove();
      }
    });
  });
}

async function closePopups(page: Page) {
  const buttons = page.locator(`
    button:has-text("Close"),
    button:has-text("close"),
    button:has-text("×"),
    button:has-text("X"),
    .close,
    .btn-close
  `);

  const count = await buttons.count();

  for (let i = 0; i < count; i++) {
    const btn = buttons.nth(i);

    const text = (await btn.textContent())?.toLowerCase() || '';
    const isPopup =
      text.includes('Close') ||
      text.includes('close') ||
      text.includes('x') ||
      text.includes('dismiss');

    if (isPopup && await btn.isVisible().catch(() => false)) {
      await btn.click({ force: true }).catch(() => {});
    }
  }
}

async function closeIframePopups(page: Page) {
  for (const frame of page.frames()) {
    try {
      const closeButtons = frame.locator('button, [role="button"]').filter({
        hasText: /close|x|dismiss/i
      });

      const count = await closeButtons.count();

      for (let i = 0; i < count; i++) {
        const el = closeButtons.nth(i);

        const text = (await el.textContent())?.toLowerCase() || '';

        const isPopup =
          text.includes('Close') ||
          text.includes('close') ||
          text.includes('x') ||
          text.includes('dismiss');

        if (isPopup && await el.isVisible().catch(() => false)) {
          await el.click({ force: true }).catch(() => {});
        }
      }
    } catch {}
  }
}