// @ts-check
import { test, expect } from "@playwright/test";
import fs from "fs";
import Mongoose from "mongoose";
// https://codesignal.com/learn/courses/fundamentals-of-text-data-manipulation-in-js/lessons/writing-and-appending-text-files-in-javascript-using-nodejs

test("adding venue to area view", async ({ page }) => {
const savedAreaURL = JSON.parse(fs.readFileSync("playwright/.auth/area-url.json", "utf8"));
// go to the specific area page
await page.goto(savedAreaURL.url,  { waitUntil: "domcontentloaded" });

const venueform = await page.locator("#venueform");
 await venueform.locator("#title").fill("testvenue123");
  await venueform.locator("#description").fill("great venue");
   await venueform.locator("#venuetype").selectOption("proposal");
    await venueform.locator("#latitude").fill("52.362183");
     await venueform.locator("#longitude").fill("-9.145020");
    await venueform.locator("#visibility").selectOption("public");
 await venueform.getByRole("button", { name: "Add Venue" }).click();



   await page.waitForURL(savedAreaURL.url, {waitUntil: "domcontentloaded"});

 // get the table so that the test data doesnt get confused with the map data
 const venueDetails = page.locator("#venuedetails");
 const itshows = venueDetails.locator("text=testvenue123").last()
 await expect(itshows).toBeVisible({ timeout: 60000});

  // the open area button (on the last area added)
  const openbutton = page.locator("#editvenue").last();
  await openbutton.click();

  await page.waitForLoadState("domcontentloaded");
  const venueViewUrl = page.url();
  fs.writeFileSync("playwright/.auth/venue-url.json", JSON.stringify({ url: venueViewUrl}))


});

