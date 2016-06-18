import logService from '../services/log';

function log(msg, ...meta) {
	const payload = {
		message: msg,
		level: 'warn',
		meta: meta || {}
	};

	return logService.log(payload);
}

module.exports = log;
