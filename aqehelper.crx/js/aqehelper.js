var AQEHelper = {
    init: function( options ) {
	var temp_units = 'C';

	// rewrite C to F
	if( options.temperature == 'F' ) {
	    var temp = parseInt( $( '.current-temperature .current-value-measure-wrap' ).text() );
	    temp *= 1.8;
	    temp += 32;

	    $( '.current-temperature .current-value-measure-wrap' ).text( temp );

	    // remember which units we're using
	    temp_units = 'F';
	}


	// add units
	if( options.units ) {
	    $( '.current-no2 .current-value-measure-wrap' ).append( ' ppb' );
	    $( '.current-co .current-value-measure-wrap' ).append( ' ppb' );
	    $( '.current-humidity .current-value-measure-wrap' ).append( ' %' );
	    $( '.current-temperature .current-value-measure-wrap' ).append( ' &#176;' + temp_units );
	}

	// rewrite the timestamp
	// if we're doing relative time, force local timezone use
	if( options.relative ) {
	    options.timezone = true;
	}

	if( options.timezone ) {
	    var timestamp = $( '.dashboard-updated' ).text();
	    timestamp = timestamp.replace( /Last updated /, '' );
	    var date = new Date( timestamp + ' UTC' );

	    $( '.dashboard-updated' ).html( 'Last updated <span class="timeago" title="' + date.toISOString() + '">' + date.toString() + ' </span>' );

	    if( options.relative ) {
		$( '.timeago' ).timeago();
	    }
	}

	// add raw feed link
	if( options.feed ) {
	    var path = window.location.pathname;
	    var id = path.split( '/' ).pop();

	    $( '.dashboard-updated' ).append( '<br/><a href="http://cosm.com/feeds/' + id + '">raw feed</a>' );
	}

	// auto-refresh
	// options.refresh is minutes between refreshes
	if( options.refresh > 0 ) {
	    setTimeout( function() { window.location.reload(); }, options.refresh * 60 * 1000 );
	}

	// favicon
	if( options.favicon ) {
	    $( 'link[rel="shortcut icon"]' ).attr( 'href', chrome.extension.getURL( '/images/favicon.ico' ) );
	}
    }
};

$( document ).ready( function() { Options.get( function( options ) { AQEHelper.init( options ); } ) } );
