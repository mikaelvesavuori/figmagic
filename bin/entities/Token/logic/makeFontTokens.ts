import { FRAME as Frame } from '../../../contracts/Figma';
import { FontTokens } from '../../../contracts/Tokens';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';

import {
  ErrorMakeFontTokensNoFrame,
  ErrorMakeFontTokensNoChildren,
  ErrorMakeFontTokensMissingProps
} from '../../../frameworks/errors/errors';

/**
 * @description Places all Figma fonts into a clean object
 */
export function makeFontTokens(
  fontFrame: Frame,
  usePostscriptFontNames = false,
  camelizeTokenNames?: boolean
): FontTokens {
  if (!fontFrame) throw Error(ErrorMakeFontTokensNoFrame);
  if (!fontFrame.children) throw Error(ErrorMakeFontTokensNoChildren);

  const fonts: Record<string, unknown> = {};
  const TOKENS = fontFrame.children.reverse();
  TOKENS.forEach((item: Frame) =>
    makeFontToken(item, fonts, usePostscriptFontNames, camelizeTokenNames)
  );

  return fonts;
}

function makeFontToken(
  item: Frame,
  fonts: Record<string, unknown>,
  usePostscriptFontNames: boolean,
  camelizeTokenNames?: boolean
) {
  if (!item.name || !item.style) throw Error(ErrorMakeFontTokensMissingProps);

  const NAME = sanitizeString(item.name, camelizeTokenNames);
  fonts[NAME] = usePostscriptFontNames ? item.style.fontPostScriptName : item.style.fontFamily;
}
