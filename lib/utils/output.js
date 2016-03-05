var chalk = require('chalk');

/**
 * [output description]
 *
 * @todo Comment output.js
 *
 * @version 1.3.2
 *
 * @type {Object}
 */
var output = {
  callback: function(responseError, response) {
    if (responseError) {
      console.log(responseError.error);
      output.error('Aborted due to errors.');
      return;
    }

    console.log('\n' + response.stdout);
    output.success('Done, without error.');
  },

  debug: function(message) {
    console.log(chalk.yellow(message));
  },

  error: function(error) {
    console.log(chalk.red(error));
  },

  info: function(message) {
    console.log(chalk.magenta(message));
  },

  log: function(data) {
    process.stdout.write(chalk.gray(data.toString()));
  },

  logError: function(error) {
    process.stdout.write(chalk.red(error.toString()));
  },

  response: function(message, customResponse) {
    var response = customResponse ? customResponse : {};
    response.message = message;
    response.isError = false;

    return response;
  },

  responseError: function(error, logIt) {
    if (logIt) {
      output.error(error);
    }

    return {
      error:   error,
      isError: true
    };
  },

  success: function(message) {
    console.log(chalk.green(message));
  },

  verbose: function(message) {
    console.log(chalk.cyan(message));
  }
};

module.exports = output;
