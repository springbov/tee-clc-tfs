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

function getBooleanAssert(options) {
  var bOptions = {},
      output = '/' + options.b.join(' /');

  options.b.forEach(function(option) {
    bOptions[option] = true;
  });

  return {
    options: bOptions,
    output:  output
  };
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
      it('SHOULD use CWD when [items] is NOT specified', function () {
        assert.equal(command + ' "' + cwd() + '"', tfs(command));
      });
      it('SHOULD use CWD when [items] is NULL and [options] is NULL', function () {
        assert.equal(command + ' "' + cwd() + '"', tfs(command, null, null));
      });
      it('SHOULD use ONE ITEM when 1 [items] IS specified', function () {
        assert.equal(command + ' "' + itemsFile() + '"', tfs(command, itemsFile()));
      });
      it('SHOULD use TWO ITEMS when 2 [items] ARE specified', function () {
        assert.equal(command + ' "' + itemsFile() + '" "' + itemsFile() + '"', tfs(command, itemsFile() + ' ' + itemsFile()));
      });
    });
  });

  describe('CHECKIN (options)', function() {
    var options = {
      b: [
        'bypass',
        'noprompt',
        'recursive',
        'validate'
      ]
    };

    it('SHOULD works with BOOLEAN options', function () {
      var test = getBooleanAssert(options);
      assert.equal('checkin "' + cwd() + '" ' + test.output, tfs('checkin', null, test.options));
    });
  });

  describe('GET (options)', function() {
    var options = {
      b: [
        'recursive'
      ]
    };

    it('SHOULD works with BOOLEAN options', function () {
      var test = getBooleanAssert(options);
      assert.equal('get "' + cwd() + '" ' + test.output, tfs('get', null, test.options));
    });
  });
});
