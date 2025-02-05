import {defineConfig, devices } from '@playwright/test';
import path from 'path';
import ENV from './utils/env';
export const STORAGE_STATE = path.join(__dirname, 'playwright/.auth/user.json');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: './setup/global-setup',
  testDir: './src/tests',
  // Each test is given 30 seconds.
  timeout: 30000,
  expect: {
    timeout: 2000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["allure-playwright",  {
    detail: true,
    outputFolder: "my-allure-results",
    suiteTitle: false,
  }],['html', { open: 'never' }],['list'],['json', {  outputFile: 'test-results.json' }]],
  //reporter: './utils/custom-reporter.ts',

  //testMatch: './src/tests/apiTestSuite.ts',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //baseURL: 'https://dummyjson.com' 'http://restapi.adequateshop.com',
    baseURL: ENV.BASE_URL,
    ignoreHTTPSErrors:true,
    acceptDownloads:true,
    actionTimeout: 0,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'ProjectA',
      use: { ...devices['Desktop Chrome'], 
        baseURL: "https://dummyjson.com"},
    },
    {
      name: 'ProjectB',
      use: { ...devices['Desktop Chrome'], 
        baseURL: "http://restapi.adequateshop.com"},
      dependencies: ['login']
    },

    {
      name: 'login',
      testMatch: './setup/login.setup.ts',
      use: { ...devices['Desktop Chrome'], 
        baseURL: "http://restapi.adequateshop.com"},
    
    },
    
  /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

   Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


