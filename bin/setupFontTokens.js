const units = require('./units.js');
const camelize = require('./camelize.js');

function setupFontTokens(frame) {
	let fontObject = {};

	frame.children.forEach(type => {
		const name = camelize(type.name);
		const font = type.style.fontPostScriptName;

		fontObject[name] = font;
	});

	return fontObject;
}

module.exports = setupFontTokens;
