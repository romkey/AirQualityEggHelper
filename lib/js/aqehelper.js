var AQEHelper = {
    extra_sensors: 0,

    init: function( options ) {
	var temp_units = 'C';

	// rewrite C to F
	// use sprintf to make sure we don't end up with lots of accidental decimal places
	if( options.temperature == 'F' ) {
	    var temp = parseInt( $( '.current-temperature .current-value-measure-wrap' ).text(), 10 );
	    temp *= 1.8;
	    temp += 32;

	    $( '.current-temperature .current-value-measure-wrap' ).text( temp.toFixed( 1 ) );

	    // remember which units we're using
	    temp_units = 'F';
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

	// title
	if( options.title ) {
	    $( 'title' ).prepend( $( '.metadata-feed-title' ).text() + ' &#187; ' );
	}

	// are we going to warn the user about stale updates?
	// if we are, we use the background page to do it since Chrome doesn't honor the notifications
	// permission for content-scripts
	if( options.warnstale ) {
//	    chrome.runtime.sendMessage( { subject: "test", message: "test notification" } );
	}

	// if we're supposed to show all sensors then fetch the raw feed in JSON and extract the info
	if( options.all_sensors ) {
	    $.get( 'https://api.cosm.com/v2/feeds/' + id + '.json', function( data ) { AQEHelper.process_raw_feed( data, options ); } );
	}

	// add units
	if( options.units ) {
	    $( '.current-no2 .current-value-measure-wrap' ).append( ' ppb' );
	    $( '.current-co .current-value-measure-wrap' ).append( ' ppb' );
	    $( '.current-humidity .current-value-measure-wrap' ).append( ' %' );
	    $( '.current-temperature .current-value-measure-wrap' ).append( ' &#176;' + temp_units );
	}

	// add our note about setup if it hasn't already been seen
	chrome.storage.sync.get( 'setup-note', function( data ) { AQEHelper.setup_note( data ); } );
    },

    // show the setup note if it hasn't already been shown
    // 
    setup_note: function( data ) {
	if( data[ 'setup-note' ] != undefined ) {
	    return;
	}

	$( 'body' ).append( '<div style="background-color: yellow; z-index: 5000; border-radius: 5px; padding: 1em; border: .5em solid black; position: fixed; top: 30%; left: 30%;"><h1>Air Quality Egg Helper Extension</h1>To enable the display of additional sensors:<ol><li>Register for a free <a href="http://cosm.com" target="_blank">Cosm.com</a> account</li><li>Enable "Show all sensors" on the <a href="' + chrome.extension.getURL( 'options.html' ) + '" target="_blank">options page</a></li></ol><button onclick="$( this ).parent().hide();">Hide</button></div>' );

	chrome.storage.sync.set( { 'setup-note': 200 } );
    },
    

    add_sensor: function( symbol, position, value ) {
	// otherwise add the sensor
	var sensor_names = {
	    'o3': 'Ozone',
	    'voc': 'Volatile Organics',
	    'dust': 'Dust'
	};

	var div = '';


	// if the current number of sensors is even, insert a clear so that divs line up
	if( AQEHelper.extra_sensors++ % 2 == 0 ) {
	    div  = '<div style="clear: both; height: 4em;">';
	}

	div += '</div><div class="current current-' + position + ' current-' + symbol.toLowerCase() + '">\n';
	div += '  <h2 class="current-id">' + symbol + '</h2>\n';
	div += '  <h3 class="current-id-full">' + sensor_names[ symbol.toLowerCase() ] + '</h3>\n';
	div += '  <div class="current-value">'
	div += '    <p class="current-value-measure">';
	div += '      <span class="current-value-measure-wrap">' + value + '</span>';
	div += '    </p>';
	div += '    <span class="current-gauge"></span>';
	div += '    <span class="current-gauge-filling current-gauge-green"></span>';
	div += '  </div>';

	$( '.dashboard-current-values' ).append( div );
    },

    process_raw_feed: function( data, options ) {
	var sensors = data.datastreams;
	for( var i in sensors ) {
	    var s = sensors[ i ];
	    s.taghash = {};
	    for( var j in s.tags ) {
		var tag = s.tags[ j ];

		var elts = tag.split( '=' );
		s.taghash[ elts[ 0 ] ] = elts[ 1 ];
	    }
	

	    // skip raw feeds
	    if( s.taghash[ 'aqe:data_origin' ] == 'raw' ) {
		continue;
	    }

	    // skip if this already exists
	    var symbol = s.taghash[ 'aqe:sensor_type' ];
	    if( $( '.current-' + symbol.toLowerCase() ).length != 0 ) {
		continue;
	    }

	AQEHelper.add_sensor( symbol, 'left', s.current_value );
	}

	if( options.units ) {
	    $( '.current-dust .current-value-measure-wrap' ).append( ' pcs/283ml' );
	    $( '.current-o3 .current-value-measure-wrap' ).append( ' ppb' );
	    $( '.current-voc .current-value-measure-wrap' ).append( ' ppm' );
	}
    }
};

$( document ).ready( function() { Options.get( function( options ) { AQEHelper.init( options ); } ) } );
