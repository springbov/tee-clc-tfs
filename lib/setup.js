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
  let build = () =>
  {
    if (!checkOnPathVar)
    {
      buildSettings()
    }
  }
  if (!fileExists(settingsPath)) {
    build();
  }

  var settings = fs.readFileSync(settingsPath, 'utf8');
  settings = JSON.parse(settings);

  if ( !settings.onPath && (!settings.tfPath || !settings.vsArchitecture || !settings.vsVersion))
  {
    build();
  }

  // Rebuild settings if TF.exe has been uninstalled/updated
  if (!settings.onPath && !fileExists(settings.tfPath)) {
    build();
  }

  return settings;
}

/**
 * checks for any tfs tool on path
 */
function checkOnPathVar()
{
  let success = true;
  try {
    const myCommand = require('child_process').execSync("tf").toString();
   	const dex = myStr.search("\n") || 0;
    myCommand.substr(0, dex) 
    const fileSource = JSON.stringify({onPath: true, tfPath: "tf"}, null, 2);
    fs.writeFileSync(settingsPath, fileSource, 'utf8');
  } catch (err) {
    output.error("no tfs tool on path");
    success = false;
  }
  return success;
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
