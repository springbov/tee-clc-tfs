var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays information about pending changes to items in one or more workspaces.Required PermissionsTo use the status command, you must have the Read permission set to Allow for all specified files or folders. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var status = function(itemspec, options) {
  var params = format.items(itemspec);

  if (options.collection) {
    params.push('/collection');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.workspace) {
    params.push('/workspace');
  }

  if (options.shelveset) {
    params.push('/shelveset');
  }

  if (options.format) {
    params.push('/format');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.user) {
    params.push('/user');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('status', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = status;
