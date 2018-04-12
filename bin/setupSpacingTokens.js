const camelize = require('./camelize.js');
const normalizeUnits = require('./normalizeUnits.js');

function setupSpacingTokens(spacingFrame) {
	const spacings = spacingFrame.children;
	const spacingObject = {};

	spacings.forEach(spacing => {
		const normalizedName = camelize(spacing.name);
		const normalizedUnit = normalizeUnits(spacing.absoluteBoundingBox.width, 'px', 'em');
		spacingObject[normalizedName] = normalizedUnit;
	});

	return spacingObject;
}

module.exports = setupSpacingTokens;
