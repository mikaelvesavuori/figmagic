const units = require('./units.js');

/* TODO
** Add support for unitless units (line-height)
*/

function normalizeUnits(value, currentUnit, newUnit) {
	let rootSize = undefined;
	let unitSize = undefined;

	if (currentUnit === 'px') {
		rootSize = units.globalPxSize;
	}

	if (newUnit === 'rem' || newUnit === 'em') {
		unitSize = units.globalRemSize;
	}

	if (rootSize !== undefined && unitSize !== undefined) {
		const adjustedValue = value * (rootSize / unitSize);

		return `${adjustedValue}${newUnit}`;
	} else {
		console.warn(
			'normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values.'
		);
		return;
	}
}

module.exports = normalizeUnits;
