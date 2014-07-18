var chalk = require("chalk");

function error(boldStatement) {
  console.error(chalk.red("You must have fibrous installed *globally and not locally* to use this module"));
  console.error("    " + "      " + " npm uninstall fibrous");
  console.error("    " + chalk.grey("[sudo]") + " npm install -g fibrous");
  console.error("    " + "      " + " npm install use-global-fibrous --save");
  console.error("");
  console.error("And switch all your require('fibrous') calls to require('use-global-fibrous')");
  console.error(chalk.grey("Why? https://github.com/650Industries/use-global-fibrous/blob/master/README.md"));
  console.error("");
}

function isGlobalPath(modulePath) {
  if (!process.env.NODE_PATH) {
    return false;
  }

  var path = require("path");
  var nodePaths = process.env.NODE_PATH.split(path.delimiter);
  return nodePaths.some(function(nodePath) {
    nodePath = nodePath.trim()
    if (!nodePath) {
      return false;
    }
    return modulePath.indexOf(nodePath) === 0;
  });
}

try {
  var fibrousPath = require.resolve("fibrous");
} catch (e) {
  error();
  throw e;
}

if (!isGlobalPath(fibrousPath)) {
  error();
  throw new Error("Refusing to use local fibrous install");
}

module.exports = require("fibrous");
