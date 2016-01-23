var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Retrieves a read-only copy of a file from the server for Team Foundation version control to the workspace and creates folders on disk to contain it.Required PermissionsTo use the get command, you must have the Read permission set to Allow for every retrieved item and you must either own the destination workspace or have the global Administer workspaces permission. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var get = function(itemspec, options) {
  var params = format.items(itemspec);

  if (options.version) {
    params.push('/version');
  }

  if (options.all) {
    params.push('/all');
  }

  if (options.overwrite) {
    params.push('/overwrite');
  }

  if (options.force) {
    params.push('/force');
  }

  if (options.preview) {
    params.push('/preview');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.remap) {
    params.push('/remap');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('get', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = get;
