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
 * @todo Implement [/notes:"Note Name"="note text"] in tfs-checkin
 *
 * @summary  Commits pending changes in the current workspace.
 * @see      https://msdn.microsoft.com/en-us/library/c327ca1z.aspx
 * @module   TFS Checkin
 * @version  1.2.7
 *
 * @param  {Array}   itemspec File(s) and folder(s) to get latest version of.
                              If null/undefined, equals CWD.
 * @param  {Object}  options  Checkin command options
 * @param  {Boolean} viaApi   Is this function called via tfs API ?
 */
var checkin = function(itemspec, options, viaApi) {
  try {
    var params = format.items(itemspec);
  }
  catch (exception) {
    return output.responseError(exception, true);
  }

  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: TF.exe CHECKIN ' + params.join(' '));
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

  return tf('checkin', params, callback, !!options.verbose);
};

module.exports = checkin;
