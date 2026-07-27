import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const outerSpan = h1.querySelector("span");
  const innerSpan = outerSpan.querySelector("span");
  const outerRect = outerSpan.getBoundingClientRect();
  const innerCs = getComputedStyle(innerSpan);
  return {
    outerRect: { top: outerRect.top, bottom: outerRect.bottom, width: outerRect.width, height: outerRect.height },
    innerClipPath: innerCs.clipPath,
    innerDisplay: innerCs.display,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
