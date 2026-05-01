import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

const OUT = '/home/z/my-project/download/preview';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  console.log('=== DineFlow Preview Generator ===\n');

  const page = await context.newPage();

  // 1. Hero Section
  console.log('[1/9] Capturing Hero section...');
  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUT, '01-hero-desktop.png'), fullPage: false });

  // 2. Menu Section
  console.log('[2/9] Capturing Menu section...');
  const menuEl = page.locator('#menu');
  await menuEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT, '02-menu-desktop.png'), fullPage: false });

  // 3. About Section
  console.log('[3/9] Capturing About section...');
  const aboutEl = page.locator('#about');
  await aboutEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, '03-about-desktop.png'), fullPage: false });

  // 4. Contact Section
  console.log('[4/9] Capturing Contact section...');
  const contactEl = page.locator('#contact');
  await contactEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, '04-contact-desktop.png'), fullPage: false });

  // 5. Footer
  console.log('[5/9] Capturing Footer...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(OUT, '05-footer-desktop.png'), fullPage: false });

  // 6. Full Page long screenshot
  console.log('[6/9] Capturing Full Page...');
  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUT, '06-fullpage-desktop.png'),
    fullPage: true,
  });

  // 7. Admin Dashboard
  console.log('[7/9] Capturing Admin Dashboard...');
  await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);
  const adminBtn = page.locator('button[title="Admin Panel"]');
  if (await adminBtn.count() > 0) {
    await adminBtn.click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: path.join(OUT, '07-admin-desktop.png'), fullPage: false });
  }

  // --- MOBILE ---
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mPage = await mobile.newPage();

  console.log('[8/9] Capturing Mobile Hero...');
  await mPage.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
  await mPage.waitForTimeout(3000);
  await mPage.screenshot({ path: path.join(OUT, '08-mobile-hero.png'), fullPage: false });

  console.log('[9/9] Capturing Mobile Menu...');
  const mMenuEl = mPage.locator('#menu');
  await mMenuEl.scrollIntoViewIfNeeded();
  await mPage.waitForTimeout(2000);
  await mPage.screenshot({ path: path.join(OUT, '09-mobile-menu.png'), fullPage: false });

  await browser.close();

  console.log('\n=== Preview Files ===');
  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png')).sort();
  files.forEach(f => {
    const stat = fs.statSync(path.join(OUT, f));
    const kb = (stat.size / 1024).toFixed(0);
    console.log('  ' + f + ' (' + kb + ' KB)');
  });
  console.log('\nTotal: ' + files.length + ' screenshots');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
