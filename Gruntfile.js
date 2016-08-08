'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); // Auto load grunt tasks
    require('time-grunt')(grunt); // Time tasks

    grunt.initConfig({
        clean: {
            development: {
                files: [{
                    src: ['.tmp']
                }]
            },
            production: {
                files: [{
                    src: ['dist']
                }]
            }
        },

        copy: {
            development: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.{html,js,css,png,jpg,jpeg,gif,webp,svg,woff,woff2,ttf,eot}'],
                    dest: '.tmp'
                }]
            },
            production: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.{svg,woff,woff2,ttf,eot,min.js,min.css}'],
                    dest: 'dist'
                }]
            }
        },

        compass: {
            options: {
                sassDir: 'src/styles',
                httpImagesPath: 'src/images',
                httpFontsPath: 'src/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            development: {
                options: {
                    debugInfo: true,
                    cssDir: '.tmp/styles',
                    imagesDir: '.tmp/images',
                    javascriptsDir: '.tmp/scripts',
                    fontsDir: '.tmp/styles/fonts'
                }
            },
            production: {
                options: {
                    debugInfo: false,
                    cssDir: 'dist/styles',
                    imagesDir: 'dist/images',
                    javascriptsDir: 'dist/scripts',
                    fontsDir: 'dist/fonts',
                    outputStyle: 'compressed'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 5 versions']
            },
            development: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            },
            production: {
                files: [{
                    expand: true,
                    cwd: 'dist/styles/',
                    src: '**/*.css',
                    dest: 'dist/styles/'
                }]
            }
        },

        uglify: {
            production: {
                files: [{
                    expand: true,
                    cwd: 'src/scripts',
                    src: ['**/*.js'],
                    dest: 'dist/scripts'
                }],
                options: {
                    dead_code: true,
                    drop_console: true,
                    drop_debugger: true,
                    report: 'gzip',
                    silent: false,
                    unused: true
                }
            }
        },

        cssmin: {
            production: {
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/styles'
                }]
            }
        },

        htmlmin: {
            production: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'dist'
                }]
            }
        },

        imagemin: {
            production: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: 'dist/images'
                }]
            }
        },

        svgmin: {
            production: {
                files: [{
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.svg'],
                    dest: 'dist/images'
                }]
            }
        },

        concurrent: {
            production: {
                tasks: ['compass:production', 'imagemin', 'svgmin', 'htmlmin', 'uglify', 'cssmin'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        watch: {
            html: {
                files: ['src/**/*.html'],
                tasks: ['newer:copy:development']
            },
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: ['newer:copy:development']
            },
            images: {
                files: ['src/images/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                tasks: ['newer:copy:development']
            },
            compass: {
                files: ['src/styles/**/*.{scss,sass}'],
                tasks: ['compass:development', 'autoprefixer:development']
            },
            livereload: {
                files: ['.tmp/**/*.{html,jade,css,js,png,jpg,jpeg,gif,webp,svg}'],
                options: {
                    livereload: true
                }
            }
        },

        inline: {
            production: {
                options: {
                    uglify: true
                },
                src: 'dist/index.html',
                dest: 'dist/index.html'
            }
        },

        connect: {
            options: {
                hostname: '*'
            },
            development: {
                options: {
                    port: 8000,
                    base: '.tmp'
                }
            },
            production: {
                options: {
                    port: 8000,
                    base: 'dist'
                }
            }
        }
    });

    grunt.registerTask('default', [
        'clean:development',
        'copy:development',
        'compass:development',
        'autoprefixer:development',
        'connect:development',
        'watch'
    ]);

    grunt.registerTask('compile', [
        'clean:production',
        'copy:production',
        'concurrent:production',
        'autoprefixer:production',
        'inline:production'
    ]);

    grunt.registerTask('production', [
        'compile',
        'connect:production:keepalive'
    ]);
};
