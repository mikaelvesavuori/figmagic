import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { roundColorValue } from './roundColorValue.mjs';

export function setupColorTokens(colorFrame) {
	if (colorFrame) {
		let colors = {};

		colorFrame.children.forEach(color => {
			const colorString = `rgba(${roundColorValue(color.fills[0].color.r, 255)}, ${roundColorValue(
				color.fills[0].color.g,
				255
			)}, ${roundColorValue(color.fills[0].color.b, 255)}, ${roundColorValue(
				color.fills[0].color.a,
				1
			)})`;

			let normalizedName = camelize(color.name);
			normalizedName = formatName(normalizedName);
			colors[normalizedName] = colorString;
		});

		return colors;
	} else {
		throw new Error('No frame for setupColorTokens()!');
	}
}
