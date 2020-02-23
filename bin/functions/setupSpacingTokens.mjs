import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

import { errorSetupSpacingTokens } from '../meta/errors.mjs';

/**
 * Places all Figma spacings into a clean object
 *
 * @exports
 * @function
 * @param {object} spacingFrame - The spacing frame from Figma
 * @param {string} spacingUnit - The spacing unit
 * @returns {object} - Returns an object with all the spacings
 * @throws {error} - When there is no provided Figma frame
 */
export function setupSpacingTokens(spacingFrame, spacingUnit) {
  if (!spacingFrame) throw new Error(errorSetupSpacingTokens);

  const SPACINGS = spacingFrame.children;
  const SPACING_OBJECT = {};

  SPACINGS.forEach(spacing => {
    let normalizedName = camelize(spacing.name);
    normalizedName = formatName(normalizedName);
    const NORMALIZED_UNIT = normalizeUnits(spacing.absoluteBoundingBox.width, 'px', spacingUnit);
    SPACING_OBJECT[normalizedName] = NORMALIZED_UNIT;
  });

  return SPACING_OBJECT;
}
