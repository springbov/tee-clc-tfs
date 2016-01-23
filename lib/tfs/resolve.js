var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Lets you resolve conflicts between changed items in your workspace and the latest or destination versions of items on the server.Required PermissionsTo use the resolve command, you must be either the workspace owner or have the global Administer workspaces permission set to Allow. You must also have the Read and Check out permissions for the items involved in a resolve operation set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var resolve = function(itemspec, options) {
  var params = format.items(itemspec);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('resolve', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = resolve;
