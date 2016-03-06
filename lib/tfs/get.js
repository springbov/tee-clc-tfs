var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

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
 * @version  1.4.1
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get latest version of.
 *                             If empty, equals CWD.
 * @param  {Object}   options  Get command options
 * @param  {Function} callback Function to call back once executed
 */
var get = function(itemspec, options, callback) {
  var params = itemspec.length ? itemspec : [process.cwd()];
  params = params.concat(format.options(options));

  var newCallback = function(responseError, response) {
    if (responseError) {
      callback(responseError, null);
      return;
    }

    if (response.stdout.trim() === 'All files are up to date.') {
      response.hasUpdated = false;
      response = output.response(response.stdout.trim(), response);

      callback(null, response);
      return;
    }

    response.hasUpdated = true;
    response = output.response('Get Latest Version successful.', response);

    callback(null, response);
  };

  return tf('get', params, newCallback, !!options.verbose);
};

module.exports = get;
