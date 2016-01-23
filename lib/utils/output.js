var chalk = require('chalk');

var output = {
  debug: function(message) {
    console.log(chalk.yellow(message));
  },

  error: function(error) {
    console.log('\n' + chalk.red('Error: ' + error.toString()));
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
