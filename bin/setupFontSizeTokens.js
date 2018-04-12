const units = require('./units.js');
const camelize = require('./camelize.js');

function setupFontSizeTokens(frame) {
	let fontSizeObject = {};

	frame.children.forEach(type => {
		const name = camelize(type.name);
		const fontSize = type.style.fontSize / units.globalRemSize + 'rem'; // TODO: Use a converter function?

		fontSizeObject[name] = fontSize;
	});

	return fontSizeObject;
}

module.exports = setupFontSizeTokens;
