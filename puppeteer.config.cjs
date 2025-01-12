const { join, resolve } = require("node:path");

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  cacheDirectory: resolve(
    join(__dirname, "node_modules", ".cache", "puppeteer")
  ),
};
