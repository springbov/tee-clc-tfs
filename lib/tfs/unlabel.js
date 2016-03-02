var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * Removes an item from an existing label in the server for Team Foundation version control.Required PermissionsTo use the unlabel command, you must either own the label, or have the Administer labels permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var unlabel = function(labelname, itemspec, options) {
  var params = labelname;
  params.concat(itemspec);

  if (options.recursive) {
    params.push('/recursive');
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

  return tfSync('unlabel', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = unlabel;
