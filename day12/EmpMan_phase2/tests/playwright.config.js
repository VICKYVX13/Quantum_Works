// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './specs',
  timeout: 60000,
  expect: { timeout: 15000 },
  fullyParallel: false,        // Run tests sequentially (single session)
  retries: 1,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 30000,
    storageState: undefined,   // Will be set per-project after login
  },

  projects: [
    // Step 1: login & save storage state
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    // Step 2: all module tests use the saved auth state
    {
      name: 'ems-tests',
      testMatch: /.*\.spec\.js/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    cwd: '../', // Root project folder relative to tests folder
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
