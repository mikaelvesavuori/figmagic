import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

/**
 * Places all Figma spacings into a clean object
 *
 * @exports
 * @function
 * @param {object} frame - The spacing frame from Figma
 * @returns {object} - Returns an object with all the spacings
 * @throws {Error} - When there is no provided Figma frame
 */
export function setupSpacingTokens(spacingFrame) {
	if (spacingFrame) {
		const spacings = spacingFrame.children;
		const spacingObject = {};

		spacings.forEach(spacing => {
			let normalizedName = camelize(spacing.name);
			normalizedName = formatName(normalizedName);
			const normalizedUnit = normalizeUnits(spacing.absoluteBoundingBox.width, 'px', 'em');
			spacingObject[normalizedName] = normalizedUnit;
		});

		return spacingObject;
	} else {
		throw new Error('No frame for setupSpacingTokens()!');
	}
}
