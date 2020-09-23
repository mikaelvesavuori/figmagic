import { FRAME as Frame } from '../../../contracts/Figma';
import { FontTokens } from '../../../contracts/Tokens';

import { camelize } from '../../../frameworks/string/camelize';

import {
  ErrorSetupFontTokensNoFrame,
  ErrorSetupFontTokensNoChildren,
  ErrorSetupFontTokensMissingProps
} from '../../../frameworks/errors/errors';

export const makeFontTokens = (frame: Frame, usePostscriptFontNames = true): FontTokens =>
  setupFontTokens(frame, usePostscriptFontNames);

/**
 * @description Places all Figma fonts into a clean object
 */
function setupFontTokens(fontFrame: Frame, usePostscriptFontNames = true): FontTokens {
  if (!fontFrame) throw new Error(ErrorSetupFontTokensNoFrame);
  if (!fontFrame.children) throw new Error(ErrorSetupFontTokensNoChildren);

  const fonts: Record<string, unknown> = {};

  const TOKENS = fontFrame.children;

  TOKENS.forEach((item: Frame) => {
    if (!item.name || !item.style) throw new Error(ErrorSetupFontTokensMissingProps);

    const NAME = camelize(item.name);

    // Use Postscript font names or the default font family names (without spaces)
    fonts[NAME] = usePostscriptFontNames
      ? item.style.fontPostScriptName
      : item.style.fontFamily.replace(' /g', '');
  });

  // @ts-ignore
  return fonts as FontTokens;
}
