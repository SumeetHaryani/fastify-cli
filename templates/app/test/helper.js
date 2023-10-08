"use strict";

// This file contains code that we reuse
// between our tests.

const { build: buildApplication } = require("fastify-cli/helper");
const path = require("path");
const AppPath = path.join(__dirname, "..", "app.js");
const fp = require("fastify-plugin");
// Fill in this config with all the configurations
// needed for testing the application
function config() {
  return {};
}

// automatically build and tear down our instance
const build = fp(async function (t) {
  // you can set all the options supported by the fastify CLI command
  const argv = [AppPath];

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  const app = await buildApplication(argv, config());

  // tear down our app after we are done
  t.teardown(app.close.bind(app));

  return app;
});

module.exports = {
  config,
  build,
};
