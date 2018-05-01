const units = require('../meta/units.js');
const camelize = require('./camelize.js');
const formatName = require('./formatName.js');
const normalizeUnits = require('./normalizeUnits.js');

function setupLineHeightTokens(frame) {
	let lineHeightObject = {};

	frame.children.forEach(type => {
		let name = camelize(type.name);
		name = formatName(name);
		const lineHeight = normalizeUnits(type.style.lineHeightPercent, 'percent', 'unitless');

		lineHeightObject[name] = lineHeight;
	});

	return lineHeightObject;
}

module.exports = setupLineHeightTokens;
