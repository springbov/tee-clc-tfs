var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Lets you create, delete, view, or modify properties and mappings associated with a workspace.Required PermissionsTo modify or delete an existing workspace, you must be the owner or have the global Administer workspaces permission set to Allow. To create a workspace, you must have the global Create a workspace permission set to Allow. To create workspaces for other users, you must have the Administer workspaces permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var workspace = function(options) {
  var params = [];

  if (options.new) {
    params.push('/new');
  }

  if (options.template) {
    params.push('/template');
  }

  if (options.delete) {
    params.push('/delete');
  }

  if (options.computer) {
    params.push('/computer');
  }

  if (options.comment) {
    params.push('/comment');
  }

  if (options.newname) {
    params.push('/newname');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.collection) {
    params.push('/collection');
  }

  if (options.permission) {
    params.push('/permission');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.newowner) {
    params.push('/newowner');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('workspace', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = workspace;
