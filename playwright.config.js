const { defineConfig, devices } = require('@playwright/test');
const env = require('./config/env');

module.exports = defineConfig({
  testDir: './tests',

  timeout: env.timeout,

  expect: {
    timeout: 5000
  },

  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  outputDir: 'test-results/',

  use: {
    baseURL: env.baseURL,
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});