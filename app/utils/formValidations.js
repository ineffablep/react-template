var numberOfFailures = 0;
// validate whether a string is character only with special characters
function isText(str) {
	// Validate characters only
	var regex = /^[A-Za-z]+$/;
	return str.match(regex);
}

// validate whether a string is alphanumeric
function isAlphaNumeric(str) {
	// Validate characters only
	var regex = /^[A-Za-z0-9]+$/;
	return str.match(regex);
}

/*
 * Role - Match two strings or numbers
 * _length - length to check
 * _val = first string to match
 * _val2 = second string to match
 *
 */
function isConfirm(val, val2) {
	return (val === val2);
}

/*
 * Role - Validate postal code
 * _val - Value to match
 */
function isPostalCode(val) {
	// Validate characters only
	var regex = /^[ABCEGHJKLMNPRSTVXYabceghjklmnprstvxy]{1}\d{1}[A-Za-z]{1}\d{1}[A-Za-z]{1}\d{1}$/;
	return val.match(regex);
}

/*
 * Role - Check field value is empty or not
 * _val - Value is empty or not
 */

function isEmpty(val) {
	return (val) ? false : true;
}

const itemValidator = {
	required: {
		func: isEmpty
	},
	textOnly: {
		func: isText
	},
	postalCode: {
		func: isPostalCode
	},
	alphaNumeric: {
		func: isAlphaNumeric
	}
};

function setStatus(key, validationStatus, formData, formItem) {
	let validateItem = itemValidator[key];
	if (validateItem) {
		var validation = {};
		validation[key] = validateItem.func(formData[formItem.path]);
		numberOfFailures += validation[key] ? 1 : 0;
		validationStatus.push(validation);
	}
}

function validateForm(formData, formItem) {
	if (formItem.validation && typeof formItem.validation === 'object') {
		let validationStatus = [];
		formItem.validation.map((validateItem) => {
			if(validateItem.key) {
				setStatus(validateItem.key, validationStatus, formData, formItem);
			}
		});
		return validationStatus;
	}
}

function validationHandler(formData, schema) {
	if (typeof schema === 'object') {
		var validationArray = {};
		numberOfFailures = 0;
		if (schema.length) {
			schema.map(function(fieldItem) {
				if (fieldItem.path) {
					validationArray[fieldItem.path] = validateForm(formData, fieldItem);
				}
			});
		} else {
			validationArray[schema.path] = validateForm(formData, schema);
		}
		return {'validationArray': validationArray, 'numberOfFailures': numberOfFailures};
	}
}

function validateSchema(formData, schema) {
	var validationStatusObject = {},
		validationStatus,
		numbOfFailures = 0;
	schema.map(function(section) {
		if (section.children) {
			section.children.map(function(fieldSet) {
				validationStatus = validationHandler(formData, fieldSet);
				var objKey = Object.keys(validationStatus.validationArray)[0];
				validationStatusObject[objKey] = validationStatus.validationArray[objKey];
				numbOfFailures += validationStatus.numberOfFailures;
			});
		}
	});
	return {'validationArray': validationStatusObject, 'numberOfFailures': numbOfFailures};
}

module.exports = {
	validateSchema,
	validationHandler
};
