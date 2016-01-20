var format = require('../utils/format'),
    output = require('../utils/output'),
    tf     = require('../utils/tf');

/**
 * Displays information about and lets you change the attributes,
 * such as comments and check-in notes, that are associated with a changeset.
 *
 * @see https://msdn.microsoft.com/en-us/library/w51xa47k(v=vs.100).aspx
 *
 * @param  {Array}  changesetId Changeset ID
 * @param  {Object} options     Changeset options
 */
var changeset = function(changesetId, options) {
  var params = [changesetId];

  if (params.length === 0) {
    params.push(format.path(process.cwd()));
  }

  tf('changeset', params, null, !!options.verbose);
};

module.exports = changeset;
