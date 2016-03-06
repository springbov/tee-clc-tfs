var assert = require('assert'),
    format = require('../../lib/utils/format');

/**
 * @version 1.4.1
 */
describe('Utilities Format Tests Suite', function() {
  describe('Utilities Camelize', function() {
    it('SHOULD camelize "my natural string"', function () {
      assert.equal('myNaturalString', format.camelize('my natural string'));
    });
    it('SHOULD camelize "My Natural String"', function () {
      assert.equal('myNaturalString', format.camelize('My Natural String'));
    });
    // it('SHOULD camelize', function () {
      // assert.equal('myNaturalString', format.camelize('MY Natural String'));
    // });
  });
});
