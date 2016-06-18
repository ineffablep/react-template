var uid = frameworkGlobals.isServer ? 'sid' : 'cid',
	uidCounter = 0,
	maxUid = 10000000000;// used to loop server side since a server could run for a long time

/**
 * @description Creates a unique id which then can be used for forms without worrying
 *              about id collision
 * @returns {string} id used for labels
 */
function uniqueId() {
	uidCounter = (uidCounter + 1) % maxUid;
	return uid + '_' + uidCounter.toString(36);
}

module.exports = uniqueId;
