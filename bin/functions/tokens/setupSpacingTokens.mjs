import { camelize } from '../helpers/camelize.mjs';
import { normalizeUnits } from '../helpers/normalizeUnits.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupSpacingTokensNoFrame,
  errorSetupSpacingTokensNoChildren,
  errorSetupSpacingTokensNoUnits,
  errorSetupSpacingTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma spacings into a clean object
 *
 * @exports
 * @function
 * @param {object} spacingFrame - The spacing frame from Figma
 * @param {string} spacingUnit - The spacing unit
 * @param {number} remSize - The body rem size
 * @returns {object} - Returns an object with all the spacings
 * @throws {errorSetupSpacingTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupSpacingTokensNoChildren} - When no children in Figma frame
 * @throws {errorSetupSpacingTokensNoUnits} - When missing spacingUnit or remSize arguments
 * @throws {errorSetupSpacingTokensMissingProps} - When missing spacing.name or spacing.absoluteBoundingBox in spacing/children
 */
export function setupSpacingTokens(spacingFrame, spacingUnit, remSize) {
  if (!spacingFrame) throw new Error(errorSetupSpacingTokensNoFrame);
  if (!spacingFrame.children) throw new Error(errorSetupSpacingTokensNoChildren);
  if (!spacingUnit || !remSize) throw new Error(errorSetupSpacingTokensNoUnits);

  const SPACINGS = spacingFrame.children;
  const SPACING_OBJECT = {};

  SPACINGS.forEach(spacing => {
    if (!spacing.name || !spacing.absoluteBoundingBox)
      throw new Error(errorSetupSpacingTokensMissingProps);

    let normalizedName = camelize(spacing.name);
    normalizedName = formatName(normalizedName);
    const NORMALIZED_UNIT = normalizeUnits(
      spacing.absoluteBoundingBox.width,
      'px',
      spacingUnit,
      remSize
    );
    SPACING_OBJECT[normalizedName] = NORMALIZED_UNIT;
  });

  return SPACING_OBJECT;
}
