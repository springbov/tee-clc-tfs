var assert = require('assert'),
    debug  = require('../lib/utils/debug'),
    tfs    = require('../lib/tfs');

function path(path) {
  return path.substr(3).replace(/\\/g, '/');
}

function cwd() {
  return path(process.cwd());
}

function itemsFile() {
  return cwd() + '/..';
}

describe('TFS Tests Suite', function() {

  before(function() {
    console.log('\n    > Switching debugging environment mode ON\n');
    debug(true);
  });

  after(function() {
    console.log('\n    > Switching debugging environment mode OFF');
    debug(false);
  });

  var commands = [
    'checkin',
    'get',
    'undo'
  ];

  commands.forEach(function(command) {
    describe(command.toUpperCase(), function() {
      it('SHOULD use CWD when [item] is NOT specified', function () {
        assert.equal('get "' + cwd() + '"', tfs('get'));
      });
      it('SHOULD use ONE ITEM when 1 [items] IS specified', function () {
        assert.equal('get "' + itemsFile() + '"', tfs('get', itemsFile()));
      });
      it('SHOULD use TWO ITEMS when 2 [items] ARE specified', function () {
        assert.equal('get "' + itemsFile() + '" "' + itemsFile() + '"', tfs('get', itemsFile() + ' ' + itemsFile()));
      });
    });
  });
});
