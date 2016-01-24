'use strict';

var fileExists = require('./fileExists');


/**
 * [format description]
 *
 * @todo Comment format.js
 *
 * @version 1.2.7
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
    if (path[0] !== '$') {
      if (path[1] === ':') {
        path = path.substr(3);
      } else if (path[0] !== '/') {
        if (path.substr(0, 2) === '.\\' || path.substr(0, 2) === './') {
          path = path.substr(2);
        }

        if (!fileExists(process.cwd() + '/' + path)) {
          throw 'The file/directory « ' + process.cwd() + '/' + path + ' » does not exist.';
        }

        path = process.cwd().substr(3) + '/' + path;
      }
    }

    return '"' + path.replace(/\\/g, '/') + '"';
  },

  text: function(text) {
    return '"' + text.replace(/"/g, '""') + '"';
  },
};

module.exports = format;
