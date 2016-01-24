var output   = require('./output'),
    SETTINGS = require('../setup')(__dirname + '/../..')();

/**
 * Run TFS a command via the TFS command line tool
 *
 * @version 1.2.7
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

  if (SETTINGS.debug) {
    if (isVerbose) {
      output.debug('"' + SETTINGS.tfPath + '" ' + args.join(' '));
    }
  } else {
    try {
      var cp = require('child_process');
      var execOptions = {
        stdio: [0, 1, 2],
      };

      cp.execSync('"' + SETTINGS.tfPath + '" ' + args.join(' '), execOptions);
    }
    catch (error) {
      return output.responseError(error, true);
    }
  }

  var response = output.response(args.join(' '));

  if (callback) {
    callback(response);
  }

  return response;
};

module.exports = tf;
