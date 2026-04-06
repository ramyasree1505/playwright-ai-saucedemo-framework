const { test: base, expect } = require('../fixtures/testFixtures.js');
const { products } = require('../utils/testData');

const test = base.extend({
  testData: async ({}, use) => {
    await use({
      product: products.backpack
    });
  }
});

module.exports = { test, expect };