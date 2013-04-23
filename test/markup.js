/* markup-related tests
 */
module( "markup" );

$( document ).ready( function() { markup_tests(); } );

function markup_tests() {
    test( "raw feed", function() {
	expect( 1 );

	var text = $( '.dashboard-updated' ).text();

	equal( text.substring( text.length - 8 ), 'raw feed' );
    } );

    test( "favicon", function() {
	expect( 2 );

	equal( $( 'link[rel="shortcut icon"]' ).length, 1 );
	equal( $( 'link[rel="shortcut icon"]' ).attr( 'href' ), '/images/favicon.ico' );
    } );

    test( "temperature markup", function() {
	expect( 1 );

	// use .html() rather than text so that we see any accidental HTML
//	equal( $( '.current-temperature .current-value-measure-wrap' ).html(), "21", "initial temperature markup" );

//	AQEHelper._markup_temperature();

	equal( $( '.current-temperature .current-value-measure-wrap' ).html(), "69.8 °F", "converted temperature markup" );
    } );

    test( "units markup", function() {
	function end_of_string( str, chars ) {
	    return str.substring( str.length - chars );
	}

	expect( 7 );

	// first we test our end of string function
	equal( end_of_string( "abcdef", 1 ), "f" );
	equal( end_of_string( "abcdef", 2 ), "ef" );
	equal( end_of_string( "abcdef", 6 ), "abcdef" );

	// then we test the markup
	equal( end_of_string( $( '.current-temperature .current-value-measure-wrap' ).html(), 2 ), "°F", "temperature units" );
	equal( end_of_string( $( '.current-no2 .current-value-measure-wrap' ).html(), 3 ), "ppb", "no2 units" );
	equal( end_of_string( $( '.current-co .current-value-measure-wrap' ).html(), 3 ), "ppb", " co units" );
	equal( end_of_string( $( '.current-humidity .current-value-measure-wrap' ).html(), 1 ), "%", "humidity units" );
    } );
}



