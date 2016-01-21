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
  if (files.length === 0) {
    files.push(format.path(process.cwd()));
  } else {
    var i = files.length;
    while (--i >= 0) {
      files[i] = '"' + files[i] + '"';
    }
  }

  var params = files;

  if (params.length === 0) {
    params.push(format.path(process.cwd()));
  }

  return tf('workspaces', params, null, !!options.verbose);
};

module.exports = workspaces;
