function getDimension(componentName, dimension, componentsPage) {
	let foundMatch = false;
	let dimensionValue = 0;
	componentsPage.forEach(comp => {
		if (comp.name === componentName && !foundMatch) {
			foundMatch = true;
			if (dimension === 'width') {
				dimensionValue = comp.absoluteBoundingBox.width;
			} else if (dimension === 'height') {
				dimensionValue = comp.absoluteBoundingBox.height;
			}
		} else {
			return;
		}
	});

	return dimensionValue;
}

module.exports = getDimension;
