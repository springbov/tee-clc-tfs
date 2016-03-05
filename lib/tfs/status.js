var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays information about pending changes to items
 * in one or more workspaces.
 * Or, when you use the /shelveset option, displays information
 * about pending changes in a shelveset.
 *
 * <h5>Required Permissions:</h5>
 * To use the status command, you must have the Read permission
 * set to Allow for all specified files or folders.
 *
 * @summary Displays information about pending changes.
 * @see     https://msdn.microsoft.com/en-us/library/9s5ae285.aspx
 * @module  TFS Status
 * @version 1.3.2
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get status from.
                               If null/undefined, equals CWD.
 * @param  {Object}   options  Get command options
 * @param  {Function} callback Function to call back once executed
 */
var _status = function(itemspec, options, callback) {
  var params = format.items(itemspec, true);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: TF.exe STATUS ' + params.join(' '));
  }

  var newCallback = function(responseError, response) {
    if (responseError) {
      callback(responseError, null);
      return;
    }

    if (response.stdout.trim() === 'There are no pending changes.') {
      response.hasPendingChanges = false;
      response = output.response(response.stdout.trim(), response);

      callback(null, response);
      return;
    }

    var line,
        lineRegexp = /(.+)\r\n/g,
        lineStatus,
        lineStatusRegexp = /(.*)(add|delete|edit|rename)(.*)/,
        summaryRegexp = /change\(s\)/,
        status = {
          detectedChanges: [],
          includedChanges: []
        },
        statusProperty = 'includedChanges';

    while ((line = lineRegexp.exec(response.stdout)) !== null) {
      if (line[1][0] !== '-' && line[1].substr(0, 9) !== 'File name' && line[1][0] !== '$' && !summaryRegexp.test(line[1])) {
        if (line[1] === 'Detected Changes:') {
          statusProperty = 'detectedChanges';
        } else {
          lineStatus = lineStatusRegexp.exec(line[1]);
          status[statusProperty].push({
            fileName: lineStatus[1].trim(),
            action: lineStatus[2].trim(),
            filePath: lineStatus[3].trim()
          });
        }
      }
    }

    response.hasPendingChanges = true;
    response.status = status;
    response = output.response('OK', response);

    callback(null, response);
  };

  tf('status', params, newCallback, !!options.verbose);
};

module.exports = _status;
