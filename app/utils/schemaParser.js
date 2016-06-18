import mapObject from './mapObject.js';

class SchemaParser {

	parseSchemas(schemas) {
		let parsedSchemas = {};
		mapObject(schemas, (key, schema) => {
			if (key !== 'referenceData') {
				parsedSchemas[key] = schema;
			}
		});
		return parsedSchemas;
	}

	parseReferenceData(referenceData) {
		let parsedReferenceData = {
			options: {}
		};
		let subReferenceData = referenceData.children[0];
		subReferenceData.children.forEach((optionData)=> {
			parsedReferenceData.options[optionData.id] = optionData.data.optionlist[0].option;
		});
		return parsedReferenceData;
	}

	parse(schema) {
		let parsedSchema = {
			original: schema,
			referenceData: {},
			schemas: {}
		};
		parsedSchema.referenceData = this.parseReferenceData(schema.schema.referenceData || schema.referenceData);
		parsedSchema.schemas = this.parseSchemas(schema.schema);
		return parsedSchema;
	}
}

module.exports = new SchemaParser();
