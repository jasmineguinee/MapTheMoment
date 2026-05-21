// @ts-check
import { test, expect } from "@playwright/test";

test("page is sign up", async ({ page }) => {
  await page.goto("http://localhost:3000/signup");

  await page.locator("#firstname").fill("Maeve");
  await page.locator("#lastname").fill("Murray");
  await page.locator("#email").fill("testmaevee2e@gmail.com");
  await page.locator("#password").fill("testmaeve");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page).toHaveURL("http://localhost:3000/");
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000/");
 await page.getByRole("link", { name: "Signup" }).click();
 await expect(page.getByRole("heading", {name: "Sign up"})).toBeVisible();


  
});