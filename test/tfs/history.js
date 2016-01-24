var assert = require('assert'),
    debug  = require('../../lib/utils/debug'),
    tfs    = require('../../lib/tfs');

/**
 * [describe description]
 *
 * @version 1.2.7
 */
describe('HISTORY Tests Suite', function() {
  var options = {
    b: [
      'itemmode',
      'noprompt',
      'recursive',
      'slotmode'
    ],
    i: [
      'stopafter'
    ],
    s: [
      'collection',
      'format',
      'login',
      'sort',
      'user',
      'version'
    ]
  };

  it('SHOULD works with BOOLEAN options', function () {
    var test = debug.getBooleanAssert(options);
    assert.equal('history "' + debug.cwd(true) + '" ' + test.output, tfs('history', null, test.options).message);
  });

  it('SHOULD works with INTEGER options', function () {
    var test = debug.getIntegerAssert(options);
    assert.equal('history "' + debug.cwd(true) + '" ' + test.output, tfs('history', null, test.options).message);
  });

  it('SHOULD works with STRING options', function () {
    var test = debug.getStringAssert(options);
    assert.equal('history "' + debug.cwd(true) + '" ' + test.output, tfs('history', null, test.options).message);
  });
});
