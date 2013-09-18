module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['app/app.js', 'app/**/*.js'] 
    },
    concat: {
      dist: {
        src: ['app/app.js', 'app/controllers/**/*.js', 'app/services/**/*.js'],
        dest: 'public/js/ng-app.js'
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '.'
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
        browsers: ['Firefox']
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
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('server', ['karma:dev', 'connect', 'watch']);
};