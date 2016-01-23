var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Locks or unlocks a file or folder to deny or restore the right of users to check out an item for edit into a different workspace or to check in pending changes to an item from a different workspace.Required PermissionsTo use the lock command, you must have the Lock permission set to Allow. Having the Unlock other user\'s changes permission set to Allow is required to remove a lock held by another user if you do not have Write permission for that user\'s workspace. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var lock = function(itemspec, options) {
  var params = format.items(itemspec);

  if (options.lock) {
    params.push('/lock');
  }

  if (options.workspace) {
    params.push('/workspace');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.collection) {
    params.push('/collection');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('lock', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = lock;
