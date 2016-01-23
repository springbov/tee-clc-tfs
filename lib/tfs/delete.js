var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Removes files and folders from the Team Foundation version control server and deletes them from the disk.Note   The results of this command are not visible in other workspaces until you perform a check-in operation. For more information, see Check In Pending Changes.Required PermissionsTo use the delete command, you must have the Check out permission set to Allow. If you include the /lock option with a value other than none, you must have the Lock permission set to Allow. Additionally, you must own the workspace or have the global Administer workspaces permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var delete = function(itemspec, options) {
  var params = format.items(itemspec);

  if (options.lock) {
    params.push('/lock');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('delete', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = delete;
