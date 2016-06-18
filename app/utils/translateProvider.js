import {isEmpty, result, template} from 'lodash';
import Resources from './resources';

/**
 * @description Renders a copy text from resources
 * @prop lang {string} localization type, default=en-GB
 * @prop locals {object} resource objects
 * @prop tKey {string} object reference
 * @prop attr {object} objects for template manipulation
 * @prop transform {string} string transform value
 * @Example
 * {TranslateProvider.translator('help.callUS', {}, 'lower')}
 * or
 * import { getResource } from './TranslateProvider.js'
 * { getResource('help.callUS', {}) }
 */

class TranslateProvider {

	constructor(lang = 'en-GB') {
		this.resources = Resources[lang];
		this.lang = lang;
	}

	getValue(locals = {}, tKey = '') {
		if (!isEmpty(locals) && !isEmpty(tKey)) {
			return result(locals, tKey, tKey);
		}
		return tKey;
	}

	getResources() {
		return this.resources;
	}

	getLocale() {
		return this.lang;
	}

	transform(transform = '', resource = '') {
		if (isEmpty(resource)) {
			return resource;
		}
		switch (transform) {
			case 'uppercase':
				return resource.toUpperCase();
			case 'lowercase':
				return resource.toLowerCase();
			default:
				return resource;
		}
	}

	translate(tKey = '', attr = {}, transform = '') {
		let keyValue = this.getValue(this.resources, tKey);
		if (!isEmpty(attr)) {
			keyValue = template(keyValue)(attr);
		}
		if (!isEmpty(transform)) {
			keyValue = this.transform(transform, keyValue);
		}
		return keyValue;
	}
}

const provider = new TranslateProvider('en-GB');
provider.getResource = provider.translate.bind(provider);
module.exports = provider;
