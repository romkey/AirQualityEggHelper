/*jshint node:true */
module.exports = function( grunt ) {
    grunt.loadNpmTasks( "grunt-git-authors" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-csslint" );
    grunt.loadNpmTasks( "grunt-contrib-qunit" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-compress" );
    grunt.loadNpmTasks( "grunt-contrib-copy" );
    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( 'grunt-shell');

    grunt.initConfig( {
	jshint: {
	    all: [ 'gruntfile.js', 'lib/js/*.js', 'test/*.js', 'package.json' ],
	    options: {
		jquery: true,
		smarttabs: true
	    }
	},

	csslint: {
	    files: [ 'lib/css/options.css' ]
	},

	qunit: {
	    files: ['test/**/*.html']
	},

	compress: {
	    zip: {
		options: {
		    archive: './dist/aqehelper.crx.zip'
		},
		files: [
		    { expand: true, cwd: './lib', src: [ 'aqehelper.crx/**/*' ] }
		]
	    }
	},

	copy: {
	    main: {
		files: [
		    { expand: true, cwd: './lib/js', src: [ '*' ], dest:  'lib/aqehelper.crx/js/' },
		    { expand: true, cwd: './lib/js', src: [ '*' ], dest:  'lib/aqehelper.safariextension/js/' },
		    { expand: true, cwd: './lib/js', src: [ '*' ], dest:  'lib/aqehelper.xpi/data/js/' },

		    { expand: true, cwd: './ext', src: [ '*.js' ], dest:  'lib/aqehelper.crx/js/' },
		    { expand: true, cwd: './ext', src: [ '*.js' ], dest:  'lib/aqehelper.safariextension/js/' },
		    { expand: true, cwd: './ext', src: [ '*.js' ], dest:  'lib/aqehelper.xpi/data/js/' },

		    { expand: true, cwd: './lib/css', src: [ '*' ], dest: 'lib/aqehelper.crx/css/'  },
		    { expand: true, cwd: './lib/css', src: [ '*' ], dest: 'lib/aqehelper.safariextension/css/'  },
		    { expand: true, cwd: './lib/css', src: [ '*' ], dest: 'lib/aqehelper.xpi/data/css/' },

		    { expand: true, cwd: './ext', src: [ '*.css' ], dest:  'lib/aqehelper.crx/css/' },
		    { expand: true, cwd: './ext', src: [ '*.css' ], dest:  'lib/aqehelper.safariextension/css/' },
		    { expand: true, cwd: './ext', src: [ '*.css' ], dest:  'lib/aqehelper.xpi/data/css/' },

		    { expand: true, cwd: './lib/img', src: [ '*' ], dest: 'lib/aqehelper.crx/images/' },
		    { expand: true, cwd: './lib/img', src: [ '*' ], dest: 'lib/aqehelper.safariextension/img/' },
		    { expand: true, cwd: './lib/img', src: [ '*' ], dest: 'lib/aqehelper.xpi/data/img/' }
		]
	    }
	},

        imagemin: {
            dist: {
		options: {
		    optimizationLevel: 7
		},
                files: [ {
                    expand: true,
                    cwd: 'lib/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: 'lib/lementor.crx/images'
                } ]
            }
        },

	watch: {
	    scriptsandcss: {
		files: [ 'lib/js/**/*.js', 'lib/css/*.css' ],
		tasks: [ 'copy' ],
		options: {
		    nospawn: true
		}
	    },
	    images: {
		files: [ 'lib/img/**/*.jpg', 'lib/img/**/*.png', 'lib/img/**/*.gif' ],
		tasks: [ 'imagemin' ],
		options: {
		    nospawn: true
		}
	    }
	},

	clean: [ 'lib/aqehelper.crx/js', 'lib/aqehelper.crx/css', 'lib/aqehelper.crx/images',
		 'lib/aqehelper.safariextension/js', 'lib/aqehelper.safariextension/css', 'lib/aqehelper.safariextension/img',
		 'lib/aqehelper.xpi/data/js', 'lib/aqehelper.xpi/data/css', 'lib/aqehelper.xpi/data/img',
		 'dist' ],

	shell: {
	    firefox: {
		command: 'cfx run',
		options: {
		    stdout: true,
		    stderr: true,
		    execOptions: {
			cwd: 'lib/aqehelper.xpi'
		    }
		}
	    }
	}
    } );

    grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );
    grunt.registerTask( 'dist', [ 'compress' ] );
};
