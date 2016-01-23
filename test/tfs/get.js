var assert = require('assert'),
    debug  = require('../../lib/utils/debug'),
    tfs    = require('../../lib/tfs');

describe('GET Tests Suite', function() {
  var options = {
    b: [
      'all',
      'overwrite',
      'force',
      'preview',
      'recursive',
      'noprompt',
      'remap'
    ],
    s: [
      'login',
      'version'
    ]
  };

  it('SHOULD works with BOOLEAN options', function () {
    var test = debug.getBooleanAssert(options);
    assert.equal('get "' + debug.cwd(true) + '" ' + test.output, tfs('get', null, test.options));
  });

  it('SHOULD works with STRING options', function () {
    var test = debug.getStringAssert(options);
    assert.equal('get "' + debug.cwd(true) + '" ' + test.output, tfs('get', null, test.options));
  });
});
