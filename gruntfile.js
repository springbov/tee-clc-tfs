module.exports = function(grunt) {
  var libFiles = 'lib/**/*.js';

  grunt.initConfig({
    jsdoc: {
      dist: {
        src: libFiles,
        options: {
          destination: 'doc'
        }
      }
    },
    jshint: {
      dist: {
        options: {
          reporter: require('jshint-stylish')
        },
        target: libFiles
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('doc', ['jshint:dist', 'jsdoc:dist']);
  grunt.registerTask('lint', 'jshint:dist');
};
