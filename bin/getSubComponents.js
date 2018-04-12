function getSubComponents(componentName, componentsPage) {
	let subComponentNames = [];

	componentsPage.forEach((component, index) => {
		if (component.name === componentName) {
			component.children.forEach(subComponent => {
				subComponentNames.push(subComponent.name);
			});
		}
	});

	return subComponentNames;
}

module.exports = getSubComponents;
