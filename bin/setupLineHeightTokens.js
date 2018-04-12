const units = require('./units.js');
const camelize = require('./camelize.js');

function setupLineHeightTokens(frame) {
	let lineHeightObject = {};

	frame.children.forEach(type => {
		const name = camelize(type.name);
		const lineHeight = type.style.lineHeightPercent / 100; // TODO: Use a converter function?

		lineHeightObject[name] = lineHeight;
	});

	return lineHeightObject;
}

module.exports = setupLineHeightTokens;
