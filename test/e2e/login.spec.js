// @ts-check
import { test, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json"
test("login and save as logged in", async ({ page }) => {
  await page.goto("http://jasmineslaptop:3000/login");

  await page.getByRole("textbox", { name: "email" }).fill("testmaevee2e@gmail.com");
  await page.getByRole("textbox", { name: "password" }).fill("testmaeve");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page).toHaveURL("http://jasmineslaptop:3000/dashboard");

  await page.context().storageState({path: authFile});



});

