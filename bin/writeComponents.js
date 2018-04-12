const camelize = require('./camelize.js');
const writeFile = require('./writeFile.js');

function writeComponents(components) {
	components.forEach(component => {
		const componentName = camelize(component.name);
		writeFile(component, componentName, 'specs');
	});
}

module.exports = writeComponents;
