var SETTINGS = require('../setup')(__dirname + '/../..')(),
    output   = require('./output');

/**
 * Run TFS a command via the TFS command line tool
 *
 * @param  {String}   command  TFS command
 * @param  {Array}    options  TFS command options
 * @param  {Function} callback Callback function
 */
var tf = function(command, options, callback) {
  if (!options) {
    options = [];
  }

  options.unshift(command);

  var spawn = require('child_process').spawn,
      batch = spawn(SETTINGS.tfPath, options);

  batch.stdout.on('data', output.log);
  batch.stderr.on('data', output.error);

  if (callback) {
    batch.on('exit', callback);
  }
}

module.exports = tf;
