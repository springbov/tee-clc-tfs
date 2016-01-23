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
 * @version  1.2.4
 *
 * @param  {Array}   itemspec File(s) and folder(s) to get latest version of.
                              If null/undefined, equals CWD.
 * @param  {Object}  options  Get command options
 * @param  {Boolean} viaApi   Is this function called via tfs API ?
 */
var get = function(itemspec, options, viaApi) {
  var params = format.items(itemspec);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  var callback = null;
  if (!viaApi) {
    callback = function() {
      output.success('Done.');
    };
  }

  return tf('get', params, callback, !!options.verbose);
};

module.exports = get;
