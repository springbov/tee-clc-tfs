var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Removes pending changes from a workspace.
 *
 * @param  {Array}  files   Files and/or folders to undo.
 * @param  {Object} options Undo options
 */
var undo = function(files, options) {
  var params = files;

  if (params.length === 0) {
    params.push(format.path(process.cwd()));
  }

  tf('undo', params, function() {
    output.info('File(s) succesfully undone');
  }, !!options.verbose);
};

module.exports = undo;
