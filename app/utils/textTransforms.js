import numeral from 'numeral';

function prettyText(text) {
	text = text.split('_');
	for (var i = 0; i < text.length; ++i) {
		text[i] = text[i].substr(0, 1).toUpperCase() + text[i].substr(1).toLowerCase();
	}
	text = text.join(' ');
	return text;
}

function stringToDate(value) {
	let date = value.split(/[\/\-\.]/, 3),
		month = parseInt(date[1], 10),
		day = parseInt(date[0], 10),
		year = parseInt(date[2], 10);

	if (!month || !day || !year || String(year).length !== 4) {
		return false;
	}
	return new Date(year, month-1, day);
}

function diffMonths(from, to) {
	return to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));
}

function numberFormat(value = 0) {
	return numeral(value).format('0,0');
}

function calculateValueFromPercentage(percent = 0, value = 0) {
	return Math.round((value / 100) * percent);
}

function calculateIntegerFromPercentage(percent = 0, value = 0) {
	return numberFormat(calculateValueFromPercentage(percent, value));
}

module.exports = {
	prettyText,
	numberFormat,
	diffMonths,
	stringToDate,
	calculateValueFromPercentage,
	calculateIntegerFromPercentage
};
