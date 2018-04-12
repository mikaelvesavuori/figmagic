const getSubComponents = require('./getSubComponents.js');
const mapDimensionToGridUnits = require('./mapDimensionToGridUnits.js');
const getDimension = require('./getDimension.js');

function setupComponents(figmaComponents, componentsPage) {
	let components = [];

	Object.values(figmaComponents).forEach((component, index) => {
		const unitWidth = getDimension(component.name, 'width', componentsPage);
		const gridWidth = mapDimensionToGridUnits(unitWidth, 'width');
		const unitHeight = getDimension(component.name, 'height', componentsPage);

		let componentObject = {
			name: component.name,
			gridWidth: gridWidth,
			pxWidth: unitWidth,
			pxHeight: unitHeight,
			description: component.description,
			subComponents: getSubComponents(component.name, componentsPage),
			id: Object.keys(figmaComponents)[index]
		};

		//ids[componentObject.name] = componentObject.id;
		components.push(componentObject);
	});

	return components;
}

module.exports = setupComponents;
