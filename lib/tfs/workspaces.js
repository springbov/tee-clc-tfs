var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Displays information about workspaces in the system and updates cached information about a user name or computer name change on the server that is running Visual Studio Team Foundation Server.Required PermissionsTo use the workspaces command, you must have the Read permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var workspaces = function(options) {
  var params = [];

  if (options.owner) {
    params.push('/owner');
  }

  if (options.computer) {
    params.push('/computer');
  }

  if (options.format) {
    params.push('/format');
  }

  if (options.updateUserName) {
    params.push('/updateUserName');
  }

  if (options.updateComputerName) {
    params.push('/updateComputerName');
  }

  if (options.remove) {
    params.push('/remove');
  }

  if (options.collection) {
    params.push('/collection');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('workspaces', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = workspaces;
