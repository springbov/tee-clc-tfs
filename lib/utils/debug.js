var fileExists   = require('./fileExists'),
    fs           = require('fs'),
    SETTINGS     = {},
    settingsFile = __dirname + '/../../config/settings.json';

/**
 * [debug description]
 *
 * @todo Comment debug.js
 *
 * @version 1.2.7
 *
 * @type {Object}
 */
var debug = {
  cwd: function(formatted) {
    return formatted ? debug.path(process.cwd()) : process.cwd();
  },

  getBooleanAssert: function(options) {
    var bOptions = {},
    output = '/' + options.b.join(' /');

    options.b.forEach(function(option) {
      bOptions[option] = true;
    });

    return {
      options: bOptions,
      output:  output
    };
  },

  getStringAssert: function(options) {
    var sOptions = {},
    output = '/' + options.s.join(':"aString" /') + ':"aString"';

    options.s.forEach(function(option) {
      sOptions[option] = 'aString';
    });

    return {
      options: sOptions,
      output:  output
    };
  },

  is: function() {
    SETTINGS = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
    return !!SETTINGS.debug;
  },

  itemspec: function(formatted, isDirectory) {
    var itemspec = debug.cwd(formatted) + '/test';

    if (!isDirectory) {
      return itemspec + '/.mock';
    }

    return itemspec;
  },

  path: function(path) {
    return path.replace(/\\/g, '/');
  },

  /**
   * Toggle debugging environment mode
   *
   * @param  {Boolean} state
   */
  toggle: function(state) {
    // Switch debug environment to true
    if (fileExists(settingsFile)) {
      SETTINGS = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
    }

    SETTINGS.debug = state;

    var fileSource = JSON.stringify(SETTINGS, null, 2);
    fs.writeFileSync(settingsFile, fileSource, 'utf8');
  }
};

module.exports = debug;
