'use strict';

var fileExists = require('./fileExists');

/**
 * Formatting functions
 *
 * @type {Object}
 */
var format = {
  /**
   * Convert a "natural" string into a camel-case one.
   *
   * @todo Missing camelization of initials
   *
   * @module  Utilities Format
   * @version 1.4.1
   *
   * @param  {String} string A natural string
   * @return {String}        A camel-case string
   */
  camelize: function(string) {
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return !index ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  },

  /**
   * Convert Unix-style command options (-o, --option)
   * into Windows one (/option). Adapted for TF.exe.
   *
   * @todo Missing test
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
  }
};

module.exports = format;
