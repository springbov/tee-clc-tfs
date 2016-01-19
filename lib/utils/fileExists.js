var fs = require('fs');

var fileExists = function(filePath, isDirectory) {
  isDirectory = !!isDirectory;

  try {
    if (isDirectory) {
      if (fs.lstatSync(filePath).isDirectory()) {
        return true;
      }
    } else {
      if (fs.lstatSync(filePath).isFile()) {
        return true;
      }
    }

    return false;
  }
  catch (exception) {
    return false;
  }
}

module.exports = fileExists;
