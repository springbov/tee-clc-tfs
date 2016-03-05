var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Makes the local file writable, and changes its Pending Change status
 * to \"edit\" in the workspace. Edit is an alias for the Checkout command.
 *
 * <h5>Note</h5>
 * Any edits that you make to items that have been checked out
 * are not reflected in the server for Team Foundation version control
 * until you perform a check-in operation.
 *
 * <h5>Required Permissions</h5>
 * To use the checkout command, your Check out permission must be set to Allow,
 * and you must be either the workspace owner or your global Administer
 * workspaces permission must be set to Allow.
 * Also, if you use the /lock option with a value other than none,
 * your Lock permission must be set to Allow.
 *
 * @summary  Makes the local file writable, and changes its status to "edit".
 * @see      https://msdn.microsoft.com/en-us/library/1yft8zkw.aspx
 * @module   TFS Checkout
 * @version  1.3.2
 *
 * @param  {Array}    itemspec File(s) and folder(s) to get latest version of.
                               If null/undefined, equals CWD.
 * @param  {Object}   options  Checkout command options
 * @param  {Function} callback Function to call back once executed
 */
var checkout = function(itemspec, options, callback) {
  var params = format.items(itemspec, true);
  params = params.concat(format.options(options));

  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: TF.exe CHECKOUT ' + params.join(' '));
  }

  tf('checkout', params, callback, !!options.verbose);
};

module.exports = checkout;
