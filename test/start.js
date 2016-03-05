var assert = require('assert'),
    debug  = require('../lib/utils/debug'),
    tfs    = require('../lib/tfs');

/**
 * [describe description]
 *
 * @todo Test async status command
 *
 * @version 1.3.0
 */
describe('Start Tests Suite', function() {
  before(function() {
    console.log('\n    > Switching debugging environment mode ON\n');
    debug.toggle(true);
  });

  var commands = [
    'add',
    // 'branch',
    'branches',
    // 'changeset',
    'checkin',
    // 'checkout',
    // 'configure',
    'delete',
    // 'destroy',
    // 'diff',
    'dir',
    // 'folderdiff',
    'get',
    'history',
    // 'label',
    // 'labels',
    // 'localversions',
    'lock',
    // 'merge',
    // 'merges',
    // 'permission',
    'properties',
    // 'rename',
    'resolve',
    // 'rollback',
    // 'shelve',
    // 'shelvesets',
    // 'status',
    // 'undelete',
    'undo',
    // 'unlabel',
    'unshelve',
    'view',
    // 'workfold',
    // 'workspace',
    // 'workspaces'
  ];

  commands.forEach(function(command) {
    describe(command.toUpperCase(), function() {
      it('SHOULD use CWD when [items] is NOT specified', function () {
        assert.equal(command + ' "' + debug.cwd(true) + '"', tfs(command).command);
      });
      it('SHOULD use CWD when [items] is NULL and [options] is NULL', function () {
        assert.equal(command + ' "' + debug.cwd(true) + '"', tfs(command, null, null).command);
      });
      it('SHOULD use ONE ITEM when 1 [items] IS specified', function () {
        assert.equal(command + ' "' + debug.itemspec(true) + '"', tfs(command, [debug.itemspec()]).command);
      });
      it('SHOULD use TWO ITEMS when 2 [items] ARE specified', function () {
        assert.equal(command + ' "' + debug.itemspec(true) + '" "' + debug.itemspec(true) + '"', tfs(command, [debug.itemspec(true), debug.itemspec(true)]).command);
      });
    });
  });
});
