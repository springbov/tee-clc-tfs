var tf     = require('../utils/tf'),
    output = require('../utils/output');

var get = function() {
  tf('get', ['/recursive'], function() {
    console.log(123);
  });
}

module.exports = get;
