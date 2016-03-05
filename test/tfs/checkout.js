var assert = require('assert'),
    debug  = require('../../lib/utils/debug'),
    tfs    = require('../../lib/tfs');

/**
 * [describe description]
 *
 * @version 1.3.0
 */
describe('CHECKOUT Tests Suite', function() {
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

  // it('SHOULD works with BOOLEAN options', function () {
  //   var test = debug.getBooleanAssert(options);
  //   assert.equal('checkout "' + debug.cwd(true) + '" ' + test.output, tfs('checkout', null, test.options).command);
  // });
  //
  // it('SHOULD works with STRING options', function () {
  //   var test = debug.getStringAssert(options);
  //   assert.equal('checkout "' + debug.cwd(true) + '" ' + test.output, tfs('checkout', null, test.options).command);
  // });
});
