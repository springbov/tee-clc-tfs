var format = require('../utils/format'),
    output = require('../utils/output'),
    tfSync     = require('../utils/tfSync');

/**
 * The view command retrieves a specific version of a file to a temporary folder on your computer and displays it.Required PermissionsTo use the view command, you must have the Read permission set to Allow. For more information, see Team Foundation Server Permissions.
 *
 * @param  {Array}  itemspec File(s) or folder(s) to retrieve.
                             If null/undefined, equals CWD.
 * @param  {Object} options  Command options
 */
var view = function(itemspec, options) {
  var params = format.items(itemspec);
  params = params.concat(format.options(options));

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  return tfSync('view', params, function() {
    output.success('Done, without errors.');
  }, !!options.verbose);
};

module.exports = view;
