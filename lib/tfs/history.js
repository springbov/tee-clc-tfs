var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync = require('../utils/tfSync');

/**
 * Displays the revision history for one or more files, folders or both.
 *
 * <h5>Required Permissions</h5>
 * To use the history command, you must have Read permission
 * set to Allow for all files or folders for which history is requested.
 *
 * @todo Is there a way to launch history (TF.exe window) via API ?
 *
 * @summary  Displays the revision history for one or more files, folders or both.
 * @see      https://msdn.microsoft.com/en-us/library/yxtbh4yh.aspx
 * @module   TFS History
 * @version  1.3.0
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get latest version of.
                               If null/undefined, equals CWD.
 * @param  {Object}   options  History command options
 * @param  {Function} callback Function to call back once executed
 */
var _history = function(itemspec, options, callback) {
  try {
    var params = format.items(itemspec);
  }
  catch (exception) {
    return output.responseError(exception, true);
  }

  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: TF.exe HISTORY ' + params.join(' '));
  }

  return tfSync('history', params, callback, !!options.verbose);
};

module.exports = _history;
