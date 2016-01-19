var chalk = require('chalk'),
    fs    = require('fs'),
    setup = require('lib/setup')(__dirname),
    spawn = require('child_process').spawn;

function verbose(data) {
  process.stdout.write(chalk.gray(data.toString()));
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

function checkSettingsAndStart() {
  if (!fileExists('config/settings.json')) {
    buildSettings();
  }
}

checkSettingsAndStart();
