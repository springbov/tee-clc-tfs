var output   = require('./output'),
    SETTINGS = require('../setup')();

/**
 * Run TFS a command via the TFS command line tool
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
    var cp = require('child_process');

    try {
      if (command === 'status') {
        var spawn = require('child_process').spawn;
        var batch = spawn(SETTINGS.tfPath, args);
        var stderr = '',
            stdout = '';

        batch.stdout.on('data', function(data) {
          stdout += data.toString();
        });

        batch.stderr.on('data', function(error) {
          console.log(error.toString());
        });

        batch.on('close', function() {
          var lineRegexp = /(.+)\r\n/g,
              statusRegexp = /(.*)(add|edit)(.*)/,
              summaryRegexp = /change\(s\)/,
              result,
              status = {
                detectedChanges: [],
                includedChanges: []
              },
              statusProperty = 'includedChanges';

          while ((result = lineRegexp.exec(stdout)) !== null) {
            if (result[1][0] !== '-' && result[1].substr(0, 9) !== 'File name' && result[1][0] !== '$' && !summaryRegexp.test(result[1])) {
              if (result[1] === 'Detected Changes:') {
                statusProperty = 'detectedChanges';
              } else {
                var lineResults = statusRegexp.exec(result[1]);
                status[statusProperty].push({
                  fileName: lineResults[1].trim(),
                  action: lineResults[2].trim(),
                  filePath: lineResults[3].trim()
                });
              }
            }
          }

          if (callback) {
            var response = output.response('OK', {
              command: args.join(' '),
              status:  status
            });

            callback(response);
          }

          return;
        });
      } else {
        var execOptions = {
          stdio: [0, 1, 2],
        };

        cp.execSync('"' + SETTINGS.tfPath + '" ' + args.join(' '), execOptions);
      }
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

module.exports = tf;
