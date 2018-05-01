const camelize = require('./camelize.js');
const formatName = require('./formatName.js');
const writeFile = require('./writeFile.js');

function writeComponents(components) {
	components.forEach(component => {
		let componentName = camelize(component.name);
		componentName = formatName(componentName);

		writeFile(component, componentName, 'specs');
	});
}

module.exports = writeComponents;
