module.exports = function(grunt) {

  grunt.initConfig({
    //
    // config
    pkg: grunt.file.readJSON('package.json'),

    rm: {
      deploy: '<%= pkg.folders.source.deploy %>/**'
    },

    //
    // compass
    compass: {
      // Note:
      // General settings of dev + release
      // are defined in config.rb
      dev: {
        config: 'config.rb',
        linecomments: true,
        forcecompile: true,
        debugsass: true
      },
      release: {
        config: 'config.rb',
        outputstyle: 'compressed',
        linecomments: false,
        forcecompile: true,
        debugsass: false
      }
    },

    //
    // jekyll
    // Note:
    // Just an empty task,
    // because all configuration of Jekyll are defined within _config.yml
    jekyll: {
      dev: {
      }
    },

    watch: {
      styles:{
        files: [ '<%= pkg.folders.source.styles %>/*.sass'],
        tasks: [ 'compass:dev' ]
      },
      jekyll:{
        files: [
          '<%= pkg.folders.source.jekyll %>/**/*.html',
          '<%= pkg.folders.source.jekyll %>/**/*.md',
          '<%= pkg.folders.source.jekyll %>/assets/stylesheets/*.css'
        ],
        tasks: [ 'jekyll:dev' ]
      }
    },

    connect: {
      server: {
        options: {
          port: 9999,
          base: '<%= pkg.folders.source.deploy %>'
        }
      }
    }

//    Bug "[Grunt 0.4] reload task launch server each time & do not trigger refresh"
//    @see: https://github.com/webxl/grunt-reload/issues/13
//    reload: {
//      port: 35279,
//      liveReload: {},
//      proxy: {
//        host: 'localhost',
//        port: 9999
//      }
//    },

  });
  //
  // load tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-rm');
  grunt.loadNpmTasks('grunt-jekyll');
  //
  // register tasks
  grunt.registerTask('default', ['rm:deploy','connect:server','compass:dev', 'jekyll:dev', 'watch']);
//  grunt.registerTask('default', ['connect:server', 'reload', 'watch']);

};