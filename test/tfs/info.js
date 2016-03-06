var assert = require('assert'),
    debug  = require('../../lib/utils/debug'),
    tfs    = require('../../lib/tfs');

/**
 * @version 1.4.1
 */
describe('TFS Info Tests Suite', function() {
  var options = {
    b: [
      'recursive'
    ],
    s: [
      'collection',
      'login',
      'version',
      'workspace'
    ]
  };

  it('SHOULD works with BOOLEAN options', function () {
    var test = debug.getBooleanAssert(options);
    assert.equal('info ' + process.cwd() + ' ' + test.output, tfs('info', null, test.options));
  });

  it('SHOULD works with STRING options', function () {
    var test = debug.getStringAssert(options);
    assert.equal('info ' + process.cwd() + ' ' + test.output, tfs('info', null, test.options));
  });
});
