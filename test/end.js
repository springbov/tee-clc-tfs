var assert = require('assert'),
    debug  = require('../lib/utils/debug');

describe('End Tests Suite', function() {
  before(function() {
    console.log('\n    > Switching debugging environment mode OFF\n');
    debug.toggle(false);
  });

  it('SHOULD have switched debugging environment mode OFF', function () {
    assert.equal(false, debug.is());
  });
});
