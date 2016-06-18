function getCookie(name) {
	let cookies = {};
	document.cookie.split('; ').map((item) => {
		let v = item.split('=');
		cookies[v[0]] = v[1];
	});

	return cookies[name];
}

function setCookie(name, value, expires, path, domain, secure) {
	// set time, it's in milliseconds
	var today = new Date(),
		expiresDate;
	today.setTime(today.getTime());

	/*
	 if the expires variable is set, make the correct
	 expires time, the current script below will set
	 it for x number of days, to make it for hours,
	 delete * 24, for minutes, delete * 60 * 24
	 */
	if (expires) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	expiresDate = new Date(today.getTime() + (expires));

	document.cookie = name + '=' + escape(value) +
		( ( expires ) ? ';expires=' + expiresDate.toGMTString() : '' ) +
		( ( path ) ? ';path=' + path : '' ) +
		( ( domain ) ? ';domain=' + domain : '' ) +
		( ( secure ) ? ';secure' : '' );
}

function deleteAllCookies() {
	var cookies = document.cookie.split(';');

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf('=');
		var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
	}
}

module.exports = {
	getCookie,
	setCookie,
	deleteAllCookies
};
