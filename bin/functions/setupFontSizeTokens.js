const units = require('../meta/units.js');
const camelize = require('./camelize.js');
const formatName = require('./formatName.js');

function setupFontSizeTokens(frame) {
	let fontSizeObject = {};

	frame.children.forEach(type => {
		let name = camelize(type.name);
		name = formatName(name);
		const fontSize = type.style.fontSize / units.globalRemSize + 'rem'; // TODO: Use a converter function?

		fontSizeObject[name] = fontSize;
	});

	return fontSizeObject;
}

module.exports = setupFontSizeTokens;
