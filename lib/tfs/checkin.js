var tf     = require('../utils/tf'),
    output = require('../utils/output');

/**
 * [function description]
 *
 * @param  {Array}  files   File or folder to check-in.
 * @param  {Object} options Checkin options
 */
var checkin = function(files, options) {
  var params = files;

  if (params.length === 0) {
    params.push(process.cwd().replace(' ', '^ '));
  }

  if (options.author) {
    params.push('/author:"' + options.author + '"');
  }

  if (options.bypass) {
    params.push('/bypass');
  }

  if (options.collection) {
    params.push('/collection:"' + options.collection + '"');
  }

  if (options.comment) {
    params.push('/comment:"' + options.comment.replace('"', '""') + '"');
  }

  if (options.noprompt) {
    params.push('/noprompt');
  }

  if (options.notes) {
    params.push('/notes:"' + options.notes.replace('"', '""') + '"');
  }

  if (options.override) {
    params.push('/override:"' + options.override.replace('"', '""') + '"');
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
