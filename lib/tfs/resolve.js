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
var resolve = function(options) {
  var params = [];

  if (options.auto) {
    params.push('/auto');
  }

  if (options.preview) {
    params.push('/preview');
  }

  if (options.overridetype) {
    params.push('/overridetype');
  }

  if (options.converttotype) {
    params.push('/converttotype');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.newname) {
    params.push('/newname');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('resolve', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = resolve;
