import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';
import { errorSetupSpacingTokens } from '../meta/errors.mjs';

/**
 * Places all Figma spacings into a clean object
 *
 * @exports
 * @function
 * @param {object} frame - The spacing frame from Figma
 * @param {string} spacingUnit - The spacing unit
 * @returns {object} - Returns an object with all the spacings
 * @throws {Error} - When there is no provided Figma frame
 */
export function setupSpacingTokens(spacingFrame, spacingUnit) {
  if (spacingFrame) {
    const spacings = spacingFrame.children;
    const spacingObject = {};

    spacings.forEach(spacing => {
      let normalizedName = camelize(spacing.name);
      normalizedName = formatName(normalizedName);
      const normalizedUnit = normalizeUnits(spacing.absoluteBoundingBox.width, 'px', spacingUnit);
      spacingObject[normalizedName] = normalizedUnit;
    });

    return spacingObject;
  } else {
    throw new Error(errorSetupSpacingTokens);
  }
}
