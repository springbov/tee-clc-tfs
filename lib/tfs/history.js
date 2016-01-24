var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays the revision history for one or more files, folders or both.
 *
 * <h5>Required Permissions</h5>
 * To use the history command, you must have Read permission
 * set to Allow for all files or folders for which history is requested.
 *
 * @summary  Displays the revision history for one or more files, folders or both.
 * @see      https://msdn.microsoft.com/en-us/library/yxtbh4yh.aspx
 * @module   TFS History
 * @version  1.2.7
 *
 * @param  {Array}   itemspec File(s) and folder(s) to get latest version of.
                              If null/undefined, equals CWD.
 * @param  {Object}  options  History command options
 * @param  {Boolean} viaApi   Is this function called via tfs API ?
 */
var _history = function(itemspec, options, viaApi) {
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

  if (!viaApi) {
    var callback = function(response) {
      if (response.isError) {
        output.error('Aborted due to errors.');
      } else {
        output.success('Done.');
      }
    };
  }

  return tf('history', params, callback, !!options.verbose);
};

module.exports = _history;
