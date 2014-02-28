var path = require('path');
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
      options: {
        port: 8000
      },
      livereload: {
        options: {
          script: path.resolve('./server.js')
        }
      }
    },
    watch: {
      app: {
        files: ['app/**/*.js', 'test/**/*.js'],
        tasks: ['jshint', 'concat', 'karma:dev:run']
      },
      express: {
        files: ['app.js', 'server.js'],
        tasks: ['express:livereload'],
        options: {
          nospawn: true,
        }
      }
    },
    karma: {
      options: {
        configFile: 'karma.conf.js',
        browsers: ['Chrome']
      },
      continuous: {
        singleRun: true,
        reporters: 'dots',
        browsers: ['PhantomJS']
      },
      dev: {
        reporters: ['dots'],
        background: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('server', ['jshint', 'concat', 'karma:dev', 'express:livereload', 'karma:dev:run', 'watch']);
 
  grunt.registerTask('foo', ['express:livereload', 'watch']);
};
