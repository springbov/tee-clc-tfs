var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Enables an administrator to view and change the following configuration settings for a team project in the Source Control Settings dialog box:Check-out settingsCheck-in policiesCheck-in notesRequired PermissionsTo use the configure command, you must have the Edit server-level information permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var configure = function(options) {
  var params = [];

  if (options.collection) {
    params.push('/collection');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('configure', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = configure;
