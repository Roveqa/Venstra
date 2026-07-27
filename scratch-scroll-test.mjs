import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

const height = await page.evaluate(() => document.body.scrollHeight);
console.log("scrollHeight:", height);

for (let y = 0; y < height; y += 700) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(400);
}
await page.waitForTimeout(500);
await page.screenshot({ path: "/tmp/audit/home__desktop_realscroll.png", fullPage: true });
await browser.close();
