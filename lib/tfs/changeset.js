var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays information about and lets you change the attributes, such as comments and check-in notes, that are associated with a changeset.Required PermissionsTo use the changeset command you must have the Read permission set to Allow for any files or folders in the changeset for which you wish to display full information. The only users who can modify the notes and comments that are associated with a changeset are the users who created the changeset or a user who has the Revise other user\'s changes global permission. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var changeset = function(options) {
  var params = [];

  if (options.comment) {
    params.push('/comment');
  }

  if (options.notes) {
    params.push('/notes');
  }

  if (options.latest) {
    params.push('/latest');
  }

  if (options.noprompt) {
    params.push('/noprompt');
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

  return tf('changeset', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = changeset;
