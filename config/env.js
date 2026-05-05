const env = {
  baseURL: 'https://www.saucedemo.com',
  timeout: 30000, // 30 seconds
  headless: process.env.HEADLESS === false,
  browser: process.env.BROWSER === 'chromium'
};

module.exports = env;