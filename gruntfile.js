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
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig( {
	jshint: {
	    all: [ 'Gruntfile.js', 'lib/js/*.js', 'test/*.js' ],
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
	clean: [ 'lib/aqehelper.crx/js', 'lib/aqehelper.crx/css', 'lib/aqehelper.crx/images',
		 'lib/aqehelper.safariextension/js', 'lib/aqehelper.safariextension/css', 'lib/aqehelper.safariextension/img',
		 'lib/aqehelper.xpi/data/js', 'lib/aqehelper.xpi/data/css', 'lib/aqehelper.xpi/data/img' ],
	shell: {
	    firefox: {
		command: 'cfx run'
	    }
	}
    } );

    var js_files = [ 'lib/js/aqehelper.js', 'lib/js/options.js' ];
    var js_dirs = [ 'lib/aqehelper.xpi/data/js' ];
    var css_files = [ 'lib/css/options.css' ];
    var css_dirs = [ 'lib/aqehelper.xpi/data/css' ];

    grunt.registerTask( 'build', function() {
	var d;
	var f;

	for( d in js_dirs ) {
	    for( f in js_files ) {
		grunt.file.copy( js_files[ f ], js_dirs[ d ] );
	    }
	}

	for( d in css_dirs ) {
	    for( f in css_files ) {
		grunt.file.copy( css_files[ f ], css_dirs[ d ] );
	    }
	}

    } );

    grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );
    grunt.registerTask( 'dist', [ 'compress' ] );
};
