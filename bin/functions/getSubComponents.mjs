export function getSubComponents(componentName, componentsPage) {
	let subComponentNames = [];

	componentsPage.forEach((component, index) => {
		if (component.name === componentName) {
			component.children.forEach(subComponent => {
				if (subComponent.componentId) {
					subComponentNames.push(
						`${subComponent.name} (Component ID: ${subComponent.componentId})`
					);
				} else {
					subComponentNames.push(subComponent.name);
				}
			});
		}
	});

	return subComponentNames;
}
