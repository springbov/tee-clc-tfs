'use strict';

/**
 * [format description]
 *
 * @version 1.2.3
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

  options: function(options) {
    let params = [];

    for (let option in options) {
      if (options[option] && option !== 'verbose') {
        let param = '/' + option;

        if (typeof options[option] === 'string') {
          param = param + ':' + options[option];
        }

        params.push(param);
      }
    }

    return params;
  },

  path: function(path) {
    return '"' + path.substr(3).replace(/\\/g, '/') + '"';
  },

  text: function(text) {
    return '"' + text.replace(/"/g, '""') + '"';
  },
};

module.exports = format;
