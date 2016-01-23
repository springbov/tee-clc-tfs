var format = require('../utils/format'),
    output = require('../utils/output'),
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
 * @summary  Commits pending changes in the current workspace.
 * @see      https://msdn.microsoft.com/en-us/library/c327ca1z.aspx
 * @module   TFS Checkin
 * @version  1.2.5
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var checkin = function(itemspec, options, viaApi) {
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

  return tf('checkin', params, callback, !!options.verbose);
};

module.exports = checkin;
