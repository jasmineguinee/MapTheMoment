// @ts-check
import { test, expect } from "@playwright/test";
import fs from "fs";

test("add area to dashboard", async ({ page }) => {
  await page.goto("http://localhost:3000/",  { waitUntil: "domcontentloaded" });
await page.goto("http://localhost:3000/dashboard",  { waitUntil: "domcontentloaded" });

// I am setting carlow to be last expected value put in as there could be duplicates with repeated testing
 await page.locator("#areaname").fill("Carlow");
 await page.getByRole("button", { name: "Add Area" }).click();
  await expect(page.locator("text=Carlow").last()).toBeVisible();

  // the open area button (on the last area added)
  const openbutton = page.locator("#open").last();
  await openbutton.click();
  await page.waitForLoadState("domcontentloaded");
  const areaurl = page.url();
  fs.writeFileSync("playwright/.auth/area-url.json", JSON.stringify({ url: areaurl}))

});


  
