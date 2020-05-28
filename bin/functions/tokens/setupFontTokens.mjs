import { camelize } from '../helpers/camelize.mjs';
import { formatName } from '../helpers/formatName.mjs';

import {
  errorSetupFontTokensNoFrame,
  errorSetupFontTokensNoChildren,
  errorSetupFontTokensMissingProps
} from '../../meta/errors.mjs';

/**
 * Places all Figma fonts into a clean object
 *
 * @exports
 * @function
 * @param {object} fontFrame - The font frame from Figma
 * @param {boolean} usePostscriptFontNames - Boolean to decide if to use Postscript font names or the default font family names (without spaces)
 * @returns {object} - Returns an object with all the fonts
 * @throws {errorSetupFontTokensNoFrame} - When there is no provided Figma frame
 * @throws {errorSetupFontTokensNoChildren} - When Figma frame is missing children
 * @throws {errorSetupFontTokensMissingProps} - When missing required props on frame children
 */
export function setupFontTokens(fontFrame, usePostscriptFontNames) {
  if (!fontFrame) throw new Error(errorSetupFontTokensNoFrame);
  if (!fontFrame.children) throw new Error(errorSetupFontTokensNoChildren);

  let fontObject = {};

  fontFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(errorSetupFontTokensMissingProps);
    // Seems never to hit...?
    //if (!type.style.fontPostScriptName || !type.style.fontFamily)
    //  throw new Error(errorSetupFontTokensMissingProps);

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
