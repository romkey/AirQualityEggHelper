// we store options in JSON in a form that's more friendly for us to use than the serialized form
var Options = {
    fields:  {
	"units": "Show units",
	"temperature": "Temperature units",
	"feed": "Show raw feed link",
	"timezone": "Show time in local timezone",
	"relative": "Display relative time (minutes ago)",
	"refresh": "Automatically refresh the page (minutes)",
	"favicon": "Show favicon",
	"title": "Rewrite title",
	"warnstale": "Warn on old update",
	"all_sensors": "Show all sensors"
    },

    defaults: {
	"units": true,
	"temperature": "F",
	"feed": true,
	"timezone": true,
	"relative": true,
	"refresh": 5,
	"favicon": true,
	"title": true,
	"warnstale": 10,
	"all_sensors": false
    },

    checkboxes: [ "units", "feed", "timezone", "relative", "favicon", "title", "all_sensors" ],

    get: function( callback ) {
	chrome.storage.sync.get( 'options', function( data ) {
	    if( data.options == undefined ) {
		data.options = {};
	    }

	    $.extend( data.options, Options.defaults );
	    callback( data.options );
	} );
     },

    set: function( options ) {
	chrome.storage.sync.set( { 'options': options } );
    },
};
