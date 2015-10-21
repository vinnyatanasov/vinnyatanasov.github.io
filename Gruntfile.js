module.exports = function(grunt) {
    
    // Configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        uglify: {
            build: {
                src: 'js/main.js',
                dest: 'js/build/main.min.js'
            }
        },
        
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/build/main.css': 'css/main.scss'
                }
            }
        },
        
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['css/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        }
    
    });
    
    // Load plug-ins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    
    // Tell what to do when run 'grunt' command
    grunt.registerTask('default', ['uglify', 'sass']);
    
};