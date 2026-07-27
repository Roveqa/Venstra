import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

async function scrollToWithOffset(selector, offset = 150) {
  await page.evaluate(({ sel, off }) => {
    const el = document.querySelector(sel);
    const rect = el.getBoundingClientRect();
    window.scrollTo(0, window.scrollY + rect.top - off);
  }, { sel: selector, off: offset });
}

const sections = [
  { name: "light-dark", selector: "h2:has-text('Light and dark')" },
  { name: "cta-banner", selector: "h2:has-text('Code components')" },
  { name: "faq", selector: "h2:has-text('Frequently asked')" },
  { name: "closing-cta", selector: "h2:has-text('The design system built for real products')" },
];

for (const s of sections) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(50);
  await scrollToWithOffset(s.selector, 200);
  await page.waitForTimeout(30);
  const el = page.locator(s.selector);
  await el.screenshot({ path: `/private/tmp/claude-501/-Users-yanbogdanov-test-ds/b04576d4-b486-4b5a-aeb6-212e8cb6a245/scratchpad/h2-${s.name}-early.png` });
  await page.waitForTimeout(1200);
  await el.screenshot({ path: `/private/tmp/claude-501/-Users-yanbogdanov-test-ds/b04576d4-b486-4b5a-aeb6-212e8cb6a245/scratchpad/h2-${s.name}-late.png` });
}

await browser.close();
