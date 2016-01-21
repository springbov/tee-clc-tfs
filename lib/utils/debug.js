var fileExists   = require('./fileExists'),
    fs           = require('fs'),
    SETTINGS     = {},
    settingsFile = __dirname + '/../../config/settings.json';

/**
 * Toggle debugging environment mode
 *
 * @param  {Boolean} state
 */
var debug = function(state) {
  // Switch debug environment to true
  if (fileExists(settingsFile)) {
    SETTINGS = JSON.parse(fs.readFileSync(settingsFile, 'utf8'));
  }

  SETTINGS.debug = state;

  var fileSource = JSON.stringify(SETTINGS, null, 2);
  fs.writeFileSync(settingsFile, fileSource, 'utf8');
};

module.exports = debug;
