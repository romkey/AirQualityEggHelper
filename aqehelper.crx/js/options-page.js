var OptionsPage = {
    init: function() {
	$( 'form' ).submit( function( e ) { e.preventDefault(); OptionsPage.save_options(); } );
	Options.get( function( options ) { OptionsPage.init_form( options ); } );
    },

    init_form: function( options ) {
	// first, clear the form
	$( 'input[type="checkbox"]' ).removeAttr( 'checked' );
	$( 'option' ).removeAttr( 'selected' );
	$( 'input[type="text"]' ).val( '' );

	// now restore the options
	$( 'select' ).val( options.temperature );
	$( 'input[name="refresh"]' ).val( options.refresh );
	for( var i in Options.checkboxes ) {
	    var name = Options.checkboxes[ i ];
	    if( options[ name ] ) {
		$( 'input[name="' + name + '"]' ).attr( 'checked', 'checked' );
	    }
	}
    },

    save_options: function() {
	var options = {};

	options.refresh = $( 'input[name="refresh"]' ).val();
	options.temperature = $( 'select' ).val();

	for( i in Options.checkboxes ) {
	    var name = Options.checkboxes[ i ];

	    if( $( 'input[name="' + name + '"]' ).is( ':checked' ) ) {
		options[ name ] = true;
	    } else {
		options[ name ] = false;
	    }
	}

	Options.set( options );
    }
};

$( document ).ready( function() { OptionsPage.init(); } );