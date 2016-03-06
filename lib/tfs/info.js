var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays information about items under version control.
 *
 * <h5>Required Permissions</h5>
 * To use the info command, you must have the Read permission
 * set to Allow for all specified files and folders.
 *
 * @summary  Displays information about items under version control.
 * @see      https://msdn.microsoft.com/en-us/library/tzy14b58.aspx
 * @module   TFS Info
 * @version  1.4.1
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get property of.
 *                             If empty, equals CWD.
 * @param  {Object}   options  Get command options
 * @param  {Function} callback Function to call back once executed
 */
var info = function(itemspec, options, callback) {
  var params = itemspec.length ? itemspec : [process.cwd()];
  params = params.concat(format.options(options));

  var newCallback = function(responseError, response) {
    if (responseError) {
      callback(responseError, null);
      return;
    }

    var line,
        lineRegexp = /(.+)\r\n/g,
        lineInfo,
        lineInfoRegexp = /\s{2}([^:]*):(.*)/,
        info = {
          localInformation: {},
          serverInformation: {}
        },
        infoProperty = 'localInformation';

    while ((line = lineRegexp.exec(response.stdout)) !== null) {
      if (line[1] !== 'Local information:') {
        if (line[1] === 'Server information:') {
          infoProperty = 'serverInformation';
        } else {
          lineInfo = lineInfoRegexp.exec(line[1]);
          info[infoProperty][format.camelize(lineInfo[1].trim())] = lineInfo[2].trim();
        }
      }
    }

    response.hasPendingChanges = true;
    response.info = info;

    callback(null, response);
  };

  return tf('info', params, newCallback, !!options.verbose);
};

module.exports = info;
