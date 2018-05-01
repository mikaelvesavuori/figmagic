const camelize = require('./camelize.js');
const formatName = require('./formatName.js');
const normalizeUnits = require('./normalizeUnits.js');

function setupSpacingTokens(spacingFrame) {
	const spacings = spacingFrame.children;
	const spacingObject = {};

	spacings.forEach(spacing => {
		let normalizedName = camelize(spacing.name);
		normalizedName = formatName(normalizedName);
		const normalizedUnit = normalizeUnits(spacing.absoluteBoundingBox.width, 'px', 'em');
		spacingObject[normalizedName] = normalizedUnit;
	});

	return spacingObject;
}

module.exports = setupSpacingTokens;
