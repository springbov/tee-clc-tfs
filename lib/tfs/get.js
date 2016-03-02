var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync = require('../utils/tfSync');

/**
 * Retrieves a read-only copy of a file from the server
 * for Team Foundation version control to the workspace
 * and creates folders on disk to contain it.
 *
 * <h5>Required Permissions:</h5>
 * To use the get command, you must have the Read permission
 * set to Allow for every retrieved item
 * and you must either own the destination workspace
 * or have the global Administer workspaces permission.
 *
 * @summary  Get the latest version of files and folders.
 * @see      https://msdn.microsoft.com/en-us/library/fx7sdeyf.aspx
 * @module   TFS Get
 * @version  1.3.0
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get latest version of.
                               If null/undefined, equals CWD.
 * @param  {Object}   options  Get command options
 * @param  {Function} callback Function to call back once executed
 */
var get = function(itemspec, options, callback) {
  try {
    var params = format.items(itemspec);
  }
  catch (exception) {
    return output.responseError(exception, true);
  }

  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: TF.exe GET ' + params.join(' '));
  }

  return tfSync('get', params, callback, !!options.verbose);
};

module.exports = get;
