const camelize = require('./camelize.js');

function setupColorTokens(colorFrame) {
	let colors = {};

	colorFrame.children.forEach(color => {
		const colorString = `rgba(${color.fills[0].color.r * 255}, ${color.fills[0].color.g *
			255}, ${color.fills[0].color.b * 255}, ${color.fills[0].color.a * 100})`;

		const normalizedName = camelize(color.name);
		colors[normalizedName] = colorString;
	});

	return colors;
}

module.exports = setupColorTokens;
