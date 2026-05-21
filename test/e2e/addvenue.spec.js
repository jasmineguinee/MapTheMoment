// @ts-check
import { test, expect } from "@playwright/test";
import fs from "fs";
// https://codesignal.com/learn/courses/fundamentals-of-text-data-manipulation-in-js/lessons/writing-and-appending-text-files-in-javascript-using-nodejs

test("adding venue to area view", async ({ page }) => {
const savedAreaURL = JSON.parse(fs.readFileSync("playwright/.auth/area-url.json", "utf8"));
// go to the specific area page
await page.goto(savedAreaURL.url,  { waitUntil: "domcontentloaded" });

 await page.locator("#title").fill("testvenue123");
  await page.locator("#description").fill("great venue");
   await page.locator("#venuetype").selectOption("proposal");
    await page.locator("#latitude").fill("52.362183");
     await page.locator("#longitude").fill("-9.145020");
    await page.locator("#visibility").selectOption("public");
 await page.getByRole("button", { name: "Add Venue" }).click();

 // get the table so that the test data doesnt get connfused with the map data
 const venueDetails = page.locator("#venuedetails");

  await expect(venueDetails.locator("text=testvenue123").last()).toBeVisible();

  // the open area button (on the last area added)
  const openbutton = page.locator("#editvenue").last();
  await openbutton.click();
  await page.waitForLoadState("domcontentloaded");
  const venueViewUrl = page.url();
  fs.writeFileSync("playwright/.auth/venue-url.json", JSON.stringify({ url: venueViewUrl}))


});
