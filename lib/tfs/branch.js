var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * The branch command copies an item or set of items, including metadata and version control history, from one location to another in the Team Foundation version control server and in the local workspace.NoteThe results of this command are not reflected in the Team Foundation version control server until you perform a check-in operation. For more information, see Check In Pending Changes.Required PermissionsTo use the branch command, you must have the Read permission for the source item and the Check out and Merge permissions for the target folder set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var branch = function(olditem, newitem, options) {
  var params = olditem;
  params.concat(newitem);

  if (options.version) {
    params.push('/version');
  }

  if (options.lock) {
    params.push('/lock');
  }

  if (options.noget) {
    params.push('/noget');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.silent) {
    params.push('/silent');
  }

  if (options.checkin) {
    params.push('/checkin');
  }

  if (options.comment) {
    params.push('/comment');
  }

  if (options.author) {
    params.push('/author');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('branch', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = branch;
