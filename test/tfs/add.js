var assert = require('assert'),
    debug  = require('../../lib/utils/debug'),
    tfs    = require('../../lib/tfs');

/**
 * @version 1.4.1
 */
describe('TFS Add Tests Suite', function() {
  var options = {
    b: [
      'noignore',
      'noprompt',
      'recursive'
    ],
    s: [
      // 'encoding',
      'lock',
      'login'
    ]
  };

  it('SHOULD works with BOOLEAN options', function () {
    var test = debug.getBooleanAssert(options);
    assert.equal('add ' + process.cwd() + ' ' + test.output, tfs('add', null, test.options));
  });

  it('SHOULD works with STRING options', function () {
    var test = debug.getStringAssert(options);
    assert.equal('add ' + process.cwd() + ' ' + test.output, tfs('add', null, test.options));
  });
});
