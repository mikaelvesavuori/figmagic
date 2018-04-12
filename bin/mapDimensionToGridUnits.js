const fs = require('fs');
const getGridUnitCount = require('./getGridUnitCount.js');

/* TODO
** Map heights as well?
*/

function mapDimensionToGridUnits(pxValue, dimension) {
	const grid = require('../tokens/grid.js');

	if (dimension === 'width') {
		const maxWidth = grid.totalWidth; // Canvas max width? (Desktop mode)
		// Assume columns
		// TODO: Use columnsSize instead, since we have pre-calculated numbers available now?
		const gridCount = grid.columnsCount;
		const offset = grid.columnsOffset;
		const gutterSize = grid.columnsGutterSize;

		const totalGutterSize = (gridCount - 1) * gutterSize;
		const divisibleArea = maxWidth - totalGutterSize - offset * 2;
		const gridSize = Math.round(divisibleArea / gridCount);

		const componentGridSize = getGridUnitCount(pxValue, gridSize, gridCount, gutterSize);

		return componentGridSize;
	} else {
		console.warn('Currently we only support mapping the width dimension!');
		return;
	}
}

module.exports = mapDimensionToGridUnits;
