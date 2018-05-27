import { createIdString } from './createIdString.mjs';

export function createIds(figmaComponents) {
	let ids = {}; // Used to contain ID strings for all of the used Figma ID numbers

	Object.values(figmaComponents).forEach((component, index) => {
		// Not 100% sure, but I think node IDs beginning with dashes are instances
		// Do a check for potential instances that may have gotten included and exclude them
		if (Object.keys(figmaComponents)[index].includes('-')) {
			return;
		} else {
			let componentObject = {
				name: component.name,
				id: Object.keys(figmaComponents)[index]
			};

			ids[componentObject.name] = componentObject.id;
		}
	});

	console.log(ids);

	createIdString(ids); // Create IDs from Figma ID numbers
}
