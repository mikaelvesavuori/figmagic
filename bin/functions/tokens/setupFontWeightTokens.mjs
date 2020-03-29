import { camelize } from '../helpers/camelize.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupFontWeightTokensNoFrame,
  errorSetupFontWeightTokensNoChildren,
  errorSetupFontWeightTokensMissingProps,
  errorSetupFontWeightTokensMissingWeight
} from '../../meta/errors.mjs';

/**
 * Places all Figma font weights into a clean object
 *
 * @exports
 * @function
 * @param {object} fontWeightFrame - The font weight frame from Figma
 * @returns {object} - Returns an object with all the font weights
 * @throws {error} - When there is no provided Figma frame
 */
export function setupFontWeightTokens(fontWeightFrame) {
  if (!fontWeightFrame) throw new Error(errorSetupFontWeightTokensNoFrame);
  if (!fontWeightFrame.children) throw new Error(errorSetupFontWeightTokensNoChildren);

  let fontWeightObject = {};

  fontWeightFrame.children.forEach(type => {
    if (!type.name || !type.style) throw new Error(errorSetupFontWeightTokensMissingProps);
    if (!type.style.fontWeight) throw new Error(errorSetupFontWeightTokensMissingWeight);

    let name = camelize(type.name);
    name = formatName(name);
    const fontWeight = type.style.fontWeight;

    fontWeightObject[name] = fontWeight;
  });

  return fontWeightObject;
}
