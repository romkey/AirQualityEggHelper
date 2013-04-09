var AQEHelper = {
    init: function() {
	// add units
	$( '.current-no2 .current-value-measure-wrap' ).append( ' ppb' );
	$( '.current-co .current-value-measure-wrap' ).append( ' ppb' );
	$( '.current-humidity .current-value-measure-wrap' ).append( ' %' );
	$( '.current-temperature .current-value-measure-wrap' ).append( ' &#176;C' );

	// rewrite C to F
	var temp = parseInt( $( '.current-temperature .current-value-measure-wrap' ).text() );
	temp *= 1.8;
	temp += 32;

//	$( '.current-temperature .current-value-measure-wrap' ).text( temp );
//	$( '.current-temperature .current-value-measure-wrap' ).append( ' &#176;F' );

	// rewrite the timestamp


	// add raw feed link
	var path = window.location.pathname;
	var id = path.split( '/' ).pop();

	$( '.dashboard-updated' ).append( '<br/><a href="http://cosm.com/feeds/' + id + '">raw feed</a>' );
    }
};

$( document ).ready( function() { AQEHelper.init(); } );
