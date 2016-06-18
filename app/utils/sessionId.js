/**
 * Random session id function from http://stackoverflow.com/a/105074
 * @returns {string} random GUID
 */
const crypto = require('crypto');
function guid() {
	function s4() {
		crypto.randomBytes(2, (err, buf) => {
			if (err) throw err;

			return buf.toString('hex');
		});


	}

	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
}

module.exports = guid;
