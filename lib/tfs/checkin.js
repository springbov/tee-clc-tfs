var format = require('../utils/format'),
    tf     = require('../utils/tf');

/**
 * Commits pending changes in the current workspace to the server
 * for Team Foundation version control.
 *
 * <h5>Required Permissions</h5>
 * To use the checkin command you must have the Check in permission
 * set to Allow. To use /author option, you must have
 * Check in other user\'s changes permission set to Allow.
 *
 * @todo Implement [/notes:"Note Name"="note text"] in tfs-checkin
 *
 * @summary  Commits pending changes in the current workspace.
 * @see      https://msdn.microsoft.com/en-us/library/c327ca1z.aspx
 * @module   TFS Checkin
 * @version  1.4.0
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get latest version of.
 *                             If empty, equals CWD.
 * @param  {Object}   options  Checkin command options
 * @param  {Function} callback Function to call back once executed
 */
var checkin = function(itemspec, options, callback) {
  var params = itemspec.length ? itemspec : [process.cwd()];
  params = params.concat(format.options(options));

  params = params.concat(format.options(options));

  return tf('checkin', params, callback, !!options.verbose);
};

module.exports = checkin;
