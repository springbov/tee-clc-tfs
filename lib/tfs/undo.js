var tf     = require('../utils/tf'),
    output = require('../utils/output');

var undo = function() {
  tf('undo', [], function() {
    console.log(123);
  });
}

module.exports = undo;
