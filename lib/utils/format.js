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
  /**
   * [function description]
   *
   * @module  Utilities Format
   * @version 1.3.0
   *
   * @param  {Array}   itemspec Itemspec paths
   * @param  {Boolean} noFormat Do not format paths (usefull when using spawn)
   * @return {Array}            Formatted files/directories paths.
   *                            CWD if itemspec is an empty aray
   */
  items: function(itemspec, noFormat) {
    noFormat = !!noFormat;

    var path;

    if (!itemspec.length) {
      path = noFormat ? process.cwd() : format.path(process.cwd());
      itemspec.push(path);
    } else {
      var i = itemspec.length;
      while (--i >= 0) {
        path = noFormat ? itemspec[i] : format.path(itemspec[i]);
        itemspec[i] = path;
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

        if (typeof options[option] === 'number') {
          param = param + ':' + options[option];
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
