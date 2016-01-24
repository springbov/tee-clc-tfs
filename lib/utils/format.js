'use strict';

var fileExists = require('./fileExists');


/**
* Formatting functions
 *
 * @todo Comment format.js functions
 *
 * @type {Object}
 */
var format = {
  items: function(itemspec) {
    if (!itemspec.length) {
      itemspec.push(format.path(process.cwd()));
    } else {
      var i = itemspec.length;
      while (--i >= 0) {
        itemspec[i] = format.path(itemspec[i]);
      }
    }

    return itemspec;
  },

  /**
   * Convert Unix-style command options (-o, --option)
   * into Windows one (/option). Adapted for TF.exe.
   *
   * @see     https://msdn.microsoft.com/en-us/library/z51z7zy0.aspx
   * @module  Utilities Format
   * @version 1.2.7
   *
   * @param  {Object} options Unix-style options: { options: true|[String] }
   * @return {Array}          Windows-style options
   */
  options: function(options) {
    let params = [];

    for (let option in options) {
      if (options[option] && option !== 'verbose') {
        let param = '/' + option;

        if (typeof options[option] === 'string') {
          param = param + ':"' + options[option] + '"';
        }

        params.push(param);
      }
    }

    return params;
  },

  path: function(path) {
    if (path[0] !== '$') {
      if (path[1] !== ':' && path[0] !== '/') {
        if (path.substr(0, 2) === '.\\' || path.substr(0, 2) === './') {
          path = path.substr(2);
        }

        if (!fileExists(process.cwd() + '/' + path)) {
          throw 'The file/directory « ' + process.cwd() + '/' + path + ' » does not exist.';
        }

        path = process.cwd() + '/' + path;
      }
    }

    return '"' + path.replace(/\\/g, '/') + '"';
  },

  text: function(text) {
    return '"' + text.replace(/"/g, '""') + '"';
  },
};

module.exports = format;
