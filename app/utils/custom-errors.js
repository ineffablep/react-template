

function AsyncError(message) {
	let errorMessage = `${message || ''}@@ASYNC_ERROR@@`;
	if (document && (document.getElementsByTagName('HTML')[0] || {className: ''}).className.indexOf('lte9') > -1) {
		// If less than IE10 return a normal error with an identifier
		// as window.onError doesn't catch custom errors properly.
		return new Error(errorMessage);
	} else {
		this.name = 'AsyncError';
		this.message = errorMessage;
		this.filename = 'ASYNC_ERROR_FILE_NAME';
		this.stack = (new Error()).stack;
	}
}
AsyncError.prototype = Object.create(Error.prototype);
AsyncError.prototype.constructor = AsyncError;

// Can't throw errors within promise catch context.
// Throw the error outside for the context.
function AsyncErrorWrapper(message) {
	setTimeout(()=>{
		throw new AsyncError(message);
	});
}

module.exports = {
	AsyncError: AsyncErrorWrapper
};
