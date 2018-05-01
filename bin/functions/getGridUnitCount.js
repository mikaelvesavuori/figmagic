/* TODO
** Map heights as well?
*/

function getGridUnitCount(pxWidth, gridSize, gridCount, gutterSize) {
	let gridUnits = 1;

	for (let index = 1; index < gridCount; index++) {
		if (pxWidth > index * gridSize + (index * gutterSize - 1)) {
			gridUnits++;
		}
	}

	return gridUnits;
}

module.exports = getGridUnitCount;
