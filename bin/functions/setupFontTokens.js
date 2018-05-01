const units = require('../meta/units.js');
const camelize = require('./camelize.js');
const formatName = require('./formatName.js');

function setupFontTokens(frame) {
	let fontObject = {};

	frame.children.forEach(type => {
		let name = camelize(type.name);
		name = formatName(name);
		const font = type.style.fontPostScriptName;

		fontObject[name] = font;
	});

	return fontObject;
}

module.exports = setupFontTokens;
