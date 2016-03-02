var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays information about pending changes to items
 * in one or more workspaces.
 * Or, when you use the /shelveset option, displays information
 * about pending changes in a shelveset.
 *
 * <h5>Required Permissions:</h5>
 * To use the status command, you must have the Read permission
 * set to Allow for all specified files or folders.
 *
 * @summary Displays information about pending changes.
 * @see     https://msdn.microsoft.com/en-us/library/9s5ae285.aspx
 * @module  TFS Status
 * @version 1.3.0
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get status from.
                               If null/undefined, equals CWD.
 * @param  {Object}   options  Get command options
 * @param  {Function} callback Function to call back once executed
 */
var status = function(itemspec, options, callback) {
  var params = format.items(itemspec, true);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('status', params, callback, !!options.verbose);
};

module.exports = status;
