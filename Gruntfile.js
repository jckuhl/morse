module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['**/*.js', '**/*.css'],
                tasks: ['cssmin', 'uglify'],
            },
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                sourceMaps: true
            },
            target: {
                files: {
                    './dist/style/style.min.css': ['./src/style/style.css', './src/style/mediaq.css']
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                esversion: 6,
                strict: 'implied',
                browser: true,
                force: true,
                module: true,
                devel: true,
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'src/script/*.js'],
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: './dist/app.map'
                },
                files: {
                    './dist/app.min.js': ['./src/script/audio.js', './src/script/morse.js', './src/script/app.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    // Default task(s).
    grunt.registerTask('default', ['watch', 'cssmin', 'uglify', 'jshint']);
};