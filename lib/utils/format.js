var format = {
  path: function(path) {
    return '"' + path + '"';
  },

  text: function(text) {
console.log(text);
    return '"' + text.replace(/"/g, '""') + '"';
  },
};

module.exports = format;
