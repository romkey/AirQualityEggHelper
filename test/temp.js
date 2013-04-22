/* temperature-related tests
 *
 * temperatures should be in fahrenheit, with one decimal place of precision
 */

module( "temperature" );
test( "temperature conversion", function() {
    equal( AQEHelper._convert_temperature( 0 ), "32.0", "32 degrees" );
    equal( AQEHelper._convert_temperature( 10 ), "50.0", "10 degrees" );
    equal( AQEHelper._convert_temperature( -10 ), "14.0", "-10 degrees" );
    equal( AQEHelper._convert_temperature( -40 ), "-40.0", "-40 degrees" );
    equal( AQEHelper._convert_temperature( -42 ), "-43.6", "-42 degrees" );
    equal( AQEHelper._convert_temperature( 21 ), "69.8", "21 degrees" );
    equal( AQEHelper._convert_temperature( 44.321 ), "111.2", "44.321 degrees" );
} );

test( "temperature dom markup", function() {
    // use .html() rather than text so that we see any accidental HTML
    equal( $( '.current-temperature .current-value-measure-wrap' ).html(), "21", "initial temperature markup" );

    AQEHelper._markup_temperature();

    equal( $( '.current-temperature .current-value-measure-wrap' ).html(), "69.8", "converted temperature markup" );

} );
