var chalk = require('chalk'),
    fs    = require('fs'),
    spawn = require('child_process').spawn;

function verbose(data) {
  process.stdout.write(chalk.gray(data.toString()));
}

function errorAndExit(error) {
  console.error('\n' + chalk.red('Error: ' + error.toString()) + '\n');
  process.exit();
}

// %ProgramFiles(x86)%
function tfsRun(tfsOptions, callback) {
  tfsOptions.forEach(function(option) {
    console.log(option, spawn);
  });

  try {
    var batch = spawn('dir');
  }
  catch (exception) {
    console.log(exception);
  }

  batch.stdout.on('data', verbose);
  batch.stderr.on('data', errorAndExit);
  batch.on('exit', callback);
}

/*tfsRun(['get'], function() {
  console.log(123);
});*/

function fileExists(filePath, isDirectory) {
  isDirectory = !!isDirectory;

  try {
    if (isDirectory) {
      if (fs.lstatSync(filePath).isDirectory()) {
        return true;
      }
    } else {
      if (fs.lstatSync(filePath).isFile()) {
        return true;
      }
    }

    return false;
  }
  catch (exception) {
    return false;
  }
}

function buildSettings() {
  var pfPath = process.env['ProgramFiles(x86)'];
  var tfPath = '/Common7/IDE/TF.exe';

  switch (true) {
    case fileExists(pfPath + '/Microsoft Visual Studio 14.0' + tfPath):
      var settings = {
        tfPath: pfPath + '/Microsoft Visual Studio 14.0' + tfPath,
        tfVersion: 14
      };
      break;

    case fileExists(pfPath + '/Microsoft Visual Studio 12.0' + tfPath):
      var settings = {
        tfPath: pfPath + '/Microsoft Visual Studio 12.0' + tfPath,
        tfVersion: 12
      };
      break;

    case fileExists(pfPath + '/Microsoft Visual Studio 10.0' + tfPath):
      var settings = {
        tfPath: pfPath + '/Microsoft Visual Studio 10.0' + tfPath,
        tfVersion: 10
      };
      break;

    default:
      errorAndExit('Impossible to find you TF.exe');
      break;
  }

  var fileSource = JSON.stringify(settings, null, 2);
  console.log(chalk.magenta('Writing config/settings.json'))
  fs.writeFileSync('config/settings.json', fileSource, 'utf8');
}

function checkSettingsAndStart() {
  if (!fileExists('config/settings.json')) {
    buildSettings();
  }
}

checkSettingsAndStart();
