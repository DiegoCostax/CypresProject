const { defineConfig } = require("cypress");

module.exports = defineConfig({
   projectId: 'wgza8f',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://barrigarest.wcaquino.me',
  },
});
