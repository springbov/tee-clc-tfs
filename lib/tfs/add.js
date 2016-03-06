var format = require('../utils/format'),
    tf     = require('../utils/tf');

/**
 * Adds files and folders from a local file system to a server
 * for Team Foundation version control.
 *
 * <h5>Note</h5>
 * The results of this command are not reflected in the server
 * for Team Foundation version control until you perform a check-in operation.
 * For more information, see Check In Pending Changes.
 *
 * <h5>Required Permissions:</h5>
 * To use the add command, you must own the workspace and your Check out
 * permission for the parent folder of the new items must be set to Allow.
 * Your Lock permission must also be set to Allow if you use /lock:checkout
 * or /lock:checkin.
 *
 * @summary  Adds files and folders to version control.
 * @see      https://msdn.microsoft.com/en-us/library/f9yw4ea0.aspx
 * @module   TFS Add
 * @version  1.4.0
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get latest version of.
 *                             If empty, equals CWD.
 * @param  {Object}   options  Checkout command options
 * @param  {Function} callback Function to call back once executed
 */
var add = function(itemspec, options, callback) {
  var params = itemspec.length ? itemspec : [process.cwd()];
  params = params.concat(format.options(options));

  return tf('add', params, callback, !!options.verbose);
};

module.exports = add;
