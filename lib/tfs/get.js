var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Retrieves a read-only copy of a file from the server
 * for Team Foundation version control to the workspace
 * and creates folders on disk to contain it.
 *
 * @param  {Array}  files   Files and/or folders to get.
 * @param  {Object} options Get options
 */
var get = function(files, options) {
  var params = files;

  if (params.length === 0) {
    params.push(format.path(process.cwd()));
  }

  // if (options.login) {
  //   params.push('/login:' + format.text(options.login));
  // }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.verbose) {
    output.verbose('Command: get ' + params.join(' '));
  }

  tf('get', params, function() {
    output.info('File(s) succesfully got');
  }, !!options.verbose);
};

module.exports = get;
