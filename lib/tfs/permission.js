var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Modifies the user access control list (ACL) and displays authorization settings for an item under version control.Required PermissionsTo use the permission command, you must have the Manipulate security settings permission set to Allow for the folders being modified, be a member of the Team Foundation Administrators security group, or be a system administrator on the local computer (Windows Administrator security group). For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var permission = function(options) {
  var params = [];

  if (options.allow) {
    params.push('/allow');
  }

  if (options.deny) {
    params.push('/deny');
  }

  if (options.remove) {
    params.push('/remove');
  }

  if (options.inherit) {
    params.push('/inherit');
  }

  if (options.user) {
    params.push('/user');
  }

  if (options.group) {
    params.push('/group');
  }

  if (options.collection) {
    params.push('/collection');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.global) {
    params.push('/global');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('permission', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = permission;
