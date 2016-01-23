var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Restores shelved file revisions, check-in notes, comments, and work item associations to the current workspace or removes an existing shelveset from the server.Required PermissionsTo use the unshelve command, you must have the Read permission set to Allow, and you must have the Check out permission for the items in the shelveset set to Allow. Additionally, to delete a shelveset, you must be its owner or have the Administer shelved changes global permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var unshelve = function(itemspec, options) {
  var params = itemspec;

  if (options.move) {
    params.push('/move');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('unshelve', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = unshelve;
