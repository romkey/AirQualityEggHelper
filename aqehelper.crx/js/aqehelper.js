var AQEHelper = {
    init: function() {
	// add units
	$( '.current-no2 .current-value-measure-wrap' ).append( ' ppb' );
	$( '.current-co .current-value-measure-wrap' ).append( ' ppb' );
	$( '.current-humidity .current-value-measure-wrap' ).append( ' %' );
	$( '.current-temperature .current-value-measure-wrap' ).append( ' &#176;C' );

	// add raw feed link
	var path = window.location.pathname;
	var id = path.split( '/' ).pop();

	$( '.dashboard-updated' ).append( '<br/><a href="http://cosm.com/feeds/' + id + '">raw feed</a>' );
    }
};

$( document ).ready( function() { AQEHelper.init(); } );
