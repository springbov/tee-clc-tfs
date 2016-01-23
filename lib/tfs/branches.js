var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays the history of a branch for a specified file or folder.Required PermissionsTo use the branches command, your Read permission must be set to Allow for the item and any branches to view their history. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var branches = function(itemspec, options) {
  var params = format.items(itemspec);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('branches', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = branches;
