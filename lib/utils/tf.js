var format   = require('./format'),
    output   = require('./output'),
    SETTINGS = require('../setup')(__dirname + '/../..')();

/**
 * Run TFS a command via the TFS command line tool
 *
 * @param  {String}   command   TFS command
 * @param  {Array}    options   TFS command options
 * @param  {Function} callback  Callback function
 * @param  {Boolean}  isVerbose Verbose mode
 */
var tf = function(command, options, callback, isVerbose) {
  if (!options) {
    options = [];
  }

  options.unshift(command);

  if (isVerbose) {
    output.verbose('Command: TF.exe get ' + options.join(' '));
  }

  if (SETTINGS.debug) {
    output.debug('"' + SETTINGS.tfPath + '" ' + options.join(' '));
  }

  var spawn = require('child_process').spawn,
      batch = spawn(SETTINGS.tfPath, options);

  batch.stdout.on('data', output.log);
  batch.stderr.on('data', output.error);

  if (callback) {
    batch.on('exit', callback);
  }
}

module.exports = tf;
