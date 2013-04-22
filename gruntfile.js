/*jshint node:true */
module.exports = function( grunt ) {

    grunt.loadNpmTasks( "grunt-git-authors" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-csslint" );
    grunt.loadNpmTasks( "grunt-contrib-qunit" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-compress" );

    grunt.initConfig( {
	jshint: {
	    all: [ 'Gruntfile.js', 'js/*.js', 'aqehelper.crx/js/options-page.js' ],
	    options: {
		jquery: true,
		smarttabs: true
	    }
	},
	csslint: {
	    files: [ 'css/options.css' ]
	},
	qunit: {
	    files: ['test/**/*.html']
	},
	compress: {
	    main: {
		files: [
		    { src: 'aqehelper.crx/**', dest: 'dist/aqehelper.crx.zip' }
		]
	    }
	}
    } );

    var js_files = [ 'js/aqehelper.js', 'js/options.js' ];
    var js_dirs = [ 'aqehelper.xpi/data/js' ];
    var css_files = [ 'css/options.css' ];
    var css_dirs = [ 'aqehelper.xpi/data/css' ];

    grunt.registerTask( 'build', function() {
	for( var d in js_dirs ) {
	    for( var f in js_files ) {
		grunt.file.copy( js_files[ f ], js_dirs[ d ] );
	    }
	}

	for( var d in css_dirs ) {
	    for( var f in css_files ) {
		grunt.file.copy( css_files[ f ], css_dirs[ d ] );
	    }
	}

    } );

    grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );
    grunt.registerTask( 'clean', function() {
	
    } );
    grunt.registerTask( 'dist', [ 'compress' ] );
};
