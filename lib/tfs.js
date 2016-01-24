var fileExists = require('./utils/fileExists'),
    output     = require('./utils/output');

/**
 * TFS general module to be used by other NodeJS projetcs.
 *
 * It will only execute commands as there are described in the README.
 *
 * @example
 * To execute recursively get latest files within D:\MyBranch\MyProject,
 * admitting that this project is source-versionned via TFS,
 * write the following code :
 *
 *   var tfs = require('tfs');
 *   tfs('get', 'D:\MyBranch\MyProject', {
 *     recursive: true
 *   })
 *
 * @version 1.2.7
 *
 * @param  {String} command TFS command to execute
 * @param  {String} items   File(s) (seprated by spaces) or changeset number.
 *                          Can be null/undefined to use the current path.
 * @param  {Object} options TFS command options. Can be null/undefined.
 */
var tfs = function(command, items, options) {
  if (!command) {
    return output.responseError('"command" parameter is MANDATORY.');
  }

  if (typeof command !== 'string') {
    return output.responseError('"command" parameter MUST be a string.');
  }

  if (items && typeof items !== 'string') {
    return output.responseError('"items" parameter MUST be a string.');
  }

  if (options && typeof options !== 'object') {
    return output.responseError('"options" parameter MUST be an object.');
  }

  items = items ? items.split(' ') : [];
  options = options ? options : {};

  var tfsCommandModule = __dirname + '/tfs/' + command + '.js';

  if (!fileExists(tfsCommandModule)) {
    output.responseError(tfsCommandModule + '"' + command + '" does not exist (yet).');
    return false;
  }

  return require('./tfs/' + command)(items, options, true);
};

module.exports = tfs;
