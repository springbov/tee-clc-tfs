var chalk = require('chalk');

var output = {
  info: function(message) {
    console.log(chalk.magenta(message));
  },

  log: function(data) {
    process.stdout.write(chalk.gray(data.toString()));
  },

  error: function(error) {
    console.log('\n' + chalk.red('Error: ' + error.toString()));
    process.exit();
  },

  verbose: function(message) {
    console.log(chalk.green(message));
  }
};

module.exports = output;
