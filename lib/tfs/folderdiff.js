var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Use the folderdiff command to display and compare a visual representation of the differences between files in two server folders, in a server folder and a local folder, or in two local folders. Required PermissionsTo use the folderdiff command, you must have the Read permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var folderdiff = function(targetPath, options) {
  var params = targetPath;

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.filter) {
    params.push('/filter');
  }

  if (options.filterLocalPathsOnly) {
    params.push('/filterLocalPathsOnly');
  }

  if (options.view) {
    params.push('/view');
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

  return tfSync('folderdiff', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = folderdiff;
