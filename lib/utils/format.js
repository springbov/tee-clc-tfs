var format = {
  path: function(path) {
    return '"' + path.replace(/\\/g, '/') + '"';
  },

  text: function(text) {
    return '"' + text.replace(/"/g, '""') + '"';
  },
};

module.exports = format;
