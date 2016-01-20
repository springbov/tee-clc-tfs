var BASE_PATH,
    chalk      = require('chalk'),
    output     = require('./utils/output'),
    fileExists = require('./utils/fileExists'),
    fs         = require('fs');

module.exports = function(basePath) {
  BASE_PATH = basePath;
  return setup;
};

/**
 * Get TFS settings (after starting setting up if they don't exist yet)
 *
 * @return {object} Settings
 */
function setup() {
  if (!fileExists(BASE_PATH + '/config/settings.json')) {
    buildSettings();
  }

  var settings = fs.readFileSync(BASE_PATH + '/config/settings.json', 'utf8');
  return JSON.parse(settings);
}

/**
 * Look for TFS command line tool and create settings file
 */
function buildSettings() {
  var pf64Path = process.env['ProgramFiles'];
  var pf32Path = process.env['ProgramFiles(x86)'];
  var tfPath = '/Common7/IDE/TF.exe';

  switch (true) {
    case fileExists(pf64Path + '/Microsoft Visual Studio 14.0' + tfPath):
      var settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 14.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2015
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 14.0' + tfPath):
      var settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 14.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2015
      };
      break;

    case fileExists(pf64Path + '/Microsoft Visual Studio 12.0' + tfPath):
      var settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 12.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2013
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 12.0' + tfPath):
      var settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 12.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2013
      };
      break;

    case fileExists(pf64Path + '/Microsoft Visual Studio 11.0' + tfPath):
      var settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 11.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2012
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 11.0' + tfPath):
      var settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 11.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2012
      };
      break;

    case fileExists(pf64Path + '/Microsoft Visual Studio 10.0' + tfPath):
      var settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 10.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2010
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 10.0' + tfPath):
      var settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 10.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2010
      };
      break;

    case fileExists(pf64Path + '/Microsoft Visual Studio 9.0' + tfPath):
      var settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 9.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2008
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 9.0' + tfPath):
      var settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 9.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2008
      };
      break;

    default:
      output.error('Impossible to find you TF.exe');
      break;
  }

  output.info('Writing ' + BASE_PATH + '/config/settings.json');

  var fileSource = JSON.stringify(settings, null, 2);
  fs.writeFileSync(BASE_PATH + '/config/settings.json', fileSource, 'utf8');
}
