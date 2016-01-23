var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * The dir command displays all or some of the contents of the server for Team Foundation version control.Required PermissionsTo use the dir command, you must have Read permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var dir = function(itemspec, options) {
  var params = format.items(itemspec);

  if (options.version) {
    params.push('/version');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.folders) {
    params.push('/folders');
  }

  if (options.deleted) {
    params.push('/deleted');
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

  return tf('dir', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = dir;
