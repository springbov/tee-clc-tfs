var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Displays detailed information about past merges between the specified source and destination branches.Required PermissionsTo use the merges command, you must have the Read permission set to Allow for both source and destination branches. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var merges = function(destination, options) {
  var params = destination;

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.extended) {
    params.push('/extended');
  }

  if (options.format) {
    params.push('/format');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.showall) {
    params.push('/showall');
  }

  if (options.collection) {
    params.push('/collection');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('merges', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = merges;
