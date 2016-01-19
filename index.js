var spawn = require('child_process').spawn;

function errorAndExit(error) {
  console.error('\n' + chalk.red('Error: ' + error) + '\n');
  process.exit();
}

function tfsRun(tfsOptions, callback) {
  var batch = spawn('TF', tfsOptions);

  batch.stdout.on('data', function (data) {
    process.stdout.write(data.toString());
  });

  batch.stderr.on('data', function (error) {
    errorAndExit(error.toString());
  });

  batch.on('exit', callback());
}

tfsRun(['get'], function() {
  console.log(123);
});
