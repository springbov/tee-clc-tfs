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
 * @version  1.2.5
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var undo = function(itemspec, options, viaApi) {
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

  return tf('undo', params, callback, !!options.verbose);
};

module.exports = undo;
