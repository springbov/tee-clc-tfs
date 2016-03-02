var output   = require('./output'),
    SETTINGS = require('../setup')();

/**
 * Run synchronously a TFS command via the TFS command line tool
 *
 * @todo A 2.0 version with a full removal of execSync
 *
 * @version 1.3.0
 *
 * @param  {String}   command   TFS command
 * @param  {Array}    args      TFS command arguments
 * @param  {Function} callback  Callback function
 * @param  {Boolean}  isVerbose Verbose mode
 *
 * @return {Object} Response: { message: [String], isError: [Boolean] }
 */
var tfSync = function(command, args, callback, isVerbose) {
  if (!args) {
    args = [];
  }

  args.unshift(command);

  if (!callback) {
    callback = function(response) {
      if (response.isError) {
        output.error('Aborted due to errors.');
      } else {
        output.success('Done, without error.');
      }
    };
  }

  if (isVerbose) {
    output.verbose('Command: TF.exe ' + args.join(' '));
  }

  if (SETTINGS.debug) {
    if (isVerbose) {
      output.debug('"' + SETTINGS.tfPath + '" ' + args.join(' '));
    }
  } else {
    var cp = require('child_process');

    try {
      var execOptions = {
        stdio: [0, 1, 2],
      };

      cp.execSync('"' + SETTINGS.tfPath + '" ' + args.join(' '), execOptions);
    }
    catch (error) {
      return output.responseError(error, true);
    }
  }

  var response = output.response('OK', {
    command: args.join(' ')
  });

  if (callback) {
    callback(response);
  }

  return response;
};

module.exports = tfSync;
