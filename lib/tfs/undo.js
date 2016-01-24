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
 * @version  1.2.7
 *
 * @param  {Array}   itemspec File(s) and folder(s) to get latest version of.
                              If null/undefined, equals CWD.
 * @param  {Object}  options  Undo command options
 * @param  {Boolean} viaApi   Is this function called via tfs API ?
 */
var undo = function(itemspec, options, viaApi) {
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

  if (!viaApi) {
    var callback = function(response) {
      if (response.isError) {
        output.error('Aborted due to errors.');
      } else {
        output.success('Done.');
      }
    };
  }

  return tf('undo', params, callback, !!options.verbose);
};

module.exports = undo;
