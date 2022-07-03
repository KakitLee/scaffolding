//Logging helper
const chalk = require('chalk');

/**
 * Error logging
 * @param {string} string - The error message string
 */
function error(string) {
  console.log(chalk.red(string));
}

/**
 * Info logging
 * @param {string} string - The info message string
 */
function info(string) {
  console.log(chalk.rgb(0, 102, 204)(string));
}

/**
 * Success logging
 * @param {string} string - The success message string
 */
function success(string) {
  console.log(chalk.green(string));
}

module.exports = {
  error,
  info,
  success,
};
