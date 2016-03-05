var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Removes pending changes from a workspace.
 *
 * <h5>Required Permissions</h5>
 * To use the undo command, you must be the owner of the specified workspace
 * or have the global Administer workspaces permission set to Allow.
 *
 * @summary  Removes pending changes from a workspace.
 * @see      https://msdn.microsoft.com/en-us/library/c72skhw4.aspx
 * @module   TFS Undo
 * @version  1.4.0
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get latest version of.
 *                             If empty, equals CWD.
 * @param  {Object}   options  Undo command options
 * @param  {Function} callback Function to call back once executed
 */
var undo = function(itemspec, options, callback) {
  var params = itemspec.length ? itemspec : [process.cwd()];
  params = params.concat(format.options(options));

  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: TF.exe UNDO ' + params.join(' '));
  }

  return tf('undo', params, callback, !!options.verbose);
};

module.exports = undo;
