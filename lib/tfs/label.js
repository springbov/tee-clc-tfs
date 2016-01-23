var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Attaches a label to or removes a label from a version of a file or folder in the server for Team Foundation version control.Required PermissionsTo use the label command, you must have the Label permission set to Allow. To modify or delete labels created by other users, you must have the Administer labels permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var label = function(labelname[@scope], options) {
  var params = labelname[@scope];

  if (options.owner) {
    params.push('/owner');
  }

  if (options.version) {
    params.push('/version');
  }

  if (options.comment) {
    params.push('/comment');
  }

  if (options.child) {
    params.push('/child');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.delete) {
    params.push('/delete');
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

  return tf('label', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = label;
