var assert = require('assert'),
    debug  = require('../../lib/utils/debug'),
    tfs    = require('../../lib/tfs');

/**
 * [describe description]
 *
 * @version 1.2.9
 */
describe('UNDO Tests Suite', function() {
  var options = {
    b: [
      'noprompt',
      'recursive'
    ],
    s: [
      'collection',
      'login',
      'workspace'
    ]
  };

  it('SHOULD works with BOOLEAN options', function () {
    var test = debug.getBooleanAssert(options);
    assert.equal('undo "' + debug.cwd(true) + '" ' + test.output, tfs('undo', null, test.options).message);
  });

  it('SHOULD works with STRING options', function () {
    var test = debug.getStringAssert(options);
    assert.equal('undo "' + debug.cwd(true) + '" ' + test.output, tfs('undo', null, test.options).message);
  });
});
