var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays the revision history for one or more files, folders or both.Required PermissionsTo use the history command, you must have Read permission set to Allow for all files or folders for which history is requested. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var history = function(itemspec, options) {
  var params = itemspec;

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('history', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = history;
