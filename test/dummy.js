/* provide dummy functions for testing
 */

/* most likely not running in an environment with chrome.storage so we provide a mockup
 */
chrome.storage = {};
chrome.storage.sync = {
    get: function( key, callback ) {
	callback( { options: Options[ 'default' ] } );
    },

    set: function() {
    }
};
chrome.extension = {};
chrome.extension.getURL = function( url ) { return url; };

/* override window.location.pathname
window.location = {};
 */

