var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Retrieves a read-only copy of a file from the server
 * for Team Foundation version control to the workspace
 * and creates folders on disk to contain it.
 *
 * Required Permissions
 * To use the get command, you must have the Read permission
 * set to Allow for every retrieved item
 * and you must either own the destination workspace
 * or have the global Administer workspaces permission.
 *
 * @summary  Get the latest version of files and folders from TFS.
 * @see      https://msdn.microsoft.com/en-us/library/fx7sdeyf.aspx
 * @module   TFS Get
 * @version  1.2.0
 *
 * @param  {Array}  itemspec File(s) and folder(s) to get latest version of.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Get command options
 */
var get = function(itemspec, options) {
  var params = format.items(itemspec);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('get', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = get;
