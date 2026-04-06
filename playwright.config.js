const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  use: {
    baseURL: require('./config/env').baseURL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
     {
      name: 'setup',
      testMatch: /.*authsetup\.spec\.js/,
      use: {
        storageState: undefined
      }
    },
    {
      name: 'user',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storage/standard.json'
      }
    },
    {
      name: 'admin',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storage/admin.json'
      }
    }
  ]
});