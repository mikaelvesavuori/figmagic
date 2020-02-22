import { units } from '../meta/units.mjs';
import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { errorSetupFontSizeTokens } from '../meta/errors.mjs';

/**
 * Places all Figma font sizes into a clean object
 *
 * @exports
 * @function
 * @param {object} frame - The font size frame from Figma
 * @param {string} fontUnit - The font unit type
 * @returns {object} - Returns an object with all the font sizes
 * @throws {Error} - When there is no provided Figma frame
 */
export function setupFontSizeTokens(frame, fontUnit) {
  if (frame) {
    let fontSizeObject = {};

    frame.children.forEach(type => {
      let name = camelize(type.name);
      name = formatName(name);
      const fontSize = type.style.fontSize / units.globalRemSize + fontUnit;

      fontSizeObject[name] = fontSize;
    });

    return fontSizeObject;
  } else {
    throw new Error(errorSetupFontSizeTokens);
  }
}
