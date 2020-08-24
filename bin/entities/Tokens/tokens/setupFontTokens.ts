import { camelize } from '../helpers/camelize';

import {
  ErrorSetupFontTokensNoFrame,
  ErrorSetupFontTokensNoChildren,
  ErrorSetupFontTokensMissingProps
} from '../../app/errors/errors';

import { Frame } from '../../entities/Frame/Frame';

/**
 * Places all Figma fonts into a clean object
 *
 * @param fontFrame The font frame from Figma
 * @param usePostscriptFontNames Boolean to decide if to use Postscript font names or the default font family names (without spaces)
 */
export function setupFontTokens(fontFrame: Frame, usePostscriptFontNames: boolean): FontTokens {
  if (!fontFrame) throw new Error(ErrorSetupFontTokensNoFrame);
  if (!fontFrame.children) throw new Error(ErrorSetupFontTokensNoChildren);

  let fontObject = {};

  fontFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(ErrorSetupFontTokensMissingProps);

    const name = camelize(type.name);

    // Use Postscript font names or the default font family names (without spaces)
    const FONT = usePostscriptFontNames
      ? type.style.fontPostScriptName
      : type.style.fontFamily.replace(' /g', '');

    fontObject[name] = FONT;
  });

  return fontObject;
}
