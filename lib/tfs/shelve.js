var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Stores a set of pending changes, together with pending check-in notes, a comment, and a list of associated work items on the server that is running Visual Studio Team Foundation Server without actually checking them into the version control server.Required PermissionsIf you want to use the shelve command to delete a shelveset, you must be a shelveset owner, or your Administer shelved changes permission must be set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var shelve = function(options) {
  var params = [];

  if (options.move) {
    params.push('/move');
  }

  if (options.replace) {
    params.push('/replace');
  }

  if (options.delete) {
    params.push('/delete');
  }

  if (options.comment) {
    params.push('/comment');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.validate) {
    params.push('/validate');
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

  return tfSync('shelve', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = shelve;
