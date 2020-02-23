import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

import { errorSetupFontWeightTokens } from '../meta/errors.mjs';

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
  if (!fontWeightFrame) throw new Error(errorSetupFontWeightTokens);

  let fontWeightObject = {};

  fontWeightFrame.children.forEach(type => {
    let name = camelize(type.name);
    name = formatName(name);
    const fontWeight = type.style.fontWeight;

    fontWeightObject[name] = fontWeight;
  });

  return fontWeightObject;
}
