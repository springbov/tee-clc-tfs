var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Compares, and if it is possible, displays differences between two files, files in two folders, or a shelveset and a local or a server file.Required PermissionsTo use the difference command, you must have the Read permission for all specified items set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var difference = function(header.h, options) {
  var params = header.h;

  if (options.type) {
    params.push('/type');
  }

  if (options.version) {
    params.push('/version');
  }

  if (options.format) {
    params.push('/format');
  }

  if (options.ignorespace) {
    params.push('/ignorespace');
  }

  if (options.ignoreeol) {
    params.push('/ignoreeol');
  }

  if (options.ignorecase) {
    params.push('/ignorecase');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.options) {
    params.push('/options');
  }

  if (options.shelveset) {
    params.push('/shelveset');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.configure) {
    params.push('/configure');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('difference', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = difference;
