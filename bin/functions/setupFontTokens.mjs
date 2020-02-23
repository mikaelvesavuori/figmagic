import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

import { errorSetupFontTokens } from '../meta/errors.mjs';

/**
 * Places all Figma fonts into a clean object
 *
 * @exports
 * @function
 * @param {object} fontFrame - The font frame from Figma
 * @param {boolean} usePostscriptFontNames - Boolean to decide if to use Postscript font names or the default font family names (without spaces)
 * @returns {object} - Returns an object with all the fonts
 * @throws {error} - When there is no provided Figma frame
 */
export function setupFontTokens(fontFrame, usePostscriptFontNames) {
  if (!fontFrame) throw new Error(errorSetupFontTokens);

  let fontObject = {};

  fontFrame.children.forEach(type => {
    let name = camelize(type.name);
    name = formatName(name);

    // Use Postscript font names or the default font family names (without spaces)
    const FONT = usePostscriptFontNames
      ? type.style.fontPostScriptName
      : type.style.fontFamily.replace(' ', '');

    fontObject[name] = FONT;
  });

  return fontObject;
}
