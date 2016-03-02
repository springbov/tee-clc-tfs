var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Displays the list of labels in the server for Team Foundation version control.Required PermissionsTo use the labels command, you must have the Read permission set to Allow for all files or folders to which the specified label is attached. If you have permission to some, but not all the files referenced in the label, partial results are displayed. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var labels = function(options) {
  var params = [];

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

  return tfSync('labels', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = labels;
