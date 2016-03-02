var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * The rename command changes the name or the path of a file or folder. You can use the rename command or the aliases move or ren, to move a file or folder to a new location.Note   The results of this command are not reflected in the Team Foundation version control server until you perform a check-in operation. For more information, see Check In Pending Changes.Required PermissionsTo use the rename command, you have the Check out permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var rename = function(olditem, newitem, options) {
  var params = olditem;
  params.concat(newitem);

  if (options.lock) {
    params.push('/lock');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('rename', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = rename;
