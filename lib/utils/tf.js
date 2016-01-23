var output   = require('./output'),
    SETTINGS = require('../setup')(__dirname + '/../..')();

/**
 * Run TFS a command via the TFS command line tool
 *
 * @param  {String}   command   TFS command
 * @param  {Array}    args      TFS command arguments
 * @param  {Function} callback  Callback function
 * @param  {Boolean}  isVerbose Verbose mode
 */
var tf = function(command, args, callback, isVerbose) {
  if (!args) {
    args = [];
  }

  args.unshift(command);

  if (isVerbose) {
    output.verbose('Command: TF.exe ' + args.join(' '));
  }

  if (SETTINGS.debug) {
    if (isVerbose) {
      output.debug('"' + SETTINGS.tfPath + '" ' + args.join(' '));
    }

    return args.join(' ');
  }

  var spawn = require('child_process').spawn,
      batch = spawn(SETTINGS.tfPath, args);

  batch.stdout.on('data', output.log);
  batch.stderr.on('data', output.error);

  if (callback) {
    batch.on('exit', callback);
  }

  return true;
};

module.exports = tf;
