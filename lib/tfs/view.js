var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * The view command retrieves a specific version of a file to a temporary folder on your computer and displays it.Required PermissionsTo use the view command, you must have the Read permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var view = function(itemspec, options) {
  var params = format.items(itemspec);

  if (options.console) {
    params.push('/console');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.shelveset) {
    params.push('/shelveset');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.version) {
    params.push('/version');
  }

  if (options.collection) {
    params.push('/collection');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.output) {
    params.push('/output');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('view', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = view;
