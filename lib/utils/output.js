var chalk = require('chalk');

/**
 * [output description]
 *
 * @version 1.2.3
 * 
 * @type {Object}
 */
var output = {
  debug: function(message) {
    console.log(chalk.yellow(message));
  },

  error: function(error) {
    console.error('\n' + chalk.red('Error: ' + error.toString()));
  },

  info: function(message) {
    console.log(chalk.magenta(message));
  },

  log: function(data) {
    process.stdout.write(chalk.gray(data.toString()));
  },

  success: function(message) {
    console.log(chalk.green(message));
  },

  verbose: function(message) {
    console.log(chalk.cyan(message));
  }
};

module.exports = output;
