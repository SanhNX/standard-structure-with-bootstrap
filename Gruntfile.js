// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({
        // This is optional!
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                title: "Project Name", // defaults to the name in package.json, or will use project directory's name
                success: false, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            }
        },

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here
        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Grunfile.js', 'src/**/*.js']
        },
        // configure uglify to minify js files -------------------------------------
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'js/magic.min.js': 'js/magic.js'
                }
            }
        },
        // compile less stylesheets to css -----------------------------------------
        less: {
            'lw4u-compile-less': {
                files: {
                    'css/components.css': 'less/components/_components.less',
                    'css/bootstrap.css': 'less/thirdparty/_thirdparty.less',
                    'css/responsive.css': 'less/responsive/_responsive.less'
                }
            }
        },
        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'css/style.min.css': 'css/style.css'
                }
            }
        },
        watch: {
            less: {
                // for stylesheets, watch css and less files
                // only run less and cssmin
                files: ['less/**/*.less'],
                tasks: ['less:lw4u-compile-less']
            },
            livereload: {
                // Here we watch the files the less task will compile to
                // These files are sent to the live reload server after less compiles to them
                options: { livereload: true },
                files: ['less/**/*', 'js/**/*']
            }
        },
        sprite:{
            'lw4u-compile-sprites': {
                algorithm: 'top-down',
                src: 'images/sprites/*',
                dest: 'images/spritesheet.png',
                destCss: 'less/sprite.utilities.less',
                cssTemplate: 'less.template.handlebars'
            }
        }
    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.registerTask('lw4u-compile-all', ['sprite:lw4u-compile-sprites', 'less:lw4u-compile-less']); // create task for environment
    grunt.registerTask('lw4u-compile-sprites', ['sprite:lw4u-compile-sprites']); // create task for environment
    grunt.registerTask('lw4u-compile-less', ['less:lw4u-compile-less']); // create task for environment
    grunt.registerTask('lw4u-watch-less', ['watch:less']); // create task for environment
    grunt.registerTask('demo', function(){
        console.log("IM DEMO TASK");
    });
};