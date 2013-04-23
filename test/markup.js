/* markup-related tests
 */
module( "markup" );
test( "raw feed", function() {
    var text = $( '.dashboard-updated' ).text();

    equal( text, 'raw feed' );
    }
} );

test( "temperature markup", function() {
    // use .html() rather than text so that we see any accidental HTML
    equal( $( '.current-temperature .current-value-measure-wrap' ).html(), "21", "initial temperature markup" );

    AQEHelper._markup_temperature();

    equal( $( '.current-temperature .current-value-measure-wrap' ).html(), "69.8", "converted temperature markup" );
} );
