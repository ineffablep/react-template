function camelcaseToUnderscore(string) {

	var camelString = string.replace(
		/([A-Z])/g,
		function(x, y) {
			return '_' + y.toLowerCase();
		})
		.replace(/^_/, '');
	if (camelString.indexOf('_') === 0) {
		camelString = camelString.substr(1);
	}

	return camelString;
}

module.exports = camelcaseToUnderscore;
