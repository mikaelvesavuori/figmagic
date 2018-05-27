import { units } from '../meta/units.mjs';
import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontTokens(frame) {
	let fontObject = {};

	frame.children.forEach(type => {
		let name = camelize(type.name);
		name = formatName(name);
		const font = type.style.fontPostScriptName;

		fontObject[name] = font;
	});

	return fontObject;
}
