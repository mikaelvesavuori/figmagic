import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { errorSetupFontTokens } from '../meta/errors.mjs';

/**
 * Places all Figma fonts into a clean object
 *
 * @exports
 * @function
 * @param {object} frame - The font frame from Figma
 * @returns {object} - Returns an object with all the fonts
 * @throws {Error} - When there is no provided Figma frame
 */
export function setupFontTokens(frame) {
	if (frame) {
		let fontObject = {};

		frame.children.forEach(type => {
			let name = camelize(type.name);
			name = formatName(name);
			const font = type.style.fontPostScriptName;

			fontObject[name] = font;
		});

		return fontObject;
	} else {
		throw new Error(errorSetupFontTokens);
	}
}
