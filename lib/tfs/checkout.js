var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Makes the local file writable, and changes its Pending Change status to \"edit\" in the workspace. Edit is an alias for the Checkout command. For more information, see Pending Changes.Note   Any edits that you make to items that have been checked out are not reflected in the server for Team Foundation version control until you perform a check-in operation. For more information, see Check In Pending Changes.Required PermissionsTo use the checkout command, your Check out permission must be set to Allow, and you must be either the workspace owner or your global Administer workspaces permission must be set to Allow. Also, if you use the /lock option with a value other than none, your Lock permission must be set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @summary  ...
 * @see      ...
 * @module   TFS Chekout
 * @version  1.2.7
 *
 * @param  {Array}   itemspec File(s) and folder(s) to get latest version of.
                              If null/undefined, equals CWD.
 * @param  {Object}  options  Checkout command options
 * @param  {Boolean} viaApi   Is this function called via tfs API ?
 */
var checkout = function(itemspec, options, viaApi) {
  try {
    var params = format.items(itemspec);
  }
  catch (exception) {
    return output.responseError(exception, true);
  }

  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: TF.exe CHECKOUT ' + params.join(' '));
  }

  if (!viaApi) {
    var callback = function(response) {
      if (response.isError) {
        output.error('Aborted due to errors.');
      } else {
        output.success('Done.');
      }
    };
  }

  return tf('checkout', params, callback, !!options.verbose);
};

module.exports = checkout;
