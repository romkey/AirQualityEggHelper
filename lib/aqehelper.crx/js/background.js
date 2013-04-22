var AQEBackground = {
    init: function() {
	chrome.runtime.onMessage.addListener( function( req, sender, sendResponse ) { AQEBackground.handle_message( req, sender, sendResponse ); } );
    },

    // request looks like:
    // subject: short subject for notification
    // msg: text message for notification
    handle_message: function( req, sender, sendResponse ) {
	var n;

	try {
	    n = webkitNotifications.createNotification(
//		chrome.extension.getURL( '/images/icon48.png' ),
		'/images/icon48.png',
		'Exception Test',
		'this is an exception generated from the content-script of an extension'
	    );

	    n.show();
	} catch( e ) {
	    console.log( 'notification failed: ' + e.message );
	}
    }
};

AQEBackground.init();
