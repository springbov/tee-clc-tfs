var fileExists = require('./utils/fileExists'),
    output     = require('./utils/output');

/**
 * TFS general module to be used by other NodeJS projetcs.
 *
 * It will only execute commands as there are described in the README.
 *
 * @version 1.3.0
 *
 * @param  {String}   command  TFS command to execute
 * @param  {Array}    items    Files (seprated by spaces) or changeset number.
 *                             Can be null/undefined to use the current path.
 * @param  {Object}   callback TFS command options. Can be null/undefined.
 * @param  {Function} callback Function to call back once executed
 *
 * @return {Object} Response: { message: [String], isError: [Boolean] }
 */
var tfs = function(command, items, options, callback) {
  if (!command) {
    return output.responseError('"command" parameter is MANDATORY.');
  }

  if (typeof command !== 'string') {
    return output.responseError('"command" parameter MUST be a string.');
  }

  if (items && items.constructor !== Array) {
    return output.responseError('"items" parameter MUST be an array.');
  }

  if (options && typeof options !== 'object') {
    return output.responseError('"options" parameter MUST be an object.');
  }

  items = items ? items : [];
  options = options ? options : {};

  var tfsCommandModule = __dirname + '/tfs/' + command + '.js';

  if (!fileExists(tfsCommandModule)) {
    output.responseError(tfsCommandModule + '" does not exist.');
    return false;
  }

  return require('./tfs/' + command)(items, options, true, callback);
};

module.exports = tfs;
