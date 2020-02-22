import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';
import { errorSetupLineHeightTokens } from '../meta/errors.mjs';

/**
 * Places all Figma line heights into a clean object
 *
 * @exports
 * @function
 * @param {object} frame - The line heights frame from Figma
 * @returns {object} - Returns an object with all the line heights
 * @throws {Error} - When there is no provided Figma frame
 */
export function setupLineHeightTokens(frame) {
	if (frame) {
		let lineHeightObject = {};

		frame.children.forEach(type => {
			let name = camelize(type.name);
			name = formatName(name);
			const lineHeight = normalizeUnits(
				type.style.lineHeightPercentFontSize,
				'percent',
				'unitless'
			);

			lineHeightObject[name] = lineHeight;
		});

		return lineHeightObject;
	} else {
		throw new Error(errorSetupLineHeightTokens);
	}
}
