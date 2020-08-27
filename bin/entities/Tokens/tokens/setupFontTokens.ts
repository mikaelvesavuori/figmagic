import { FRAME as Frame } from '../../../app/contracts/Figma';
import { makeFontTokens } from '../index';
import { FontTokens } from '../Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupFontTokensNoFrame,
  ErrorSetupFontTokensNoChildren,
  ErrorSetupFontTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma fonts into a clean object
 *
 * @param fontFrame The font frame from Figma
 * @param usePostscriptFontNames Boolean to decide if to use Postscript font names or the default font family names (without spaces)
 */
export function setupFontTokens(fontFrame: Frame, usePostscriptFontNames: boolean): FontTokens {
  if (!fontFrame) throw new Error(ErrorSetupFontTokensNoFrame);
  if (!fontFrame.children) throw new Error(ErrorSetupFontTokensNoChildren);

  let fonts = {};

  fontFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(ErrorSetupFontTokensMissingProps);

    const name = camelize(type.name);

    // Use Postscript font names or the default font family names (without spaces)
    const font = usePostscriptFontNames
      ? type.style.fontPostScriptName
      : type.style.fontFamily.replace(' /g', '');

    fonts[name] = font;
  });

  const fontTokens = makeFontTokens(fonts);
  return fontTokens;
}
