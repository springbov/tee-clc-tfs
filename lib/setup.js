var output       = require('./utils/output'),
    fileExists   = require('./utils/fileExists'),
    fs           = require('fs'),
    settingsPath = __dirname + '/../config/settings.json';

module.exports = setup;

/**
 * Get TFS settings (after starting setting up if they don't exist yet)
 *
 * @version 1.3.0
 *
 * @return {object} Settings
 */
function setup() {
  if (!fileExists(settingsPath)) {
    buildSettings();
  }

  var settings = fs.readFileSync(settingsPath, 'utf8');
  settings = JSON.parse(settings);

  if (!settings.tfPath || !settings.vsArchitecture || !settings.vsVersion) {
    buildSettings();
  }

  // Rebuild settings if TF.exe has been uninstalled/updated
  if (!fileExists(settings.tfPath)) {
    buildSettings();
  }

  return settings;
}

/**
 * Look for TFS command line tool and create settings file
 */
function buildSettings() {
  var pf32Path = process.env['ProgramFiles(x86)'],
      pf64Path = process.env.ProgramFiles,
      settings,
      tfPath = '/Common7/IDE/TF.exe';

  switch (true) {
    case fileExists(pf64Path + '/Microsoft Visual Studio 14.0' + tfPath):
      settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 14.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2015
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 14.0' + tfPath):
      settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 14.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2015
      };
      break;

    case fileExists(pf64Path + '/Microsoft Visual Studio 12.0' + tfPath):
      settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 12.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2013
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 12.0' + tfPath):
      settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 12.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2013
      };
      break;

    case fileExists(pf64Path + '/Microsoft Visual Studio 11.0' + tfPath):
      settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 11.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2012
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 11.0' + tfPath):
      settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 11.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2012
      };
      break;

    case fileExists(pf64Path + '/Microsoft Visual Studio 10.0' + tfPath):
      settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 10.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2010
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 10.0' + tfPath):
      settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 10.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2010
      };
      break;

    case fileExists(pf64Path + '/Microsoft Visual Studio 9.0' + tfPath):
      settings = {
        tfPath: pf64Path + '/Microsoft Visual Studio 9.0' + tfPath,
        vsArchitecture: 64,
        vsVersion: 2008
      };
      break;

    case fileExists(pf32Path + '/Microsoft Visual Studio 9.0' + tfPath):
      settings = {
        tfPath: pf32Path + '/Microsoft Visual Studio 9.0' + tfPath,
        vsArchitecture: 32,
        vsVersion: 2008
      };
      break;

    case fileExists(__dirname + '/../test/.mock'):
      settings = {};
      break;

    default:
      output.error('Impossible to find you TF.exe');
      break;
  }

  output.info('Writing ' + settingsPath);

  var fileSource = JSON.stringify(settings, null, 2);
  fs.writeFileSync(settingsPath, fileSource, 'utf8');
}
