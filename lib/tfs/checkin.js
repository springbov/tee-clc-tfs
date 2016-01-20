var format = require('../utils/format')
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * [function description]
 *
 * @param  {Array}  files   File or folder to check-in.
 * @param  {Object} options Checkin options
 */
var checkin = function(files, options) {
  var params = files;

  if (params.length === 0) {
    params.push(format.path(process.cwd().substr(3)));
  }

  if (options.author) {
    params.push('/author:' + format.text(options.author));
  }

  if (options.bypass) {
    params.push('/bypass');
  }

  if (options.collection) {
    params.push('/collection:' + format.text(options.collection));
  }

  if (options.comment) {
    params.push('/comment:' + format.text(options.comment));
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.notes) {
    params.push('/notes:' + format.text(options.notes));
  }

  if (options.override) {
    params.push('/override:' + format.text(options.override));
  }

  if (options.recursive) {
    params.push('/recursive');
  }

  if (options.validate) {
    params.push('/validate');
  }

  if (options.verbose) {
    output.verbose('Command: checkin ' + params.join(' '));
  }

  tf('checkin', params, function() {
    output.info("File(s) succesfully checkined");
  });
}

module.exports = checkin;
