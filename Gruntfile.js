module.exports = function(grunt) {


  grunt.initConfig({
    //
    // config
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      deploy: ['public/']
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
      dev: {
        src: '<%= pkg.folders.source.styles %>',
        dest: '<%= pkg.folders.source.stylescompiled %>',
        linecomments: true,
        forcecompile: true,
        debugsass: true,
        require: [
          'susy',
          'respond-to',
          'animation'
        ],
//        images: '../app/images/',
        relativeassets: true
      },
      release: {
        src: '<%= pkg.folders.source.styles %>',
        dest: '<%= pkg.folders.source.stylescompiled %>',
        outputstyle: 'compressed',
        linecomments: false,
        forcecompile: true,
        debugsass: false,
        require: [
          'susy',
          'respond-to',
          'animation'
        ],
//        images: '../app/images',
        relativeassets: true
      }
    },

    //
    // jekyll
    jekyll: {
      server : {
        src : '<%= pkg.folders.source.jekyll %>',
        dest: '<%= pkg.folders.source.deploy %>',
        permalink: '/blog/:year/:month/:day/:title/',
        pygments: true,
        server : true,
        server_port : 8000,
        auto : true
      },
      dev: {
        src : '<%= pkg.folders.source.jekyll %>',
        dest: '<%= pkg.folders.source.deploy %>',
        permalink: '/blog/:year/:month/:day/:title/',
        pygments: true
//        paginate: 5,
//        paginate_file: 'blog.html'
      }
    },

    watch: {
      styles:{
        files: [ '<%= pkg.folders.source.styles %>/*.sass'],
        tasks: [ 'compass:dev','copy:css' ]
      },
      jekyll:{
        files: [
          '<%= pkg.folders.source.jekyll %>/**/*.html',
          '<%= pkg.folders.source.jekyll %>/**/*.md'
        ],
        tasks: [ 'jekyll:dev' ]
      }
    },

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

    connect: {
      server: {
        options: {
          port: 9999,
          base: '<%= pkg.folders.source.deploy %>'
        }
      }
    }

  });
  //
  // load tasks
//  grunt.loadNpmTasks('grunt-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-jekyll');
  //
  // register tasks
  grunt.registerTask('default', ['clean:deploy','connect:server', 'compass:dev', 'jekyll:dev', 'watch']);
//  grunt.registerTask('default', ['connect:server', 'reload', 'watch']);

};