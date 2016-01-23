var format = {
  itemspec: function(itemspec) {
    if (!itemspec.length) {
      itemspec.push(format.path(process.cwd()));
    } else {
      var i = itemspec.length;
      while (--i >= 0) {
        itemspec[i] = '"' + itemspec[i] + '"';
      }
    }

    return itemspec;
  },

  path: function(path) {
    return '"' + path.substr(3).replace(/\\/g, '/') + '"';
  },

  text: function(text) {
    return '"' + text.replace(/"/g, '""') + '"';
  },
};

module.exports = format;
