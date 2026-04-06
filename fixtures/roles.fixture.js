const { test: base, expect } = require('../fixtures/testData.fixture.js');

const test = base.extend({
  roleCheck: async ({}, use, testInfo) => {
    const projectName = testInfo.project.name;

    // Extract tags from test title
    const tags = testInfo.title.match(/@\w+/g) || [];

    // Allow tests tagged @all to run in any project
    if (tags.includes('@all')) {
      await use();
      return;
    }

    // Skip if role tag doesn't match project
    if (tags.includes('@admin') && projectName !== 'admin') {
      testInfo.skip(`Skipping @admin test in ${projectName} project`);
    }

    if (tags.includes('@user') && projectName !== 'user') {
      testInfo.skip(`Skipping @user test in ${projectName} project`);
    }

    await use();
  },
});

module.exports = { test, expect };