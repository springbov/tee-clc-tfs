var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Makes the local file writable, and changes its Pending Change status to \"edit\" in the workspace. Edit is an alias for the Checkout command. For more information, see Pending Changes.Note   Any edits that you make to items that have been checked out are not reflected in the server for Team Foundation version control until you perform a check-in operation. For more information, see Check In Pending Changes.Required PermissionsTo use the checkout command, your Check out permission must be set to Allow, and you must be either the workspace owner or your global Administer workspaces permission must be set to Allow. Also, if you use the /lock option with a value other than none, your Lock permission must be set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var checkout = function(options) {
  var params = [];

  if (options.type) {
    params.push('/type');
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.lock) {
    params.push('/lock');
  }

  if (options.login) {
    params.push('/login');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tf('checkout', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = checkout;
