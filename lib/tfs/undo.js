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

  return tf('undo', params, function() {
    output.info('File(s) succesfully undone');
  }, !!options.verbose);
};

module.exports = undo;
