var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Displays the version of one or more items in a workspace.Required PermissionsTo use the localversions command, you must have the Use permission to the workspace. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var localversions = function(ItemSpec, options) {
  var params = ItemSpec;

  if (options.format) {
    params.push('/format');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.workspace) {
    params.push('/workspace');
  }

  if (options.collection) {
    params.push('/collection');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('localversions', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = localversions;
