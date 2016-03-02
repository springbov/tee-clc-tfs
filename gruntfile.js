module.exports = function(grunt) {
  var libFiles = 'lib/**/*.js';

  grunt.initConfig({
    githooks: {
      all: {
        'pre-commit': {
          taskNames: 'lint test todos'
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
    },
    todos: {
      'TODO.md': [
          'lib/**/*.js',
          'test/**/*.js'
      ],
      options: {
        priorities : {
            low : null,
            med : /\b@?todo\s/,
            high: null
        },
        reporter: {
          header: function () {
            return '# TFS Tasks List';
          },
          fileTasks: function (file, tasks) {
            if (!tasks.length) {
              return '';
            }

            var result = '\n\n**' + file + '**\n';
            tasks.forEach(function (task) {
              result += '\n- ' + task.line.substr(task.line.indexOf('@todo') + 6);
            });

            return result;
          }
        },
        verbose: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-todos');

  grunt.registerTask('doc', ['jshint:dist', 'jsdoc:dist']);
  grunt.registerTask('lint', 'jshint:dist');
  grunt.registerTask('test', 'mochaTest:dist');
};
