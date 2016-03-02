var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Displays information about items under version control.Required PermissionsTo use the properties command, you must have the Read permission set to Allow for all specified files and folders. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var properties = function(itemspec, options) {
  var params = format.items(itemspec);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('properties', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = properties;
