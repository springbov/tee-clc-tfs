module.exports = function(grunt) {
  var commands = [
    { command: 'add', url: 'https://msdn.microsoft.com/en-us/library/f9yw4ea0(v=vs.100).aspx' },
    { command: 'branch', url: 'https://msdn.microsoft.com/en-us/library/d73s8b27(v=vs.100).aspx' },
    { command: 'branches', url: 'https://msdn.microsoft.com/en-us/library/dcbx5yce(v=vs.100).aspx' },
    { command: 'changeset', url: 'https://msdn.microsoft.com/en-us/library/w51xa47k(v=vs.100).aspx' },
    { command: 'checkin', url: 'https://msdn.microsoft.com/en-us/library/c327ca1z(v=vs.100).aspx' },
    { command: 'checkout', url: 'https://msdn.microsoft.com/en-us/library/1yft8zkw(v=vs.100).aspx' },
    { command: 'configure', url: 'https://msdn.microsoft.com/en-us/library/teza2a8f(v=vs.100).aspx' },
    { command: 'delete', url: 'https://msdn.microsoft.com/en-us/library/k45zb450(v=vs.100).aspx' },
    { command: 'destroy', url: 'https://msdn.microsoft.com/en-us/library/bb386005(v=vs.100).aspx' },
    { command: 'difference', url: 'https://msdn.microsoft.com/en-us/library/6fd7dc73(v=vs.100).aspx' },
    { command: 'dir', url: 'https://msdn.microsoft.com/en-us/library/6320xzye(v=vs.100).aspx' },
    { command: 'folderdiff', url: 'https://msdn.microsoft.com/en-us/library/bb385992(v=vs.100).aspx' },
    { command: 'get', url: 'https://msdn.microsoft.com/en-us/library/fx7sdeyf(v=vs.100).aspx' },
    { command: 'help', url: 'https://msdn.microsoft.com/en-us/library/dhaa6tz1(v=vs.100).aspx' },
    { command: 'history', url: 'https://msdn.microsoft.com/en-us/library/yxtbh4yh(v=vs.100).aspx' },
    { command: 'label', url: 'https://msdn.microsoft.com/en-us/library/9ew32kd1(v=vs.100).aspx' },
    { command: 'labels', url: 'https://msdn.microsoft.com/en-us/library/t21wc9ca(v=vs.100).aspx' },
    { command: 'localversions', url: 'https://msdn.microsoft.com/en-us/library/ee791979(v=vs.100).aspx' },
    { command: 'lock', url: 'https://msdn.microsoft.com/en-us/library/47b0c7w9(v=vs.100).aspx' },
    { command: 'merge', url: 'https://msdn.microsoft.com/en-us/library/bd6dxhfy(v=vs.100).aspx' },
    { command: 'merges', url: 'https://msdn.microsoft.com/en-us/library/656cs2x5(v=vs.100).aspx' },
    { command: 'permission', url: 'https://msdn.microsoft.com/en-us/library/0dsd05ft(v=vs.100).aspx' },
    { command: 'properties', url: 'https://msdn.microsoft.com/en-us/library/tzy14b58(v=vs.100).aspx' },
    { command: 'rename', url: 'https://msdn.microsoft.com/en-us/library/a79bz90w(v=vs.100).aspx' },
    { command: 'resolve', url: 'https://msdn.microsoft.com/en-us/library/6yw3tcdy(v=vs.100).aspx' },
    { command: 'rollback', url: 'https://msdn.microsoft.com/en-us/library/dd380776(v=vs.100).aspx' },
    { command: 'shelve', url: 'https://msdn.microsoft.com/en-us/library/w6y8ezzs(v=vs.100).aspx' },
    { command: 'shelvesets', url: 'https://msdn.microsoft.com/en-us/library/ms181451(v=vs.100).aspx' },
    { command: 'status', url: 'https://msdn.microsoft.com/en-us/library/9s5ae285(v=vs.100).aspx' },
    { command: 'undelete', url: 'https://msdn.microsoft.com/en-us/library/y7505w2x(v=vs.100).aspx' },
    { command: 'undo', url: 'https://msdn.microsoft.com/en-us/library/c72skhw4(v=vs.100).aspx' },
    { command: 'unlabel', url: 'https://msdn.microsoft.com/en-us/library/ec67t69e(v=vs.100).aspx' },
    { command: 'unshelve', url: 'https://msdn.microsoft.com/en-us/library/s6bx4df3(v=vs.100).aspx' },
    { command: 'view', url: 'https://msdn.microsoft.com/en-us/library/5dxk6367(v=vs.100).aspx' },
    { command: 'workfold', url: 'https://msdn.microsoft.com/en-us/library/0fa04bx6(v=vs.100).aspx' },
    { command: 'workspace', url: 'https://msdn.microsoft.com/en-us/library/y901w7se(v=vs.100).aspx' },
    { command: 'workspaces', url: 'https://msdn.microsoft.com/en-us/library/54dkh0y3(v=vs.100).aspx' }
  ];

  grunt.registerTask('default', '', function() {
    var fs = require('fs');
    var request = require('request');

    commands.forEach(function(command) {
      console.log(command.url);
      request(command.url).pipe(fs.createWriteStream('./commands/' + command.command + '.html'));
    });

    setTimeout(function() {
      done();
    }, commands.length * 10000);
  });
};
