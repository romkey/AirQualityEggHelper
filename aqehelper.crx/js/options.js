// we store options in JSON in a form that's more friendly for us to use than the serialized form
// we 
var Options = {
    fields:  {
	"units": "Show units",
	"temperature": "Temperature units",
	"feed": "Show raw feed link",
	"timezone": "Show time in local timezone",
	"relative": "Display relative time (minutes ago)",
	"refresh": "Automatically refresh the page (minutes)",
	"favicon": "Show favicon"
    },

    defaults: {
	"units": true,
	"temperature": "F",
	"feed": true,
	"timezone": true,
	"relative": true,
	"refresh": 5,
	"favicon": true
    },

    checkboxes: [ "units", "feed", "timezone", "relative", "favicon" ],

    get: function( callback ) {
	chrome.storage.sync.get( 'options', function( data ) { if( data == undefined ) { data = Options.defaults; } callback( data.options ) } );
     },

    set: function( options ) {
	chrome.storage.sync.set( { 'options': options } );
    },
};
