var fs = require('fs');

/**
 * [fileExists description]
 *
 * @todo Complete description
 *
 * @version 1.2.3
 *
 * @param  {String}  filePath    File path
 * @param  {Boolean} isDirectory Check if it's a directory
 * @return {Boolean}             Return TRUE if file exists
 *                               (and is a directory)
 */
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
};

module.exports = fileExists;
