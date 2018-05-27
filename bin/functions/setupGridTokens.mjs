export function setupGridTokens(gridFrame) {
	let gridObject = {};
	gridObject.totalWidth = gridFrame.absoluteBoundingBox.width;

	gridFrame.layoutGrids.forEach(pattern => {
		if (pattern.pattern.toLowerCase() === 'rows') {
			gridObject.rowsSize = Math.floor(pattern.sectionSize);
			gridObject.rowsGutterSize = Math.floor(pattern.gutterSize);
			gridObject.rowsOffset = pattern.offset;
			gridObject.rowsCount = pattern.count;
		}
		if (pattern.pattern.toLowerCase() === 'columns') {
			gridObject.columnsSize = Math.floor(pattern.sectionSize);
			gridObject.columnsGutterSize = Math.floor(pattern.gutterSize);
			gridObject.columnsOffset = pattern.offset;
			gridObject.columnsCount = pattern.count;
		}
		if (pattern.pattern.toLowerCase() === 'grid') {
			gridObject.gridSize = Math.floor(pattern.sectionSize);
			gridObject.gridGutterSize = Math.floor(pattern.gutterSize);
			gridObject.gridOffset = pattern.offset;
			gridObject.gridCount = pattern.count;
		}
	});

	return gridObject;
}
