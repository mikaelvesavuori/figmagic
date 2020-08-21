import { camelize } from '../helpers/camelize';
import { normalizeUnits } from '../helpers/normalizeUnits';

import {
  errorSetupSpacingTokensNoFrame,
  errorSetupSpacingTokensNoChildren,
  errorSetupSpacingTokensNoUnits
} from '../../meta/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma spacings into a clean object
 *
 * @exports
 * @function
 * @param {Frame} spacingFrame - The spacing frame from Figma
 * @param {string} spacingUnit - The spacing unit
 * @param {number} remSize - The body rem size
 * @returns {object} - Returns an object with all the spacings
 * @throws {errorSetupSpacingTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupSpacingTokensNoChildren} - When no children in Figma frame
 * @throws {errorSetupSpacingTokensNoUnits} - When missing spacingUnit or remSize arguments
 * @throws {errorSetupSpacingTokensMissingProps} - When missing spacing.name or spacing.absoluteBoundingBox in spacing/children
 */
export function setupSpacingTokens(
  spacingFrame: Frame,
  spacingUnit: string,
  remSize: number
): object {
  if (!spacingFrame) throw new Error(errorSetupSpacingTokensNoFrame);
  if (!spacingFrame.children) throw new Error(errorSetupSpacingTokensNoChildren);
  if (!spacingUnit || !remSize) throw new Error(errorSetupSpacingTokensNoUnits);

  const { children } = spacingFrame;
  const SPACING_OBJECT = {};

  children.forEach((spacing) => {
    const name = camelize(spacing.name);

    const NORMALIZED_UNIT = normalizeUnits(
      spacing.absoluteBoundingBox.width,
      'px',
      spacingUnit,
      remSize
    );
    SPACING_OBJECT[name] = NORMALIZED_UNIT;
  });

  return SPACING_OBJECT;
}
