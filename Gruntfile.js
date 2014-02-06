module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['app/app.js', 'app/**/*.js'] 
    },
    concat: {
      dist: {
        src: ['app/app.js', 'app/**/*.js'],
        dest: 'public/js/ng-app.js'
      }
    },
    express: {
      server: {
        options: {
          port: 8000,
          server: 'app'
        }
      }
    },
    watch: {
      files: ['app.js', 'app/**/*.js', 'test/**/*.js'],
      tasks: ['jshint', 'concat', 'karma:dev:run']
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['Chrome']
      },
      continuous: {
        singleRun: true,
        browsers: ['PhantomJS']
      },
      dev: {
        reporters: 'dots',
        background: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('server', ['karma:dev', 'express', 'watch']);
};