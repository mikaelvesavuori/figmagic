import { camelize } from '../helpers/camelize';
import { normalizeUnits } from '../helpers/normalizeUnits';

import {
  errorSetupLineHeightTokensNoFrame,
  errorSetupLineHeightTokensNoChildren,
  errorSetupLineHeightTokensMissingProps,
  errorSetupLineHeightTokensMissingPercent
} from '../../meta/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma line heights into a clean object
 *
 * @exports
 * @function
 * @param {Frame} lineHeightFrame - The line heights frame from Figma
 * @param {number} remSize - The body rem size
 * @returns {object} - Returns an object with all the line heights
 * @throws {errorSetupLineHeightTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupLineHeightTokensNoChildren} - When missing children in Figma frame
 * @throws {errorSetupLineHeightTokensMissingProps} - When missing required props on frame children
 * @throws {errorSetupLineHeightTokensMissingPercent} - When missing type.style.lineHeightPercentFontSize on children
 */
export function setupLineHeightTokens(lineHeightFrame: Frame, remSize: number): object {
  if (!lineHeightFrame) throw new Error(errorSetupLineHeightTokensNoFrame);
  if (!lineHeightFrame.children) throw new Error(errorSetupLineHeightTokensNoChildren);

  let lineHeightObject = {};

  lineHeightFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(errorSetupLineHeightTokensMissingProps);
    if (!type.style.lineHeightPercentFontSize)
      throw new Error(errorSetupLineHeightTokensMissingPercent);

    const name = camelize(type.name);
    const LINE_HEIGHT: string = normalizeUnits(
      type.style.lineHeightPercentFontSize,
      'percent',
      'unitless',
      remSize
    );

    // Do a tiny bit of rounding to avoid ugly numbers
    const lineHeight = parseFloat(LINE_HEIGHT).toFixed(2);
    lineHeightObject[name] = lineHeight;
  });

  return lineHeightObject;
}
