import { camelize } from '../helpers/camelize';

import {
  errorSetupFontWeightTokensNoFrame,
  errorSetupFontWeightTokensNoChildren,
  errorSetupFontWeightTokensMissingProps,
  errorSetupFontWeightTokensMissingWeight
} from '../../meta/errors';

import { FontWeightFrame } from '../../app/contracts/frames/FontWeightFrame';

/**
 * Places all Figma font weights into a clean object
 *
 * @exports
 * @function
 * @param {object} fontWeightFrame - The font weight frame from Figma
 * @returns {object} - Returns an object with all the font weights
 * @throws {errorSetupFontWeightTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupFontWeightTokensNoChildren} - When Figma frame is missing children
 * @throws {errorSetupFontWeightTokensMissingProps} - When missing required props on frame children
 * @throws {errorSetupFontWeightTokensMissingWeight} - When missing type.style.fontWeight on child
 */
export function setupFontWeightTokens(fontWeightFrame: FontWeightFrame): object {
  if (!fontWeightFrame) throw new Error(errorSetupFontWeightTokensNoFrame);
  if (!fontWeightFrame.children) throw new Error(errorSetupFontWeightTokensNoChildren);

  let fontWeightObject = {};

  fontWeightFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(errorSetupFontWeightTokensMissingProps);
    if (!type.style.fontWeight) throw new Error(errorSetupFontWeightTokensMissingWeight);

    const name = camelize(type.name);
    const fontWeight = type.style.fontWeight;

    fontWeightObject[name] = fontWeight;
  });

  return fontWeightObject;
}
