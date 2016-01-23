module.exports = function(grunt) {
  var libFiles = 'lib/**/*.js';

  grunt.initConfig({
    githooks: {
      all: {
        'pre-commit': {
          taskNames: 'test doc'
        }
      }
    },
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
    },
    mochaTest: {
      dist: {
        src: 'test/**/*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('doc', ['jshint:dist', 'jsdoc:dist']);
  grunt.registerTask('lint', 'jshint:dist');
  grunt.registerTask('test', 'mochaTest:dist');
};
