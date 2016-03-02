var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync = require('../utils/tfSync');

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
 * @version  1.3.0
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get latest version of.
                               If null/undefined, equals CWD.
 * @param  {Object}   options  Undo command options
 * @param  {Function} callback Function to call back once executed
 */
var undo = function(itemspec, options, callback) {
  try {
    var params = format.items(itemspec);
  }
  catch (exception) {
    return output.responseError(exception, true);
  }

  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: TF.exe UNDO ' + params.join(' '));
  }

  return tfSync('undo', params, callback, !!options.verbose);
};

module.exports = undo;
