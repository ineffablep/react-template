function traversePath(obj, path, value) {
	var currentPathKey = path.shift(),
		indexComponent = currentPathKey.match(/\(([0-9]*)\)/),
		isArrayItem = indexComponent !== null,
		arrayIndex = (isArrayItem) ? indexComponent[1] : null;

	// parenthesis not used in actual path key creation, strip it
	currentPathKey = currentPathKey.replace(/\([0-9]*\)/, '');

	if (!obj[currentPathKey]) {
		// Key does not exist. Either create array or object.
		if (isArrayItem) {
			obj[currentPathKey] = [];
		}
		else {
			obj[currentPathKey] = {};
		}
	}

	if (isArrayItem) {
		// For arrays, add the index back into the set of paths to
		// traverse. The array will later be re-indexed to ensure
		// indexes are consecutive and dense.
		if (arrayIndex === '') {
			// Maintain backwards compatibility. Assume 0 index for
			// unspecified indexes
			arrayIndex = '0';
		}

		path.unshift(arrayIndex);
	}

	if (path.length === 0) {
		// At the last point in the path we can set the value directly
		obj[currentPathKey] = value;
		return;
	}
	else {
		// Otherwise recursively continue to go down the path
		traversePath(obj[currentPathKey], path, value);
	}
}

function shouldKeepItem(item) {
	return item !== null;
}

function removeEmptyItems(input) {
	for (var index in input) {
		if (Array.isArray(input[index])) {
			input[index] = input[index].filter(shouldKeepItem);
		}

		if (input[index] instanceof Object) {
			removeEmptyItems(input[index]);
		}
	}
}

function transformer(input) {
	let transformed = {};

	// Loop through each key/value pair
	// Deconstruct each key into an array of path components
	for (var pathString in input) {
		if (input.hasOwnProperty(pathString)) {
			let pathComponents = pathString.split('.'),
				path = pathComponents.slice(1);
			traversePath(transformed, path, input[pathString]);
		}
	}
	removeEmptyItems(transformed);
	return transformed;
}

export default {
	transformPathsToObject: transformer
};
