import { camelize } from '../helpers/camelize.mjs';

import {
  errorSetupFontSizeTokensNoFrame,
  errorSetupFontSizeTokensNoChildren,
  errorSetupFontSizeTokensNoSizing,
  errorSetupFontSizeTokensMissingProps,
  errorSetupFontSizeTokensMissingSize
} from '../../meta/errors.mjs';

/**
 * Places all Figma font sizes into a clean object
 *
 * @exports
 * @function
 * @param {object} fontSizeFrame - The font size frame from Figma
 * @param {string} fontUnit - The font unit type
 * @param {number} remSize - The body rem size
 * @returns {object} - Returns an object with all the font sizes
 * @throws {errorSetupFontSizeTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupFontSizeTokensNoChildren} - When Figma frame is missing children
 * @throws {errorSetupFontSizeTokensNoSizing} - When missing fontUnit or remSize
 * @throws {errorSetupFontSizeTokensMissingProps} - When frame child is missing type.name or type.style
 * @throws {errorSetupFontSizeTokensMissingSize} - When frame child is missing type.style.fontSize
 */
export function setupFontSizeTokens(fontSizeFrame, fontUnit, remSize) {
  if (!fontSizeFrame) throw new Error(errorSetupFontSizeTokensNoFrame);
  if (!fontSizeFrame.children) throw new Error(errorSetupFontSizeTokensNoChildren);
  if (!fontUnit || !remSize) throw new Error(errorSetupFontSizeTokensNoSizing);

  let fontSizeObject = {};

  fontSizeFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(errorSetupFontSizeTokensMissingProps);
    if (!type.style.fontSize) throw new Error(errorSetupFontSizeTokensMissingSize);

    const name = camelize(type.name);
    const FONT_SIZE = type.style.fontSize / remSize + fontUnit;

    fontSizeObject[name] = FONT_SIZE;
  });

  return fontSizeObject;
}
