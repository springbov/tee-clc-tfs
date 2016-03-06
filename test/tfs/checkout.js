var assert = require('assert'),
    debug  = require('../../lib/utils/debug'),
    tfs    = require('../../lib/tfs');

/**
 * @version 1.4.1
 */
describe('TFS Checkout Tests Suite', function() {
  var options = {
    b: [
      'recursive'
    ],
    s: [
      'lock',
      'login',
      'type'
    ]
  };

  it('SHOULD works with BOOLEAN options', function () {
    var test = debug.getBooleanAssert(options);
    assert.equal('checkout ' + process.cwd() + ' ' + test.output, tfs('checkout', null, test.options));
  });

  it('SHOULD works with STRING options', function () {
    var test = debug.getStringAssert(options);
    assert.equal('checkout ' + process.cwd() + ' ' + test.output, tfs('checkout', null, test.options));
  });
});
