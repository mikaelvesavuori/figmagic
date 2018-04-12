function setupGridTokens(gridFrame) {
	let gridObject = {};
	gridObject.totalWidth = gridFrame.children[0].absoluteBoundingBox.width;

	gridFrame.children[0].layoutGrids.forEach(pattern => {
		if (pattern.pattern.toLowerCase() === 'rows') {
			gridObject.rowsSize = pattern.sectionSize;
			gridObject.rowsGutterSize = pattern.gutterSize;
			gridObject.rowsOffset = pattern.offset;
			gridObject.rowsCount = pattern.count;
		}
		if (pattern.pattern.toLowerCase() === 'columns') {
			gridObject.columnsSize = pattern.sectionSize;
			gridObject.columnsGutterSize = pattern.gutterSize;
			gridObject.columnsOffset = pattern.offset;
			gridObject.columnsCount = pattern.count;
		}
		if (pattern.pattern.toLowerCase() === 'grid') {
			gridObject.gridSize = pattern.sectionSize;
			gridObject.gridGutterSize = pattern.gutterSize;
			gridObject.gridOffset = pattern.offset;
			gridObject.gridCount = pattern.count;
		}
	});

	return gridObject;
}

module.exports = setupGridTokens;
