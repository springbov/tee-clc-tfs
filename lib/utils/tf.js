var output   = require('./output'),
    SETTINGS = require('../setup')();

/**
 * Run asynchronously a TFS command via the TFS command line tool
 *
 * @version 1.3.2
 *
 * @param  {String}   command   TFS command
 * @param  {Array}    args      TFS command arguments
 * @param  {Function} callback  Callback function
 * @param  {Boolean}  isVerbose Verbose mode
 *
 * @return {Object} Response: { message: [String], isError: [Boolean] }
 */
var tf = function(command, args, callback, isVerbose) {
  if (!args) {
    args = [];
  }

  args.unshift(command);

  if (isVerbose) {
    output.verbose('Command: TF.exe ' + args.join(' '));
  }

  // In debug environment, we return the command for testing purposes
  if (SETTINGS.debug) {
    return args.join(' ');
  }

  var response,
      stderr = '',
      stdout = '';

  try {
    var batch = require('child_process').spawn(SETTINGS.tfPath, args);

    batch.stdout.on('data', function(data) {
      stdout += data.toString();
    });

    batch.stderr.on('data', function(data) {
      stderr += data.toString();
    });

    batch.on('close', function() {
      if (stderr) {
        callback(output.responseError(stderr.trim()));
        return;
      }

      response = output.response('OK', {
        command: args.join(' '),
        stderr:  stderr,
        stdout:  stdout
      });

      callback(null, response);
    });
  }
  catch (error) {
    callback(output.responseError(error));
  }
};

module.exports = tf;
