var chalk  = require('chalk'),
    fs     = require('fs'),
    output = require('./lib/utils/output'),
    SETTINGS,
    setup  = require('./lib/setup')(__dirname),
    spawn  = require('child_process').spawn;

function verbose(data) {
  process.stdout.write(chalk.gray(data.toString()));
}

function tfsRun(tfsOptions, callback) {
  var spawn = require('child_process').spawn,
      batch = spawn(SETTINGS.tfPath, tfsOptions);

  batch.stdout.on('data', output.log);
  batch.stderr.on('data', output.error);

  if (callback) {
    batch.on('exit', callback);
  }
}


function setupAndStart() {
  SETTINGS = setup();

  tfsRun(['get', '/recursive'], function() {
    console.log(123);
  });
}

setupAndStart();
