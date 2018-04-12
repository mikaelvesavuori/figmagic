const createIdString = require('./createIdString.js');

function createIds(figmaComponents) {
	//console.log(figmaComponents);
	let ids = {}; // Used to contain ID strings for all of the used Figma ID numbers

	Object.values(figmaComponents).forEach((component, index) => {
		// Not 100% sure, but I think node IDs beginning with dashes are instances
		// Do a check for potential instances that may have gotten included and exclude them
		if (Object.keys(figmaComponents)[index].includes('-')) {
			return;
		} else {
			/*
			function lookupId(componentName) {
				let id = 0;

				Object.values(figmaComponents).forEach((item, index) => {
					if (componentName === item.name) {
						console.log(componentName, item.name, index);
						id = Object.keys(figmaComponents)[index];
					}
				});

				return id;
			}
			*/

			let componentObject = {
				name: component.name,
				id: Object.keys(figmaComponents)[index] //lookupId(component.name)
			};

			ids[componentObject.name] = componentObject.id;
		}
	});

	createIdString(ids); // Create IDs from Figma ID numbers
}

module.exports = createIds;
