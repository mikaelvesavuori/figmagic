import { FRAME as Frame } from '../../../contracts/Figma';
import { makeFontTokens } from '../index';
import { FontTokens } from '../../../contracts/Tokens';

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
export function setupFontTokens(fontFrame: Frame, usePostscriptFontNames = true): FontTokens {
  if (!fontFrame) throw new Error(ErrorSetupFontTokensNoFrame);
  if (!fontFrame.children) throw new Error(ErrorSetupFontTokensNoChildren);

  const fonts: Record<string, unknown> = {};

  fontFrame.children.forEach((item: Frame) => {
    if (!item.name || !item.style) throw new Error(ErrorSetupFontTokensMissingProps);

    const name = camelize(item.name);

    // Use Postscript font names or the default font family names (without spaces)
    const font = usePostscriptFontNames
      ? item.style.fontPostScriptName
      : item.style.fontFamily.replace(' /g', '');

    fonts[name] = font;
  });

  const fontTokens = makeFontTokens(fonts);
  return fontTokens;
}
