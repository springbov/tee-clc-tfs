var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Commits pending changes in the current workspace to the server for Team Foundation version control.Required PermissionsTo use the checkin command you must have the Check in permission set to Allow. To use /author option, you must have Check in other user\'s changes permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var checkin = function(itemspec, options) {
  var params = format.items(itemspec);

  if (options.author) {
    params.push('/author');
  }

  if (options.bypass) {
    params.push('/bypass');
  }

  if (options.collection) {
    params.push('/collection');
  }

  if (options.comment) {
    params.push('/comment');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.notes) {
    params.push('/notes');
  }

  if (options.override) {
    params.push('/override');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.saved) {
    params.push('/saved');
  }

  if (options.shelveset) {
    params.push('/shelveset');
  }

  if (options.validate) {
    params.push('/validate');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('checkin', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = checkin;
