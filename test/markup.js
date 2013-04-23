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
}
