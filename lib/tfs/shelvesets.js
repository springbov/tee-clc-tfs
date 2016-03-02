var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Displays information about a set of shelved changes.Required PermissionsTo use the shelvesets command, you must the have Read permission and the Check out permission set to Allow for the items in the shelvesets. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var shelvesets = function(shelvesetname, options) {
  var params = shelvesetname;

  if (options.owner) {
    params.push('/owner');
  }

  if (options.format) {
    params.push('/format');
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

  return tfSync('shelvesets', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = shelvesets;
