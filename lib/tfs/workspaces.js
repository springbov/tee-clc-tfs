var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays information about workspaces in the system
 * and updates cached information about a user name
 * or computer name change on the server that is running
 * Visual Studio Team Foundation Server.
 *
 * @param  {Array}  files   Files and/or folders to undo.
 * @param  {Object} options Undo options
 */
var workspaces = function(files, options) {
  var params = files;

  if (params.length === 0) {
    params.push(format.path(process.cwd()));
  }

  tf('workspaces', params, null, !!options.verbose);
};

module.exports = workspaces;
