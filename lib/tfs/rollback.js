var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * You can use this command to roll back the effects of one or more changesets to one or more version-controlled items. This command does not remove the changesets from an item\'s version history. Instead, this command creates in your workspace a set of pending changes that negate the effects of the changesets that you specify.Required PermissionsTo use this command, you must have the Read, Check Out, and Check In permissions set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var rollback = function(ItemSpec, options) {
  var params = ItemSpec;

  if (options.changeset) {
    params.push('/changeset');
  }

  if (options.keepmergehistory) {
    params.push('/keepmergehistory');
  }

  if (options.lock) {
    params.push('/lock');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.toversion) {
    params.push('/toversion');
  }

  if (options.version) {
    params.push('/version');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('rollback', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = rollback;
