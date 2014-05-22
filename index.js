var chalk = require("chalk");

var error = function (boldStatement) {
  console.error(chalk.red("You must have fibrous installed *globally and not locally* to use this module"));
  console.error("    " + "      " + " npm uninstall fibrous");
  console.error("    " + chalk.grey("[sudo]") + " npm install -g fibrous");
  console.error("    " + "      " + " npm install use-global-fibrous --save");
  console.error("");
  console.error("And switch all your require('fibrous') calls to require('use-global-fibrous')");
  console.error(chalk.grey("Why? https://github.com/650Industries/use-global-fibrous/blob/master/README.md"));
  console.error("");
}

try {
  fibrousPath = require.resolve("fibrous");
} catch (e) {
  error();
  throw e;
}

// TODO: Make this less fragile and not assume things about the 
// way the system is setup
//if (fibrousPath != "/usr/local/lib/node_modules/fibrous/lib/fibrous.js") {
if (!/\/usr\/.*\/fibrous.js/.test(fibrousPath)) {
  error();
  throw new Error("Refusing to use local fibrous install");
}

module.exports = require("fibrous");
