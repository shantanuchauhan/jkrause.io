module.exports = function(grunt) {

  grunt.initConfig({
    //
    // config
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      deploy: ['<%= pkg.folders.source.deploy %>']
    },

    copy: {
      css: {
        files: {
          '<%= pkg.folders.source.deploy %>/assets/stylesheets/': '<%= pkg.folders.source.stylescompiled %>/*.css'
        }
      }
    },
    //
    // compass
    compass: {
      // Note:
      // General settings of dev + release
      // are defined in config.rb
      dev: {
        linecomments: true,
        forcecompile: true,
        debugsass: true
      },
      release: {
        outputstyle: 'compressed',
        linecomments: false,
        forcecompile: true,
        debugsass: false
      }
    },

    watch: {
      styles:{
        files: [ '<%= pkg.folders.source.styles %>/*.sass'],
        tasks: [ 'compass:dev','copy:css' ]
      }
    },

    exec: {
      jekyll: {
        command: 'jekyll',
        stdout: true
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
//  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-compass');
  // Note:
  // Linking dev branch of grunt-exec
  // git://github.com/jharding/grunt-exec.git#dev
  // in package.json to support grunt 0.4
  grunt.loadNpmTasks('grunt-exec');
  //
  // register tasks
  grunt.registerTask('default', ['clean:deploy','compass:dev', 'exec:jekyll', 'watch']);
//  grunt.registerTask('default', ['connect:server', 'reload', 'watch']);

};