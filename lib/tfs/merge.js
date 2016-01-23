var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * The merge command applies changes from one branch into another.NoteThe results of this command are not reflected in the Team Foundation version control server until you perform a check-in operation. For more information, see Check In Pending Changes.Required PermissionsTo use the merge command, you must have the Check out permission set to Allow for the workspace folder that contains the destination and you must have the Read permission set to Allow for the workspace folder that contains the source. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var merge = function(source, destination, options) {
  var params = source;
  params.concat(destination);

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.force) {
    params.push('/force');
  }

  if (options.candidate) {
    params.push('/candidate');
  }

  if (options.discard) {
    params.push('/discard');
  }

  if (options.version) {
    params.push('/version');
  }

  if (options.lock) {
    params.push('/lock');
  }

  if (options.preview) {
    params.push('/preview');
  }

  if (options.baseless) {
    params.push('/baseless');
  }

  if (options.noimplicitbaseless) {
    params.push('/noimplicitbaseless');
  }

  if (options.nosummary) {
    params.push('/nosummary');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.conservative) {
    params.push('/conservative');
  }

  if (options.format) {
    params.push('/format');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('merge', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = merge;
