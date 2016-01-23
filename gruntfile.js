module.exports = function(grunt) {
  var libFiles = 'lib/**/*.js';

  grunt.initConfig({
    githooks: {
      all: {
        'pre-commit': {
          taskNames: 'lint test'
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
        src: [
          'test/start.js',
          'test/tfs/*.js',
          'test/end.js'
        ]
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
