'use strict';

/**
* Formatting functions
 *
 * @todo Comment format.js functions
 *
 * @type {Object}
 */
var format = {
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

  text: function(text) {
    return '"' + text.replace(/"/g, '""') + '"';
  },
};

module.exports = format;
