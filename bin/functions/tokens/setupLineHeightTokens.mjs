import { camelize } from '../helpers/camelize.mjs';
import { normalizeUnits } from '../helpers/normalizeUnits.mjs';

import {
  errorSetupLineHeightTokensNoFrame,
  errorSetupLineHeightTokensNoChildren,
  errorSetupLineHeightTokensMissingProps,
  errorSetupLineHeightTokensMissingPercent
} from '../../meta/errors.mjs';

/**
 * Places all Figma line heights into a clean object
 *
 * @exports
 * @function
 * @param {object} lineHeightFrame - The line heights frame from Figma
 * @returns {object} - Returns an object with all the line heights
 * @throws {errorSetupLineHeightTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupLineHeightTokensNoChildren} - When missing children in Figma frame
 * @throws {errorSetupLineHeightTokensMissingProps} - When missing required props on frame children
 * @throws {errorSetupLineHeightTokensMissingPercent} - When missing type.style.lineHeightPercentFontSize on children
 */
export function setupLineHeightTokens(lineHeightFrame) {
  if (!lineHeightFrame) throw new Error(errorSetupLineHeightTokensNoFrame);
  if (!lineHeightFrame.children) throw new Error(errorSetupLineHeightTokensNoChildren);

  let lineHeightObject = {};

  lineHeightFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(errorSetupLineHeightTokensMissingProps);
    if (!type.style.lineHeightPercentFontSize)
      throw new Error(errorSetupLineHeightTokensMissingPercent);

    const name = camelize(type.name);
    const LINE_HEIGHT = normalizeUnits(type.style.lineHeightPercentFontSize, 'percent', 'unitless');

    // Do a tiny bit of rounding to avoid ugly numbers
    lineHeightObject[name] = LINE_HEIGHT.toFixed(2);
  });

  return lineHeightObject;
}
