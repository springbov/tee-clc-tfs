module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      main: {
        command: 'tfs',
        options: {
          callback: parseLog
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', 'shell:main');

  function parseLog(err, stdout, stderr, cb) {
    console.log(stdout);

    cb();
  }
};
