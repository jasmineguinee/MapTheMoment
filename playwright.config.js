// @ts-check
import { defineConfig, devices } from "@playwright/test";


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./test/e2e",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "http://localhost:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
// added time out of two minutes here to give it time to load to avoid crashes
   webServer: {
    command: "npm start",
    url: "http://localhost:3000",
    reuseExistingServer: false,
    timeout: 120 * 1000,
  },

  projects: [

    {
      name: "signup",
      testMatch: /signup\.spec\.js/,
    },

       {
      name: "login",
      testMatch: /login\.spec\.js/,
      dependencies: ["signup"],
    },

    {
      name: "chromium",
      use: { 
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      testIgnore: [/signup\.spec\.js/, /login\.spec\.js/],
      dependencies:["login"],
    },

    {
      name: "firefox",
      use: {
         ...devices["Desktop Firefox"] ,
          storageState: "playwright/.auth/user.json",
      },
      testIgnore: [/signup\.spec\.js/, /login\.spec\.js/],
      dependencies:["login"],
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"],
         storageState: "playwright/.auth/user.json",
       },
         testIgnore: [/signup\.spec\.js/, /login\.spec\.js/],
      dependencies:["login"],
    },



  ],

});

