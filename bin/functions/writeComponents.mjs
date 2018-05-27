import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { writeFile } from './writeFile.mjs';

export function writeComponents(components) {
	components.forEach(component => {
		let componentName = camelize(component.name);
		componentName = formatName(componentName);

		writeFile(component, componentName, 'specs');
	});
}
