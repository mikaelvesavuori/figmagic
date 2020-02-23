import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

import { units } from '../meta/units.mjs';
import {
  errorSetupFontSizeTokensNoFrame,
  errorSetupFontSizeTokensNoChildren,
  errorSetupFontSizeTokensMissingProps,
  errorSetupFontSizeTokensMissingSize
} from '../meta/errors.mjs';

/**
 * Places all Figma font sizes into a clean object
 *
 * @exports
 * @function
 * @param {object} fontSizeFrame - The font size frame from Figma
 * @param {string} fontUnit - The font unit type
 * @returns {object} - Returns an object with all the font sizes
 * @throws {error} - When there is no provided Figma frame
 */
export function setupFontSizeTokens(fontSizeFrame, fontUnit) {
  if (!fontSizeFrame) throw new Error(errorSetupFontSizeTokensNoFrame);
  if (!fontSizeFrame.children) throw new Error(errorSetupFontSizeTokensNoChildren);

  let fontSizeObject = {};

  fontSizeFrame.children.forEach(type => {
    if (!type.name || !type.style) throw new Error(errorSetupFontSizeTokensMissingProps);
    if (!type.style.fontSize) throw new Error(errorSetupFontSizeTokensMissingSize);

    let name = camelize(type.name);
    name = formatName(name);
    const FONT_SIZE = type.style.fontSize / units.globalRemSize + fontUnit;

    fontSizeObject[name] = FONT_SIZE;
  });

  return fontSizeObject;
}
