var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Commits pending changes in the current workspace to the server for Team Foundation version control.Required PermissionsTo use the checkin command you must have the Check in permission set to Allow. To use /author option, you must have Check in other user\'s changes permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var checkin = function(itemspec, options) {
  var params = format.items(itemspec);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('checkin', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = checkin;
