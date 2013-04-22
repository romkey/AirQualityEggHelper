/* provide dummy functions for testing
 */

/* most likely not running in an environment with chrome.storage so we provide a mockup
 */
chrome.storage = {};
chrome.storage.sync = {
    get: function() {
	return { options: Options.default };
    },

    set: function() {
    }
};
