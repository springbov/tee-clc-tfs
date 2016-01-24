var assert = require('assert'),
    debug  = require('../../lib/utils/debug'),
    tfs    = require('../../lib/tfs');

describe('CHECKIN Tests Suite', function() {
  var options = {
    b: [
      'bypass',
      'force',
      'noprompt',
      'recursive',
      'saved',
      'validate'
    ],
    s: [
      'author',
      'collection',
      'comment',
      'login',
      'notes',
      'override',
      'shelveset'
    ]
  };

  it('SHOULD works with BOOLEAN options', function () {
    var test = debug.getBooleanAssert(options);
    assert.equal('checkin "' + debug.cwd(true) + '" ' + test.output, tfs('checkin', null, test.options).message);
  });

  it('SHOULD works with STRING options', function () {
    var test = debug.getStringAssert(options);
    assert.equal('checkin "' + debug.cwd(true) + '" ' + test.output, tfs('checkin', null, test.options).message);
  });
});
