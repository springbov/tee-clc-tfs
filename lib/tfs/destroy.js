var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Use the tf destroy command to destroy, or permanently delete, version-controlled files from Team Foundation version control. The destroy action cannot be reversed. You must not destroy files that are still needed. Sometimes you have to clean up version control systems. For example, if some files are infected with a computer virus, you have to remove them permanently from version control.Before you run tf destroy without the /keephistory option, we recommend that you first delete the files you want to destroy. For more information, see Delete Files and Folders from Version Control.After you delete the files you can synchronize the Team Foundation warehouse. Otherwise, the warehouse will not be synchronized with the destroyed items.Required PermissionsTo use the destroy command, you must belong to the Team Foundation Administrators security group. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var destroy = function(options) {
  var params = [];

  if (options.keephistory) {
    params.push('/keephistory');
  }

  if (options.stopat) {
    params.push('/stopat');
  }

  if (options.preview) {
    params.push('/preview');
  }

  if (options.startcleanup) {
    params.push('/startcleanup');
  }

  if (options.noprompt/i) {
    params.push('/noprompt/i');
  }

  if (options.silent) {
    params.push('/silent');
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

  return tf('destroy', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = destroy;
