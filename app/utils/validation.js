import _ from 'lodash';

class Validation {

	buildRegex(pattern) {
		var flags = '';
		if (pattern.indexOf('/') === 0) {
			var lastSlash = pattern.lastIndexOf('/');
			flags = pattern.substr(lastSlash + 1);
			pattern = pattern.substr(1, lastSlash - 1);
		}
		return new RegExp(pattern, flags);
	}

	toCamelCase(arr) {
		return arr.join('-').replace(/-\w/g, function(m) {
			return m[1].toUpperCase();
		});
	}

	required(isRequired, value) {
		if (isRequired && !value.trim().length) {
			return false;
		}
		return true;
	}

	minLength(length, value) {
		if (value.trim().length && value.trim().length < length) {
			return false;
		}
		return true;
	}

	maxLength(length, value) {
		if (value.trim().length > length) {
			return false;
		}
		return true;
	}

	invalidCharacter(pattern, value) {
		return !this.testPattern(pattern, value);
	}

	testPattern(pattern, value) {
		let regex = this.buildRegex(pattern);
		return regex.test(value);
	}


	validateRequired(isRequired, value, message) {
		message = message || 'This field is required';
		if (!this.required(isRequired, value)) {
			return message;
		}
		return true;
	}

	validateMinLength(length, value, message) {
		message = message || 'Please enter a minimum of ### characters';
		if (!this.minLength(length, value)) {
			return message.replace('###', length);
		}
		return true;
	}

	validateMaxLength(length, value, message) {
		message = message || 'Please enter the maximum characters of ###';
		if (!this.maxLength(length, value)) {
			return message.replace('###', length);
		}
		return true;
	}

	validateInvalidCharacter(pattern, value, message) {
		message = message || 'Please remove the following invalid characters:###';

		if (!this.invalidCharacter(pattern, value)) {
			let regex = this.buildRegex(pattern);
			return message.replace('###', _.uniq(value.match(regex)).join(','));
		}
		return true;
	}

	validatePattern(pattern, value, message) {
		message = message || 'Please use the correct pattern';
		if (!this.testPattern(pattern, value)) {
			return message;
		}
		return true;
	}

}

module.exports = new Validation();
